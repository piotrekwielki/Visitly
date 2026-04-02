create extension if not exists pgcrypto;

create type public.platform_role_enum as enum ('user', 'admin');
create type public.business_role_enum as enum ('owner', 'manager', 'staff');
create type public.business_status_enum as enum ('draft', 'active', 'archived');
create type public.booking_status_enum as enum ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');
create type public.payment_status_enum as enum ('requires_deposit', 'pending', 'authorized', 'captured', 'failed', 'canceled');
create type public.notification_channel_enum as enum ('email', 'sms', 'push');
create type public.notification_status_enum as enum ('queued', 'sent', 'failed', 'canceled');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  phone text,
  platform_role public.platform_role_enum not null default 'user',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid references public.profiles (id) on delete set null,
  slug text not null unique,
  name text not null,
  category text not null,
  city text not null,
  tagline text not null,
  description text,
  timezone text not null default 'Europe/Warsaw',
  price_range text not null default '0-0 PLN',
  rating numeric(2,1) not null default 0,
  next_available_label text,
  status public.business_status_enum not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.business_members (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  role public.business_role_enum not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (business_id, profile_id)
);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  name text not null,
  address_line_1 text,
  address_line_2 text,
  city text not null,
  postal_code text,
  country_code text not null default 'PL',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.staff (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  profile_id uuid references public.profiles (id) on delete set null,
  location_id uuid references public.locations (id) on delete set null,
  slug text,
  display_name text not null,
  specialty text,
  bio text,
  is_bookable boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  location_id uuid references public.locations (id) on delete set null,
  staff_id uuid references public.staff (id) on delete set null,
  name text not null,
  description text,
  duration_minutes integer not null check (duration_minutes > 0),
  price_minor integer not null check (price_minor >= 0),
  currency text not null default 'PLN',
  deposit_required boolean not null default false,
  deposit_minor integer not null default 0 check (deposit_minor >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.business_hours (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  location_id uuid references public.locations (id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  opens_at time,
  closes_at time,
  is_closed boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (business_id, location_id, weekday)
);

create table public.availability_exceptions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  location_id uuid references public.locations (id) on delete cascade,
  staff_id uuid references public.staff (id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  is_available boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (ends_at > starts_at)
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  profile_id uuid references public.profiles (id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  marketing_opt_in boolean not null default false,
  total_visits integer not null default 0,
  last_visit_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (business_id, email)
);

create table public.client_blocks (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  reason text,
  blocked_until timestamptz,
  created_by_profile_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (business_id, client_id)
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  location_id uuid references public.locations (id) on delete set null,
  service_id uuid not null references public.services (id) on delete restrict,
  staff_id uuid references public.staff (id) on delete set null,
  client_id uuid not null references public.clients (id) on delete restrict,
  created_by_profile_id uuid references public.profiles (id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  business_timezone text not null default 'Europe/Warsaw',
  status public.booking_status_enum not null default 'pending',
  booking_source text not null default 'marketplace',
  approval_mode text not null default 'auto',
  cancellation_window_hours integer not null default 24,
  notes text,
  cancellation_reason text,
  total_price_minor integer not null default 0,
  currency text not null default 'PLN',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (ends_at > starts_at)
);

create table public.booking_status_history (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  from_status public.booking_status_enum,
  to_status public.booking_status_enum not null,
  changed_by_profile_id uuid references public.profiles (id) on delete set null,
  note text,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  booking_id uuid not null unique references public.bookings (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  body text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.payment_intents (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  booking_id uuid not null references public.bookings (id) on delete cascade,
  provider text not null default 'placeholder',
  status public.payment_status_enum not null default 'pending',
  amount_minor integer not null check (amount_minor >= 0),
  currency text not null default 'PLN',
  provider_reference text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.deposits (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings (id) on delete cascade,
  payment_intent_id uuid references public.payment_intents (id) on delete set null,
  amount_minor integer not null check (amount_minor >= 0),
  currency text not null default 'PLN',
  status public.payment_status_enum not null default 'requires_deposit',
  due_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  booking_id uuid references public.bookings (id) on delete cascade,
  client_id uuid references public.clients (id) on delete cascade,
  channel public.notification_channel_enum not null,
  status public.notification_status_enum not null default 'queued',
  template_key text not null,
  payload jsonb not null default '{}'::jsonb,
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index businesses_owner_profile_idx on public.businesses (owner_profile_id);
create index business_members_business_profile_idx on public.business_members (business_id, profile_id);
create index locations_business_idx on public.locations (business_id);
create index staff_business_idx on public.staff (business_id);
create index services_business_idx on public.services (business_id);
create index business_hours_business_idx on public.business_hours (business_id);
create index availability_exceptions_business_idx on public.availability_exceptions (business_id);
create index clients_business_idx on public.clients (business_id);
create index client_blocks_business_idx on public.client_blocks (business_id);
create index bookings_business_idx on public.bookings (business_id, starts_at);
create index bookings_client_idx on public.bookings (client_id);
create index booking_status_history_booking_idx on public.booking_status_history (booking_id);
create index reviews_business_idx on public.reviews (business_id);
create index payment_intents_business_idx on public.payment_intents (business_id);
create index notifications_business_idx on public.notifications (business_id);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger businesses_set_updated_at
before update on public.businesses
for each row execute function public.set_updated_at();

create trigger business_members_set_updated_at
before update on public.business_members
for each row execute function public.set_updated_at();

create trigger locations_set_updated_at
before update on public.locations
for each row execute function public.set_updated_at();

create trigger staff_set_updated_at
before update on public.staff
for each row execute function public.set_updated_at();

create trigger services_set_updated_at
before update on public.services
for each row execute function public.set_updated_at();

create trigger business_hours_set_updated_at
before update on public.business_hours
for each row execute function public.set_updated_at();

create trigger availability_exceptions_set_updated_at
before update on public.availability_exceptions
for each row execute function public.set_updated_at();

create trigger clients_set_updated_at
before update on public.clients
for each row execute function public.set_updated_at();

create trigger client_blocks_set_updated_at
before update on public.client_blocks
for each row execute function public.set_updated_at();

create trigger bookings_set_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

create trigger reviews_set_updated_at
before update on public.reviews
for each row execute function public.set_updated_at();

create trigger payment_intents_set_updated_at
before update on public.payment_intents
for each row execute function public.set_updated_at();

create trigger deposits_set_updated_at
before update on public.deposits
for each row execute function public.set_updated_at();

create trigger notifications_set_updated_at
before update on public.notifications
for each row execute function public.set_updated_at();

create or replace function public.is_platform_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and platform_role = 'admin'
  );
$$;

create or replace function public.is_business_member(target_business_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.business_members
    where business_id = target_business_id
      and profile_id = auth.uid()
      and is_active = true
  );
$$;

alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.business_members enable row level security;
alter table public.locations enable row level security;
alter table public.staff enable row level security;
alter table public.services enable row level security;
alter table public.business_hours enable row level security;
alter table public.availability_exceptions enable row level security;
alter table public.clients enable row level security;
alter table public.client_blocks enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_status_history enable row level security;
alter table public.reviews enable row level security;
alter table public.payment_intents enable row level security;
alter table public.deposits enable row level security;
alter table public.notifications enable row level security;

create policy "profiles_self_select"
on public.profiles
for select
using (id = auth.uid() or public.is_platform_admin());

create policy "profiles_self_update"
on public.profiles
for update
using (id = auth.uid() or public.is_platform_admin())
with check (id = auth.uid() or public.is_platform_admin());

create policy "businesses_public_read_active"
on public.businesses
for select
using (status = 'active' or public.is_business_member(id) or public.is_platform_admin());

create policy "businesses_insert_owner"
on public.businesses
for insert
to authenticated
with check (owner_profile_id = auth.uid() or public.is_platform_admin());

create policy "businesses_update_member"
on public.businesses
for update
to authenticated
using (public.is_business_member(id) or public.is_platform_admin())
with check (public.is_business_member(id) or public.is_platform_admin());

create policy "business_members_select_member"
on public.business_members
for select
to authenticated
using (public.is_business_member(business_id) or public.is_platform_admin());

create policy "business_members_manage_owner"
on public.business_members
for all
to authenticated
using (public.is_business_member(business_id) or public.is_platform_admin())
with check (public.is_business_member(business_id) or public.is_platform_admin());

create policy "locations_public_read_active_business"
on public.locations
for select
using (
  exists (
    select 1
    from public.businesses
    where businesses.id = locations.business_id
      and businesses.status = 'active'
  )
  or public.is_business_member(business_id)
  or public.is_platform_admin()
);

create policy "locations_manage_members"
on public.locations
for all
to authenticated
using (public.is_business_member(business_id) or public.is_platform_admin())
with check (public.is_business_member(business_id) or public.is_platform_admin());

create policy "staff_public_read_active_business"
on public.staff
for select
using (
  exists (
    select 1
    from public.businesses
    where businesses.id = staff.business_id
      and businesses.status = 'active'
  )
  or public.is_business_member(business_id)
  or public.is_platform_admin()
);

create policy "staff_manage_members"
on public.staff
for all
to authenticated
using (public.is_business_member(business_id) or public.is_platform_admin())
with check (public.is_business_member(business_id) or public.is_platform_admin());

create policy "services_public_read_active_business"
on public.services
for select
using (
  is_active = true
  and exists (
    select 1
    from public.businesses
    where businesses.id = services.business_id
      and businesses.status = 'active'
  )
  or public.is_business_member(business_id)
  or public.is_platform_admin()
);

create policy "services_manage_members"
on public.services
for all
to authenticated
using (public.is_business_member(business_id) or public.is_platform_admin())
with check (public.is_business_member(business_id) or public.is_platform_admin());

create policy "business_hours_public_read_active_business"
on public.business_hours
for select
using (
  exists (
    select 1
    from public.businesses
    where businesses.id = business_hours.business_id
      and businesses.status = 'active'
  )
  or public.is_business_member(business_id)
  or public.is_platform_admin()
);

create policy "business_hours_manage_members"
on public.business_hours
for all
to authenticated
using (public.is_business_member(business_id) or public.is_platform_admin())
with check (public.is_business_member(business_id) or public.is_platform_admin());

create policy "availability_exceptions_manage_members"
on public.availability_exceptions
for all
to authenticated
using (public.is_business_member(business_id) or public.is_platform_admin())
with check (public.is_business_member(business_id) or public.is_platform_admin());

create policy "clients_manage_members"
on public.clients
for all
to authenticated
using (
  public.is_business_member(business_id)
  or profile_id = auth.uid()
  or public.is_platform_admin()
)
with check (
  public.is_business_member(business_id)
  or profile_id = auth.uid()
  or public.is_platform_admin()
);

create policy "client_blocks_manage_members"
on public.client_blocks
for all
to authenticated
using (public.is_business_member(business_id) or public.is_platform_admin())
with check (public.is_business_member(business_id) or public.is_platform_admin());

create policy "bookings_member_or_client_read"
on public.bookings
for select
to authenticated
using (
  public.is_business_member(business_id)
  or created_by_profile_id = auth.uid()
  or exists (
    select 1
    from public.clients
    where clients.id = bookings.client_id
      and clients.profile_id = auth.uid()
  )
  or public.is_platform_admin()
);

create policy "bookings_insert_authenticated"
on public.bookings
for insert
to authenticated
with check (
  created_by_profile_id = auth.uid()
  or public.is_business_member(business_id)
  or public.is_platform_admin()
);

create policy "bookings_update_member_or_owner"
on public.bookings
for update
to authenticated
using (
  public.is_business_member(business_id)
  or created_by_profile_id = auth.uid()
  or public.is_platform_admin()
)
with check (
  public.is_business_member(business_id)
  or created_by_profile_id = auth.uid()
  or public.is_platform_admin()
);

create policy "booking_status_history_member_read"
on public.booking_status_history
for select
to authenticated
using (
  exists (
    select 1
    from public.bookings
    where bookings.id = booking_status_history.booking_id
      and (
        public.is_business_member(bookings.business_id)
        or bookings.created_by_profile_id = auth.uid()
        or public.is_platform_admin()
      )
  )
);

create policy "booking_status_history_member_write"
on public.booking_status_history
for insert
to authenticated
with check (
  exists (
    select 1
    from public.bookings
    where bookings.id = booking_status_history.booking_id
      and (
        public.is_business_member(bookings.business_id)
        or bookings.created_by_profile_id = auth.uid()
        or public.is_platform_admin()
      )
  )
);

create policy "reviews_public_read"
on public.reviews
for select
using (true);

create policy "reviews_insert_client_or_member"
on public.reviews
for insert
to authenticated
with check (
  public.is_business_member(business_id)
  or exists (
    select 1
    from public.clients
    where clients.id = reviews.client_id
      and clients.profile_id = auth.uid()
  )
  or public.is_platform_admin()
);

create policy "reviews_update_client_or_member"
on public.reviews
for update
to authenticated
using (
  public.is_business_member(business_id)
  or exists (
    select 1
    from public.clients
    where clients.id = reviews.client_id
      and clients.profile_id = auth.uid()
  )
  or public.is_platform_admin()
)
with check (
  public.is_business_member(business_id)
  or exists (
    select 1
    from public.clients
    where clients.id = reviews.client_id
      and clients.profile_id = auth.uid()
  )
  or public.is_platform_admin()
);

create policy "payment_intents_manage_members"
on public.payment_intents
for all
to authenticated
using (public.is_business_member(business_id) or public.is_platform_admin())
with check (public.is_business_member(business_id) or public.is_platform_admin());

create policy "deposits_member_or_client_read"
on public.deposits
for select
to authenticated
using (
  exists (
    select 1
    from public.bookings
    where bookings.id = deposits.booking_id
      and (
        public.is_business_member(bookings.business_id)
        or bookings.created_by_profile_id = auth.uid()
        or public.is_platform_admin()
      )
  )
);

create policy "deposits_manage_members"
on public.deposits
for all
to authenticated
using (
  exists (
    select 1
    from public.bookings
    where bookings.id = deposits.booking_id
      and (
        public.is_business_member(bookings.business_id)
        or public.is_platform_admin()
      )
  )
)
with check (
  exists (
    select 1
    from public.bookings
    where bookings.id = deposits.booking_id
      and (
        public.is_business_member(bookings.business_id)
        or public.is_platform_admin()
      )
  )
);

create policy "notifications_manage_members"
on public.notifications
for all
to authenticated
using (public.is_business_member(business_id) or public.is_platform_admin())
with check (public.is_business_member(business_id) or public.is_platform_admin());
