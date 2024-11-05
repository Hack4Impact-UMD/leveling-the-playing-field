'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { signInWithGoogleRedirect, getGoogleRedirectResult } from '@/lib/firebase/googleAuthentication';
import { auth } from '@/lib/firebase/firebaseConfig';

const LoginPage = () => {
    const [user, setUser] = useState<User | null>(null);

    const handleGoogleSignIn = async () => {
        await signInWithGoogleRedirect();
    };

    useEffect(() => {
        const checkRedirectResult = async () => {
            console.log("Checking for Google Redirect Result...");
            try {
                const result = await getGoogleRedirectResult();
                console.log("Redirect Result:", result);
                if (result) {
                    setUser(result.user);
                }
            } catch (error) {
                console.error("Error with redirect result:", error);
            }
        };

        checkRedirectResult();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth State Changed. Current User:", currentUser);
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.displayName}!</p>
                    <p>Email: {user.email}</p>
                    <img src={user.photoURL || ''} alt="User profile" />
                </div>
            ) : (
                <button className="text-black" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>
            )}
        </div>
    );
};

export default LoginPage;
