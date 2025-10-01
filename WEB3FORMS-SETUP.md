# Web3Forms Setup Guide

## Overview
The contact form on this website uses Web3Forms to handle form submissions. Web3Forms is a free service that allows you to receive form submissions directly to your email without needing a backend server.

## Setup Instructions

### 1. Get Your Web3Forms Access Key
1. Visit [https://web3forms.com/](https://web3forms.com/)
2. Sign up for a free account
3. Create a new form and get your access key

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace `your_web3forms_access_key_here` with your actual Web3Forms access key:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
   ```

### 3. Test the Form
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact page and test the form
3. Check your email for form submissions

## Features
- ✅ Form validation
- ✅ Loading states during submission
- ✅ Success/error feedback messages
- ✅ Automatic form reset after successful submission
- ✅ Professional email formatting with company branding

## Form Fields
The contact form collects:
- Name (required)
- Email (required)
- Company Name (required)
- Phone (required)
- Message (optional)

## Email Configuration
Form submissions will be sent with:
- **Subject**: "New Contact Form Submission from [Name]"
- **From Name**: "Center Street IT Website"
- **Reply-To**: The submitter's email address

## Security
- The access key is exposed on the client side (hence `NEXT_PUBLIC_` prefix)
- Web3Forms provides spam protection and rate limiting
- Form submissions are validated both client-side and server-side by Web3Forms
