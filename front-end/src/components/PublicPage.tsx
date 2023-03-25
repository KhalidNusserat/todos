import { PropsWithChildren } from 'react';
import { Navigate } from "react-router-dom";
import Authentication from '../api/authentication';

const PublicPage = (props: PropsWithChildren<{}>): JSX.Element => {
    if (Authentication.getUsername() === null) {
        return props.children as JSX.Element;
    } else {
        return <Navigate to='/'/>;
    }
};

export default PublicPage;