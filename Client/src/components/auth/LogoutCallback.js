import * as React from "react";
import LoadingSpinner from '../LoadingSpinner'

import { AuthConsumer } from "../../providers/authProvider";

export const LogoutCallback = () => (
    <AuthConsumer>
        {({ logoutCallbackAsync }) => {
            logoutCallbackAsync();
            return <LoadingSpinner/>;
        }}
    </AuthConsumer>
);