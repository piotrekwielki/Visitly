# Marketplace Booking Platform - Architecture and MVP

## Product shape

The product combines two layers:

- a public marketplace for discovering service businesses
- an operational SaaS panel for running appointments, staff, services, and clients

The initial release targets appointment-based verticals such as beauty, barber, wellness, massage, tattoo, and consultations.

## MVP scope

### In scope

- public discovery pages for businesses and staff
- business profile pages with services, reviews, and gallery placeholders
- customer auth via Supabase Auth
- customer booking flow
- booking reschedule and cancel rules in domain logic
- business onboarding shell
- business dashboard for bookings, services, and clients
- calendar-oriented operational views
- multi-tenant data model in Supabase
- row level security foundations
- payment abstraction for future processor integration
- notification model and audit trail foundations
- platform admin overview shell

### Out of scope for MVP

- real payment gateway integration
- SMS, email, and push provider integrations
- advanced analytics
- marketplace ads and boost ranking engine
- subscriptions, memberships, gift cards, and packages as full UX flows
- native mobile apps
- two-way calendar sync with Google or Outlook

## Technical architecture

### Frontend

- Next.js App Router with TypeScript
- Server Components by default
- Client Components only for interactive forms, filters, and booking UX
- Tailwind CSS and shadcn-style primitives

### Backend

- Route Handlers and Server Actions for app-side orchestration
- Supabase for Postgres, Auth, Storage, and Realtime
- Domain services isolated from transport and rendering layers

### Data flow

1. Route loads in App Router server component.
2. Server component calls a service from `src/lib/services`.
3. Service delegates to a repository in `src/lib/repositories`.
4. Repository reads from Supabase if configured.
5. If local env is not configured yet, repository falls back to demo data for marketplace and dashboard scaffolding.

## Tenant model

The system is business-centric:

- one `business` is a tenant root
- one business can have multiple `locations`
- one business can have multiple `staff`
- one user can belong to multiple businesses through `business_members`
- clients are business-scoped CRM entities
- bookings always belong to a business, location, service, and optionally a staff member

## Roles

- guest: public browsing only
- customer: books and manages own appointments
- owner: full business control
- staff: manages assigned bookings and availability
- admin: platform-wide visibility and moderation

## App zones

### Public marketplace

- `/`
- `/discover`
- `/business/[slug]`
- `/book/[businessSlug]`

### Customer area

- auth routes
- booking history and account routes can be added on top of the shared shell

### Business SaaS panel

- `/dashboard`
- `/dashboard/bookings`
- `/dashboard/services`
- `/dashboard/clients`

### Platform admin

- `/admin`

## Domain boundaries

### Discovery

Responsible for public search, business cards, business profile reads, and staff profile reads.

### Booking

Responsible for booking creation, cancellation rules, reschedule logic, status transitions, and slot availability calculation.

### Business operations

Responsible for services, staff, opening hours, availability exceptions, and CRM.

### Payments

Responsible for abstract payment intent lifecycle, deposits, cancellation fees, and future provider adapters.

### Notifications

Responsible for event creation, message scheduling, and delivery status models.

## Data model summary

Core tables for MVP:

- `profiles`
- `businesses`
- `business_members`
- `locations`
- `staff`
- `services`
- `business_hours`
- `availability_exceptions`
- `clients`
- `client_blocks`
- `bookings`
- `booking_status_history`
- `reviews`
- `payment_intents`
- `deposits`
- `notifications`

## Security and auth

- Supabase Auth handles user identity
- `profiles` mirrors authenticated users
- RLS policies are business-aware
- business membership controls access to business records
- admin access is represented through a `platform_role` on `profiles`

## Time handling

- all persisted timestamps use `timestamptz`
- businesses store an IANA timezone such as `Europe/Warsaw`
- booking rule evaluation must use business timezone, not browser local time

## Delivery plan

1. Bootstrap the app shell and package configuration.
2. Add shared UI primitives and page layouts.
3. Add domain types, services, repositories, and demo data fallback.
4. Add Supabase clients, env handling, and auth helpers.
5. Add SQL migrations and seed scripts.
6. Add README and deployment instructions for Vercel.
