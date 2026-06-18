# HSlides
HTML Slides Platform for Everyone

## Phase 2: Supabase Migration Setup

This section documents the Supabase setup for the upcoming Phase 2 migration from file-based to database-based storage.

### Prerequisites

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Note your project URL and anon key from the project settings

### Environment Setup

The `.env.local` file already contains placeholder credentials for Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace these placeholders with your actual Supabase project credentials:
- `your_supabase_project_url` - Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
- `your_supabase_anon_key` - Your Supabase anonymous/public key

### Database Setup

1. Open your Supabase project's SQL Editor in the dashboard
2. Run the SQL script from `docs/supabase-setup.sql`
3. This will create:
   - `slides` table with all required fields
   - Index on `featured` column for performance
   - Row Level Security (RLS) policies for data protection

### Database Schema

The `slides` table includes the following fields:
- `id` (UUID, primary key) - Unique identifier for each slide
- `title` (TEXT, required) - Slide title
- `description` (TEXT) - Slide description
- `thumbnail` (TEXT) - URL to slide thumbnail image
- `source_url` (TEXT) - URL to view the slide
- `github_url` (TEXT) - URL to slide source code
- `prompt` (TEXT) - The prompt used to generate the slide
- `author_name` (TEXT) - Name of the slide author
- `author_url` (TEXT) - URL to author's profile
- `tags` (TEXT[]) - Array of tags for categorization
- `featured` (BOOLEAN) - Whether the slide is featured
- `created_at` (TIMESTAMP) - Creation timestamp

### Security Policies

The SQL script sets up Row Level Security (RLS) with the following policies:
- **Public read access**: Anyone can view slides
- **Authenticated insert**: Only authenticated users can create new slides

Additional policies for update/delete operations are commented out and can be enabled as needed.

### Migration Notes

This setup prepares the codebase for Phase 2 migration. The actual migration will:
1. Convert existing JSON slides data to database format
2. Update components to use Supabase client instead of file imports
3. Implement real-time data synchronization
4. Add user authentication for slide management
