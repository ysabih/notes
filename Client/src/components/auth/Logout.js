import * as React from "react";
import LoadingSpinner from '../LoadingSpinner'

import { AuthConsumer } from "../../providers/authProvider";

export const Logout = () => (
    <AuthConsumer>
        {({ logoutAsync }) => {
            logoutAsync();
            return <LoadingSpinner/>;
        }}
    </AuthConsumer>
);