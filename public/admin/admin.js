// Handle admin routing without Next.js interference
if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
  window.location.replace('/admin/index.html');
}
