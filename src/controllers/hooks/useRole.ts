import { Role } from "delib-npm";
import { createContext, useContext } from "react";

// Create the context with a default value
export const RoleContext = createContext<Role>(Role.unsubscribed);

// Combined hook with role utilities
export const useRole = () => {
    const role = useContext(RoleContext);
    
    if (role === undefined) {
        throw new Error('useRole must be used within a RoleContext.Provider');
    }
    
    return {
        role,
        isAdmin: role === Role.admin,
        isUnsubscribed: role === Role.unsubscribed,
        canComment: role !== Role.unsubscribed,
    };
};