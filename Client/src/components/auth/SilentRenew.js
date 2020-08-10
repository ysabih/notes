import * as React from "react";
import LoadingSpinner from '../LoadingSpinner'

import { AuthConsumer } from "../../providers/authProvider";

export const SilentRenew = () => (
    <AuthConsumer>
        {({ renewTokenAsync }) => {
            renewTokenAsync();
            return <LoadingSpinner/>;
        }}
    </AuthConsumer>
);