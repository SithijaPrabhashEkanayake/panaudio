import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('panAdminToken');
    
    // Check if the user is authenticated
    if (!token || token !== 'pan-secure-session-token-98f6d') {
        // Redirect them to the /login page, but save the current location they were trying to go to
        return <Navigate to="/pan-sys-portal/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
