"use client";
import { onAuthStateChanged, User, IdTokenResult } from "@firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebaseConfig";
import Loading from "../Loading";
import Error from "../Error";

export interface AuthContextType {
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
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
      setLoading(true);
      try {
        if (newUser) {
          let newToken = await newUser.getIdTokenResult();
          if (!newToken.claims.role) {
            const res = await fetch(`/api/auth?idToken=${newToken.token}`, {
              method: "POST",
            });
            // for resolved but rejected requests
            if (!res.ok) {
              console.error(await res.json());
              setUser(null);
              setToken(null);
              setError(res.statusText);
              setErrorCode(res.status);
              console.log(res.statusText);
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
      // for requests that don't resolve
      } catch (err) {
        setError("Unexpected error during authentication.");
        setErrorCode(500);
        setUser(null);
        setToken(null);
        auth.signOut();
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (error && errorCode) {
    return <Error message={error} code={errorCode} />
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
