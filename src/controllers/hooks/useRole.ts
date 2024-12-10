/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectSubscriptionByDocumentId } from "../slices/subscriptionsSlice";
import { Role } from "delib-npm";
import { selectUser } from "../slices/userSlice";

export function useRole():Role {
    try{
    const { statementId } = useParams();
    if(!statementId) throw new Error("statementId is required");
    const user = useSelector(selectUser);
    const userId = user?.uid;
    if (!userId) throw new Error("userId is required");
    const role: Role | undefined = useSelector(selectSubscriptionByDocumentId(statementId, userId))?.role; 
    
    return role?role:Role.unsubscribed;

    }catch(e){
        console.error(e);
        return Role.unsubscribed;
    }
}