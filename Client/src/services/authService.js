import oidcConfiguration from "../utils/oidcConfig";
import { UserManager, WebStorageStateStore, Log } from "oidc-client";

class AuthService {
    userManager;

    constructor() {
        this.userManager = new UserManager({
            ...oidcConfiguration,
            userStore: new WebStorageStateStore({ store: window.sessionStorage }),
        });
        // Logger
        Log.logger = console;
        Log.level = Log.INFO;
    }

    getUserAsync = () => {
        return this.userManager.getUser();
    };

    //Works but I don't want to access storage directly
    isAuthenticated = () => {
        const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${oidcConfiguration.authority}:${oidcConfiguration.client_id}`));
        return (!!oidcStorage && !!oidcStorage.access_token)
    }

    signInRedirectCallbackAsync = async () => {
        let user = await this.userManager.signinRedirectCallback()
        window.history.replaceState({}, window.document.title, window.location.origin + window.location.pathname);
        window.location = user.state || "/";
    }
    
    loginAsync = () => {
        return this.userManager.signinRedirect({state:window.location.href});
    }
    
    renewTokenAsync = () => {
        return this.userManager.signinSilent();
    }
    
    logoutAsync = () => {
        this.userManager.signoutRedirect();
    }

    logoutCallbackAsync = () => {
        this.userManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
            window.location.replace('/');
        });
    }
}


const OidcService = new AuthService();
export default OidcService;