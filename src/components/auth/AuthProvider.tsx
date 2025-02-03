"use client";
import { onAuthStateChanged, User, IdTokenResult } from "@firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebaseConfig";
import Loading from "../Loading";
import { AuthContextType } from "@/types/types";

const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<IdTokenResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
      setLoading(true);
      if (newUser) {
        let newToken = await newUser.getIdTokenResult();
        if (!newToken.claims.role) {
          const res = await fetch(`/api/auth?idToken=${newToken.token}`, {
            method: "POST",
          });
          if (!res.ok) {
            console.error(await res.json());
            setUser(null);
            setToken(null);
            setError(
              "We were unable to log you in. Please ensure you've been added to your organization's contacts list and try again later."
            );
            auth.signOut();
            return;
          }
          newToken = await newUser.getIdTokenResult(true); // Force refresh token since claims have changed
        }
        setUser(newUser);
        setToken(newToken);
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
