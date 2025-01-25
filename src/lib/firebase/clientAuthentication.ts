import { getRedirectResult, signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";

export async function signInWithGooglePopup() {
    return signInWithPopup(auth, provider);
};

export async function getGoogleRedirectResult() {
    try {
        const result = await getRedirectResult(auth);
        return result;
    } catch (error) {
        console.error("Error getting redirect result:", error);
        throw error;
    }
};

export async function signOut() {
    await auth.signOut();
}