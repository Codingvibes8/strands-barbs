-- Enable Row Level Security (RLS) policies
-- Run this script after creating tables

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Services table policies
-- Services are publicly readable, only admins can modify
CREATE POLICY "Services are publicly readable" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify services" ON public.services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND email IN ('admin@barbershop.com', 'manager@barbershop.com')
    )
  );

-- Barbers table policies
-- Barbers are publicly readable, only admins can modify
CREATE POLICY "Barbers are publicly readable" ON public.barbers
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify barbers" ON public.barbers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND email IN ('admin@barbershop.com', 'manager@barbershop.com')
    )
  );

-- Appointments table policies
-- Users can only see their own appointments
-- Admins can see all appointments
CREATE POLICY "Users can view own appointments" ON public.appointments
  FOR SELECT USING (
                        auth.uid() = user_id OR
                        EXISTS (
                        SELECT 1 FROM public.users
                        WHERE id = auth.uid()
                        AND email IN ('admin@barbershop.com', 'manager@barbershop.com')
                        )
                        );

-- Users can create appointments
CREATE POLICY "Users can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR
    auth.uid() IS NULL -- Allow anonymous bookings
  );

-- Users can update their own appointments (for cancellation)
-- Admins can update any appointment
CREATE POLICY "Users can update own appointments" ON public.appointments
  FOR UPDATE USING (
                        auth.uid() = user_id OR
                        EXISTS (
                        SELECT 1 FROM public.users
                        WHERE id = auth.uid()
                        AND email IN ('admin@barbershop.com', 'manager@barbershop.com')
                        )
                        );

-- Only admins can delete appointments
CREATE POLICY "Only admins can delete appointments" ON public.appointments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND email IN ('admin@barbershop.com', 'manager@barbershop.com')
    )
  );
