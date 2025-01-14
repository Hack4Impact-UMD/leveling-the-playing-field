"use client";
import { onAuthStateChanged, User, IdTokenResult } from "@firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebaseConfig";
import Loading from "../Loading";

interface AuthContextType {
  user: User | null;
  token: IdTokenResult | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<IdTokenResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
      setLoading(true);
      if (newUser) {
        let newToken = await newUser.getIdTokenResult();
        if (!newToken.claims.salesforceIds) {
          const res = await fetch(`/api/auth`, { method: "POST", body: JSON.stringify({ idToken: newToken.token }) });
          if (!res.ok) {
            console.error(await res.json());
            setUser(null);
            setToken(null);
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

  if (loading) {
    return <Loading />
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
