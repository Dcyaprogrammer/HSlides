-- HSlides Supabase Setup Script
-- This script sets up the database schema for HSlides Phase 2 migration
-- Run this in your Supabase project's SQL Editor

-- Create the slides table
CREATE TABLE IF NOT EXISTS slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  source_url TEXT,
  github_url TEXT,
  prompt TEXT,
  author_name TEXT,
  author_url TEXT,
  tags TEXT[], -- Array of tags
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on featured column for faster queries
CREATE INDEX IF NOT EXISTS idx_slides_featured ON slides(featured);

-- Enable Row Level Security (RLS)
ALTER TABLE slides ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
-- Anyone can read slides
CREATE POLICY "Enable read access for all users"
ON slides FOR SELECT
TO public
USING (true);

-- Create policy for authenticated inserts
-- Only authenticated users can insert new slides
CREATE POLICY "Enable insert for authenticated users"
ON slides FOR INSERT
TO authenticated
WITH CHECK (true);

-- Optional: Create policy for authenticated users to update their own slides
-- Uncomment if you want users to edit their own slides
-- CREATE POLICY "Enable update for authenticated users"
-- ON slides FOR UPDATE
-- TO authenticated
-- USING (true)
-- WITH CHECK (true);

-- Optional: Create policy for authenticated users to delete their own slides
-- Uncomment if you want users to delete their own slides
-- CREATE POLICY "Enable delete for authenticated users"
-- ON slides FOR DELETE
-- TO authenticated
-- USING (true);
