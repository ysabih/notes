const oidcConfiguration = {
    client_id: 'notes-spa-client',
    redirect_uri: 'http://localhost:3000/signin-callback',
    response_type: 'code',
    post_logout_redirect_uri: 'http://localhost:3000/logout-callback',
    scope: 'openid profile',
    authority: 'http://localhost:8080/auth/realms/notes-app',
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:3000/silent-renew-callback',
    loadUserInfo: true,
  };
  
  
  export default oidcConfiguration;