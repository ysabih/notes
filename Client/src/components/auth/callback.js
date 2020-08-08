import * as React from "react";
import LoadingSpinner from '../LoadingSpinner'

import { AuthConsumer } from "../../providers/authProvider";

export const Callback = () => (
    <AuthConsumer>
        {({ signInRedirectCallbackAsync }) => {
            signInRedirectCallbackAsync();
            return <LoadingSpinner/>;
        }}
    </AuthConsumer>
);