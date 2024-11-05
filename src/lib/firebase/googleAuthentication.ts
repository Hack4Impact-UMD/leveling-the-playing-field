import { signInWithRedirect, getRedirectResult, User } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";


const signInWithGoogleRedirect = () => {
    return signInWithRedirect(auth, provider);
};

const getGoogleRedirectResult = async () => {
    try {
        const result = await getRedirectResult(auth);
        return result;
    } catch (error) {
        console.error("Error getting redirect result:", error);
        throw error;
    }
};

export { auth, signInWithGoogleRedirect, getGoogleRedirectResult }