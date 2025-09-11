// Cloudflare Worker for Decap CMS OAuth with GitHub
// Deploy this to: decap-proxy-centerstreetit.giuffa88.workers.dev
// This worker handles the OAuth flow between Decap CMS and GitHub

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // OAuth callback handler
    if (url.pathname === '/callback') {
      return handleCallback(request, env);
    }

    // OAuth authorization handler  
    if (url.pathname === '/auth') {
      return handleAuth(request, env);
    }

    // Default response
    return new Response('Decap CMS OAuth Worker for Center Street IT', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
    });
  },
};

async function handleAuth(request, env) {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider');
  
  if (provider !== 'github') {
    return new Response('Only GitHub provider is supported', { status: 400 });
  }

  // Generate a random state parameter for security
  const state = crypto.randomUUID();
  
  // GitHub OAuth authorization URL
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
  authUrl.searchParams.set('scope', 'repo,user');
  authUrl.searchParams.set('state', state);

  return Response.redirect(authUrl.toString(), 302);
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code) {
    return new Response('Authorization code missing', { status: 400 });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }

    // Get user information
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'User-Agent': 'Decap-CMS-OAuth-Worker',
      },
    });

    const userData = await userResponse.json();

    // Return success page with the token for Decap CMS to use
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Authorization Successful</title>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
        }
        .success {
            color: #28a745;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
        .user-info {
            color: #666;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success">✅ Authorization Successful!</div>
        <div class="user-info">
            Welcome, <strong>${userData.name || userData.login}</strong>
        </div>
        <p>You can now close this window and return to the CMS.</p>
    </div>
    
    <script>
        // Robust postMessage authentication for Decap CMS
        if (window.opener) {
            const authData = {
                token: '${tokenData.access_token}',
                provider: 'github'
            };
            
            console.log('Starting authentication handshake...');
            console.log('window.opener exists:', !!window.opener);
            
            // Get the opener origin safely
            let openerOrigin = '*';
            try {
                openerOrigin = window.opener.origin || window.opener.location.origin || '*';
                console.log('Opener origin:', openerOrigin);
            } catch (e) {
                console.log('Could not get opener origin, using wildcard');
                openerOrigin = '*';
            }
            
            // Function to send messages safely
            const sendMessage = (message, origin = openerOrigin) => {
                try {
                    console.log('Sending message:', message, 'to origin:', origin);
                    window.opener.postMessage(message, origin);
                    return true;
                } catch (e) {
                    console.error('Error sending message:', e);
                    return false;
                }
            };
            
            // Try multiple message formats for maximum compatibility
            const sendAuthSuccess = () => {
                console.log('Sending authentication success...');
                
                // Format 1: Standard Decap CMS format
                sendMessage(\`authorization:github:success:\${JSON.stringify(authData)}\`);
                
                // Format 2: Object format
                sendMessage({
                    type: 'authorization_success',
                    provider: 'github',
                    token: '${tokenData.access_token}'
                });
                
                // Format 3: Simple string format
                sendMessage('authorization:github:success:' + '${tokenData.access_token}');
                
                console.log('All message formats sent, closing popup...');
                setTimeout(() => {
                    try {
                        window.close();
                    } catch (e) {
                        console.log('Could not close popup automatically');
                    }
                }, 1000);
            };
            
            // Step 1: Try handshake approach first
            console.log('Attempting handshake approach...');
            sendMessage("authorizing:github");
            
            // Step 2: Listen for acknowledgment
            const receiveMessage = (message) => {
                console.log('Received message:', message.data);
                
                if (message.data === "authorization:github:acknowledged") {
                    console.log('CMS acknowledged, sending token via handshake...');
                    sendMessage(\`authorization:github:success:\${JSON.stringify(authData)}\`);
                    window.removeEventListener("message", receiveMessage);
                    setTimeout(() => window.close(), 500);
                }
            };
            
            window.addEventListener("message", receiveMessage, false);
            
            // Step 3: Fallback after 2 seconds - send directly
            setTimeout(() => {
                console.log('No handshake response, sending directly...');
                window.removeEventListener("message", receiveMessage);
                sendAuthSuccess();
            }, 2000);
            
        } else {
            console.error('No window.opener available');
            setTimeout(() => window.close(), 3000);
        }
    </script>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('OAuth error:', error);
    
    const errorHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Authorization Failed</title>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
        }
        .error {
            color: #dc3545;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="error">❌ Authorization Failed</div>
        <p>Error: ${error.message}</p>
        <p>Please try again or contact support.</p>
    </div>
</body>
</html>`;

    return new Response(errorHtml, {
      status: 500,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
