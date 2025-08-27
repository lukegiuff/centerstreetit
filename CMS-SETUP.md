# Decap CMS Setup Guide

This guide will help you set up the Decap CMS with GitHub OAuth authentication using Cloudflare Workers.

## Prerequisites

- GitHub repository for your website
- Cloudflare account
- Node.js and npm installed
- Wrangler CLI installed (`npm install -g wrangler`)

## Step 1: Create GitHub OAuth App

1. Go to [GitHub OAuth Apps](https://github.com/settings/applications/new)
2. Fill in the application details:
   - **Application name**: `Center Street IT CMS`
   - **Homepage URL**: `https://your-domain.com` (your actual website URL)
   - **Authorization callback URL**: `https://centerstreetit-cms-oauth.your-subdomain.workers.dev/callback`
   - **Application description**: `Content management for Center Street IT website`

3. Click "Register application"
4. **Important**: Save the **Client ID** and **Client Secret** - you'll need these for the Cloudflare Worker

## Step 2: Deploy Cloudflare Worker

### Option A: Using the deployment script (Recommended)

```bash
# Make the script executable
chmod +x deploy-cms-worker.sh

# Run the deployment script
./deploy-cms-worker.sh
```

The script will:
- Check if Wrangler is installed and you're logged in
- Prompt for your GitHub OAuth credentials
- Deploy the worker with the secrets
- Provide you with the worker URL

### Option B: Manual deployment

1. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

2. **Set up secrets**:
   ```bash
   wrangler secret put GITHUB_CLIENT_ID
   # Enter your GitHub Client ID when prompted
   
   wrangler secret put GITHUB_CLIENT_SECRET
   # Enter your GitHub Client Secret when prompted
   ```

3. **Deploy the worker**:
   ```bash
   wrangler deploy
   ```

4. **Note the worker URL** (e.g., `https://centerstreetit-cms-oauth.your-subdomain.workers.dev`)

## Step 3: Update GitHub OAuth App

1. Go back to your GitHub OAuth App settings
2. Update the **Authorization callback URL** to match your actual worker URL:
   `https://your-actual-worker-url.workers.dev/callback`

## Step 4: Update CMS Configuration

Edit `public/admin/config.yml` and update these values:

```yaml
backend:
  name: github
  repo: your-username/centerstreetit  # Replace with your actual GitHub repo
  branch: master
  auth_type: implicit
  app_id: your-github-client-id  # Replace with your actual GitHub OAuth App Client ID
```

## Step 5: Test the Setup

1. Build and deploy your website
2. Go to `https://your-domain.com/admin/`
3. Click "Login with GitHub"
4. You should be redirected to GitHub for authorization
5. After authorizing, you should be redirected back to the CMS

## Files Created

- `cloudflare-worker.js` - The OAuth worker code
- `wrangler.toml` - Cloudflare Worker configuration
- `deploy-cms-worker.sh` - Deployment script
- `CMS-SETUP.md` - This setup guide

## Troubleshooting

### "Invalid client" error
- Check that your GitHub Client ID in the CMS config matches your OAuth App
- Verify the callback URL in your GitHub OAuth App matches your worker URL

### "Authorization failed" error
- Check that your GitHub Client Secret is correctly set in Cloudflare Worker secrets
- Verify your worker is deployed and accessible

### CMS doesn't load
- Check browser console for errors
- Verify your website is served over HTTPS
- Make sure the admin page is accessible at `/admin/`

### Worker deployment fails
- Ensure you're logged in to Cloudflare: `wrangler whoami`
- Check your wrangler.toml configuration
- Verify you have permission to deploy workers in your Cloudflare account

## Security Notes

- Never commit GitHub Client Secret to your repository
- Use Cloudflare Worker secrets for sensitive information
- Regularly rotate your OAuth credentials
- Monitor worker logs for any suspicious activity

## Custom Domain (Optional)

To use a custom domain for your worker:

1. Add a custom route in `wrangler.toml`:
   ```toml
   routes = [
     { pattern = "cms-auth.your-domain.com/*", zone_name = "your-domain.com" }
   ]
   ```

2. Update your GitHub OAuth App callback URL accordingly

## Support

If you encounter issues:
1. Check the Cloudflare Worker logs
2. Verify all URLs and credentials are correct
3. Test the OAuth flow step by step
4. Check GitHub OAuth App settings
