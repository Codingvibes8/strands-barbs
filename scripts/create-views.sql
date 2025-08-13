-- Create useful views for the barber appointment system
-- Run this script after inserting sample data

-- View for appointment details with joined information
CREATE OR REPLACE VIEW public.appointment_details AS
SELECT
    a.id,
    a.appointment_date,
    a.appointment_time,
    a.status,
    a.customer_name,
    a.customer_email,
    a.customer_phone,
    a.notes,
    a.total_price_gbp,
    a.created_at,
    s.name as service_name,
    s.description as service_description,
    s.duration_minutes,
    b.name as barber_name,
    b.title as barber_title,
    u.full_name as user_full_name
FROM public.appointments a
         LEFT JOIN public.services s ON a.service_id = s.id
         LEFT JOIN public.barbers b ON a.barber_id = b.id
         LEFT JOIN public.users u ON a.user_id = u.id;

-- View for barber availability (shows busy times)
CREATE OR REPLACE VIEW public.barber_schedule AS
SELECT
    b.id as barber_id,
    b.name as barber_name,
    a.appointment_date,
    a.appointment_time,
    a.appointment_time + (s.duration_minutes || ' minutes')::INTERVAL as end_time,
        a.status,
    s.name as service_name
FROM public.barbers b
         LEFT JOIN public.appointments a ON b.id = a.barber_id
         LEFT JOIN public.services s ON a.service_id = s.id
WHERE a.status IN ('confirmed', 'pending')
ORDER BY b.name, a.appointment_date, a.appointment_time;

-- View for daily appointment summary
CREATE OR REPLACE VIEW public.daily_summary AS
SELECT
    appointment_date,
    COUNT(*) as total_appointments,
    COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_appointments,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_appointments,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_appointments,
    SUM(total_price_gbp) as total_revenue
FROM public.appointments
GROUP BY appointment_date
ORDER BY appointment_date;

-- Grant permissions on views
GRANT SELECT ON public.appointment_details TO authenticated, anon;
GRANT SELECT ON public.barber_schedule TO authenticated, anon;
GRANT SELECT ON public.daily_summary TO authenticated, anon;
