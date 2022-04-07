import React from 'react';
import { useSession } from 'next-auth/react';

const Protected: React.FC<{ children: any }> = ({ children }) => {
    const { status } = useSession({ required: true });
    if(status === 'loading') {
        return null;
    };

    return children;
};
export default Protected;