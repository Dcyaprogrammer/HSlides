# Vercel Deployment Guide

## Project Configuration

This is a Next.js project configured for static export, ready for Vercel deployment.

### Project Settings
- **Framework**: Next.js (auto-detected)
- **Root Directory**: `.`
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Install Command**: `npm install`
- **Dev Command**: `npm run dev`

## Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy the Project
```bash
vercel --yes
```

The `--yes` flag accepts all default settings and deploys immediately.

### 4. Note the Deployment URL
After deployment, Vercel will provide a URL like:
- `https://hslides-<random-id>.vercel.app`

### 5. Set Custom Domain (Optional)
In Vercel dashboard:
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records

## Environment Variables

If your project needs environment variables (e.g., for Supabase):

1. **Via Vercel CLI:**
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

2. **Via Vercel Dashboard:**
   - Go to Project Settings > Environment Variables
   - Add variables for each environment (Production, Preview, Development)

3. **Required Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Configuration Files

### vercel.json
Explicitly defines build settings for Vercel.

### .vercelignore
Specifies files to exclude from deployment (similar to .gitignore).

### .gitignore
Prevents unnecessary files from being committed to git.

## Static Export Configuration

This project uses Next.js static export (`output: 'export'`), which:
- Pre-renders all pages to static HTML
- No server-side rendering
- Optimized for CDN deployment
- No API routes (client-side only)

## Post-Deployment Checklist

- [ ] Verify site loads correctly
- [ ] Check all slide images display properly
- [ ] Test modal functionality
- [ ] Confirm responsive design works on mobile
- [ ] Add custom domain (if needed)
- [ ] Set up environment variables (if using Supabase)
- [ ] Enable automatic deployments from git

## Automatic Deployments

To enable automatic deployments when you push to git:

```bash
vercel link
```

Then connect your GitHub repository in Vercel dashboard.

## Troubleshooting

### Build Errors
- Check `next.config.js` has `output: 'export'`
- Verify all dependencies are in `package.json`
- Ensure no server-only code is in components

### Missing Assets
- Ensure images are in `/public` directory
- Use `/images/filename.png` paths (not relative)
- Check `next.config.js` has `images.unoptimized: true`

### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_` for client access
- Variables are set in correct environment (Production vs Preview)
- Redeploy after adding new variables

## Deployment URL

After deployment, update this section with your actual deployment URL:

- **Production URL**: (Will be provided after first deployment)
- **Preview URLs**: (Will be created for each branch)
