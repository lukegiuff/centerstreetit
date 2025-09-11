var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// cloudflare-worker-centerstreetit.js
var cloudflare_worker_centerstreetit_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400"
        }
      });
    }
    if (url.pathname === "/callback") {
      return handleCallback(request, env);
    }
    if (url.pathname === "/auth") {
      return handleAuth(request, env);
    }
    return new Response("Decap CMS OAuth Worker for Center Street IT", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain"
      }
    });
  }
};
async function handleAuth(request, env) {
  const url = new URL(request.url);
  const provider = url.searchParams.get("provider");
  if (provider !== "github") {
    return new Response("Only GitHub provider is supported", { status: 400 });
  }
  const state = crypto.randomUUID();
  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", `${url.origin}/callback`);
  authUrl.searchParams.set("scope", "repo,user");
  authUrl.searchParams.set("state", state);
  return Response.redirect(authUrl.toString(), 302);
}
__name(handleAuth, "handleAuth");
async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code) {
    return new Response("Authorization code missing", { status: 400 });
  }
  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code
      })
    });
    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        "Authorization": `token ${tokenData.access_token}`,
        "User-Agent": "Decap-CMS-OAuth-Worker"
      }
    });
    const userData = await userResponse.json();
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
        <div class="success">\u2705 Authorization Successful!</div>
        <div class="user-info">
            Welcome, <strong>${userData.name || userData.login}</strong>
        </div>
        <p>You can now close this window and return to the CMS.</p>
    </div>
    
    <script>
        // Post message to parent window (for Decap CMS)
        if (window.opener) {
            window.opener.postMessage({
                type: 'authorization_success',
                token: '${tokenData.access_token}',
                provider: 'github'
            }, '*');
            window.close();
        }
    <\/script>
</body>
</html>`;
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("OAuth error:", error);
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
        <div class="error">\u274C Authorization Failed</div>
        <p>Error: ${error.message}</p>
        <p>Please try again or contact support.</p>
    </div>
</body>
</html>`;
    return new Response(errorHtml, {
      status: 500,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
__name(handleCallback, "handleCallback");
export {
  cloudflare_worker_centerstreetit_default as default
};
//# sourceMappingURL=cloudflare-worker-centerstreetit.js.map
