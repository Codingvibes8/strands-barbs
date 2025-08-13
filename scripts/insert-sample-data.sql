-- Insert sample appointments (using the inserted user and service IDs)
INSERT INTO public.appointments (
    user_id,
    barber_id,
    service_id,
    appointment_date,
    appointment_time,
    status,
    customer_name,
    customer_email,
    customer_phone,
    notes,
    total_price_gbp
)
SELECT
    u.id as user_id,
    b.id as barber_id,
    s.id as service_id,
    CURRENT_DATE + INTERVAL '1 day' as appointment_date,
    '10:00:00'::TIME as appointment_time,
    'confirmed' as status,
    'John Doe' as customer_name,
    'john.doe@example.com' as customer_email,
    '+44 7700 900123' as customer_phone,
    'Regular customer, prefers shorter on the sides' as notes,
    20.00 as total_price_gbp
FROM public.users u, public.barbers b, public.services s
WHERE u.email = 'john.doe@example.com'
  AND b.name = 'Marcus Thompson'
  AND s.name = 'Classic Cut'
  AND NOT EXISTS (
    SELECT 1 FROM public.appointments a
    WHERE a.barber_id = b.id
  AND a.appointment_date = CURRENT_DATE + INTERVAL '1 day'
  AND a.appointment_time = '10:00:00'::TIME
    )
    LIMIT 1;

INSERT INTO public.appointments (
    user_id,
    barber_id,
    service_id,
    appointment_date,
    appointment_time,
    status,
    customer_name,
    customer_email,
    customer_phone,
    notes,
    total_price_gbp
)
SELECT
    u.id as user_id,
    b.id as barber_id,
    s.id as service_id,
    CURRENT_DATE + INTERVAL '2 days' as appointment_date,
    '14:30:00'::TIME as appointment_time,
    'pending' as status,
    'Mike Smith' as customer_name,
    'mike.smith@example.com' as customer_email,
    '+44 7700 900124' as customer_phone,
    'First time customer, wants a modern style' as notes,
    35.00 as total_price_gbp
FROM public.users u, public.barbers b, public.services s
WHERE u.email = 'mike.smith@example.com'
  AND b.name = 'James Rodriguez'
  AND s.name = 'Premium Style'
  AND NOT EXISTS (
    SELECT 1 FROM public.appointments a
    WHERE a.barber_id = b.id
  AND a.appointment_date = CURRENT_DATE + INTERVAL '2 days'
  AND a.appointment_time = '14:30:00'::TIME
    )
    LIMIT 1;