const appBaseUrl = process.env.REACT_APP_HOME_URL;

const oidcConfiguration = {
    client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
    redirect_uri: `${appBaseUrl}/signin-callback`,
    response_type: 'code',
    post_logout_redirect_uri: `${appBaseUrl}/logout-callback`,
    scope: 'openid profile',
    authority: process.env.REACT_APP_OIDC_AUTHORITY,
    automaticSilentRenew: true,
    silent_redirect_uri: `${appBaseUrl}/silent-renew-callback`,
    loadUserInfo: true,
    metadata: {
        authorization_endpoint: `${process.env.REACT_APP_OIDC_AUTHORITY}/protocol/openid-connect/auth`,
        token_endpoint: `${process.env.REACT_APP_OIDC_AUTHORITY}/protocol/openid-connect/token`,
        issuer: process.env.REACT_APP_OIDC_AUTHORITY,
        userinfo_endpoint: `${process.env.REACT_APP_OIDC_AUTHORITY}/protocol/openid-connect/userinfo`,
        end_session_endpoint: `${process.env.REACT_APP_OIDC_AUTHORITY}/protocol/openid-connect/logout`,
        jwks_uri: `${process.env.REACT_APP_OIDC_AUTHORITY}/protocol/openid-connect/certs`,
    }
  };

const registration_auth_endpoint = `${process.env.REACT_APP_OIDC_AUTHORITY}/protocol/openid-connect/registrations`;
const USER_PROFILE_URL = `${oidcConfiguration.authority}/account?referrer=${oidcConfiguration.client_id}`;

let registrationOidcConfiguration = JSON.parse(JSON.stringify(oidcConfiguration));
registrationOidcConfiguration.metadata.authorization_endpoint = registration_auth_endpoint;


export {USER_PROFILE_URL, registrationOidcConfiguration};
export default oidcConfiguration