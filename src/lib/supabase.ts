import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dziqhfdtejeuwuubqjeo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6aXFoZmR0ZWpldXd1dWJxamVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNDcxODYsImV4cCI6MjA2OTgyMzE4Nn0.JCHoe_Ly17FOA5YREUnOGklQU4s6XCz10P_gRms5lc8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
