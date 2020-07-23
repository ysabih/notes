const oidcConfiguration = {
    client_id: 'notes-spa-client',
    redirect_uri: 'http://localhost:3000/authentication/callback',
    response_type: 'code',
    post_logout_redirect_uri: 'http://localhost:3000/',
    scope: 'openid profile',
    authority: 'http://localhost:8080/auth/realms/notes-app',
    silent_redirect_uri: 'http://localhost:3000/authentication/silent_callback',
    automaticSilentRenew: false,
    loadUserInfo: false,
  };
  
  
  export default oidcConfiguration;