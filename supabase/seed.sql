insert into public.businesses (
  id,
  slug,
  name,
  category,
  city,
  tagline,
  description,
  timezone,
  price_range,
  rating,
  next_available_label,
  status
)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'amber-and-oak-barber-lab',
    'Amber & Oak Barber Lab',
    'Barber',
    'Warsaw',
    'Sharp fades, warm ritual, frictionless booking.',
    'Premium barber concept optimized for repeat visits and polished booking flows.',
    'Europe/Warsaw',
    '80-220 PLN',
    4.9,
    'Today at 18:15',
    'active'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'studio-cerise-brows-skin',
    'Studio Cerise Brows & Skin',
    'Brows',
    'Krakow',
    'Calm aesthetic space for brows, tint, and skin touch-ups.',
    'Boutique beauty studio designed for recurring appointments and polished service pages.',
    'Europe/Warsaw',
    '90-360 PLN',
    4.8,
    'Tomorrow at 09:30',
    'active'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'northline-recovery-massage',
    'Northline Recovery Massage',
    'Massage',
    'Gdansk',
    'Sports recovery and bodywork with structured treatment plans.',
    'Treatment-led studio with strong package and retention potential.',
    'Europe/Warsaw',
    '150-420 PLN',
    4.9,
    'Friday at 13:45',
    'active'
  )
on conflict (id) do nothing;

insert into public.locations (
  id,
  business_id,
  name,
  address_line_1,
  city,
  postal_code,
  country_code
)
values
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    '11111111-1111-1111-1111-111111111111',
    'Amber & Oak Downtown',
    'Mokotowska 12',
    'Warsaw',
    '00-001',
    'PL'
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    '22222222-2222-2222-2222-222222222222',
    'Studio Cerise Main Room',
    'Starowislna 7',
    'Krakow',
    '31-032',
    'PL'
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3',
    '33333333-3333-3333-3333-333333333333',
    'Northline Recovery',
    'Grunwaldzka 84',
    'Gdansk',
    '80-244',
    'PL'
  )
on conflict (id) do nothing;

insert into public.staff (
  id,
  business_id,
  location_id,
  slug,
  display_name,
  specialty,
  bio,
  is_bookable
)
values
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb001',
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    'mikolaj',
    'Mikolaj',
    'Fades and precision beards',
    'Senior barber focused on high-retention repeat clients.',
    true
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb002',
    '22222222-2222-2222-2222-222222222222',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    'karina',
    'Karina',
    'Brows and tint design',
    'Beauty specialist handling repeat brow maintenance journeys.',
    true
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb003',
    '33333333-3333-3333-3333-333333333333',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3',
    'tomasz',
    'Tomasz',
    'Deep tissue and rehab support',
    'Recovery-focused therapist serving athletes and active clients.',
    true
  )
on conflict (id) do nothing;

insert into public.services (
  id,
  business_id,
  location_id,
  staff_id,
  name,
  description,
  duration_minutes,
  price_minor,
  currency,
  deposit_required,
  deposit_minor,
  is_active
)
values
  (
    'cccccccc-cccc-cccc-cccc-ccccccccc001',
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb001',
    'Skin fade + beard',
    'Detailed fade with beard line and finish.',
    75,
    17000,
    'PLN',
    true,
    2000,
    true
  ),
  (
    'cccccccc-cccc-cccc-cccc-ccccccccc002',
    '22222222-2222-2222-2222-222222222222',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb002',
    'Signature brow shaping',
    'Consultation-led brow shaping session.',
    50,
    14000,
    'PLN',
    true,
    1500,
    true
  ),
  (
    'cccccccc-cccc-cccc-cccc-ccccccccc003',
    '33333333-3333-3333-3333-333333333333',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb003',
    '90-min athlete recovery',
    'Recovery treatment with focused muscle work.',
    90,
    29000,
    'PLN',
    true,
    4000,
    true
  )
on conflict (id) do nothing;
