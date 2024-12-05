import { signInWithRedirect, getRedirectResult, User, signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";


const signInWithGoogleRedirect = () => {
    return signInWithPopup(auth, provider);
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

export { signInWithGoogleRedirect, getGoogleRedirectResult }