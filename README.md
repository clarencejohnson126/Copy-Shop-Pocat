# Pocat - Copy Shop Website

A professional website for Pocat, a copy shop in Heidelberg, built with React, Vite, TypeScript, and Supabase for authentication.

## Development

1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Copy the `.env.example` file to `.env` and fill in your Supabase credentials
```bash
cp .env.example .env
```
4. Run the development server
```bash
npm run dev
```

## Deployment to Vercel

### Option 1: Using the Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Login to [Vercel](https://vercel.com)
3. Click "New Project" and import your repository
4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
6. Click "Deploy"

### Option 2: Using the Vercel CLI

1. Install the Vercel CLI
```bash
npm install -g vercel
```
2. Login to Vercel
```bash
vercel login
```
3. Deploy the project
```bash
vercel
```
4. Follow the prompts to configure your project

## Troubleshooting Deployment Issues

If you encounter a 404 NOT_FOUND error with ID format `fra1:49bnx-xxxxxxxxxx-xxxxxxxx`:

1. Make sure your `vercel.json` configuration is correct
2. Check that all TypeScript types are properly defined
3. Verify that environment variables are set correctly in the Vercel dashboard
4. Check your build output for any errors or warnings
5. Try running a local build with `npm run build` to debug any issues

## Project Structure

- `/src`: Source code
  - `/components`: React components
  - `/contexts`: Context providers (Language, Theme)
  - `/lib`: Utility functions and libraries
  - `/pages`: Page components
  - `/types`: TypeScript type definitions

## Authentication

The project uses Supabase Authentication for user management. Users can sign up, sign in, and manage their sessions with automatic token refreshing. 