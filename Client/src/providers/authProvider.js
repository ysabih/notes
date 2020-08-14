import React, { Component } from "react";
import OidcService from "../services/authService";

export const AuthContext = React.createContext({});

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
    render() {
        return <AuthContext.Provider value={OidcService}>{this.props.children}</AuthContext.Provider>;
    }
}
