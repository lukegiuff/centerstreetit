#!/bin/bash

# Deployment script for Decap CMS Cloudflare Worker
# Run this after setting up GitHub OAuth App

echo "🚀 Deploying Decap CMS OAuth Worker to Cloudflare..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Please install it first:"
    echo "npm install -g wrangler"
    exit 1
fi

# Check if user is logged in to Cloudflare
if ! wrangler whoami &> /dev/null; then
    echo "🔐 Please log in to Cloudflare first:"
    echo "wrangler login"
    exit 1
fi

# Prompt for GitHub OAuth credentials
echo ""
echo "📝 Please enter your GitHub OAuth App credentials:"
echo "(You can create these at: https://github.com/settings/applications/new)"
echo ""

read -p "GitHub Client ID: " GITHUB_CLIENT_ID
read -s -p "GitHub Client Secret: " GITHUB_CLIENT_SECRET
echo ""

# Validate inputs
if [ -z "$GITHUB_CLIENT_ID" ] || [ -z "$GITHUB_CLIENT_SECRET" ]; then
    echo "❌ Both Client ID and Client Secret are required!"
    exit 1
fi

# Set secrets in Cloudflare Worker
echo "🔑 Setting up secrets..."
echo "$GITHUB_CLIENT_ID" | wrangler secret put GITHUB_CLIENT_ID
echo "$GITHUB_CLIENT_SECRET" | wrangler secret put GITHUB_CLIENT_SECRET

# Deploy the worker
echo "🚀 Deploying worker..."
wrangler deploy

# Get the worker URL
WORKER_URL=$(wrangler subdomain get 2>/dev/null | grep -o "https://.*\.workers\.dev" | head -1)

if [ -z "$WORKER_URL" ]; then
    # Fallback to try getting from deployment output
    WORKER_URL="https://centerstreetit-cms-oauth.your-subdomain.workers.dev"
    echo "⚠️  Could not auto-detect worker URL. It should be something like:"
    echo "   $WORKER_URL"
else
    echo "✅ Worker deployed successfully!"
    echo "🔗 Worker URL: $WORKER_URL"
fi

echo ""
echo "🔧 Next steps:"
echo "1. Update your GitHub OAuth App settings:"
echo "   - Authorization callback URL: $WORKER_URL/callback"
echo "   - Homepage URL: https://your-domain.com"
echo ""
echo "2. Update your CMS config (public/admin/config.yml):"
echo "   - repo: your-username/your-repo-name"
echo "   - app_id: $GITHUB_CLIENT_ID"
echo ""
echo "3. Test the CMS at: https://your-domain.com/admin/"
echo ""
echo "🎉 Setup complete!"
