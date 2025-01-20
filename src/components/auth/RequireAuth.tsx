'use client';

import { Role } from "@/types/types";
import { useAuth } from "./AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase/firebaseConfig";

interface RequireAuthProps {
  children: JSX.Element;
  allowedRoles: Role[];
  allowUnauthenticated?: boolean;
}

export default function RequireAuth(props: RequireAuthProps) {
  const { children, allowedRoles, allowUnauthenticated = false } = props;
  const { token } = useAuth();
  
  const router = useRouter();

  if (allowedRoles.some((role: Role) => token?.claims.role === role) || (allowUnauthenticated && !token)) {
    return children;
  }

  const locale = usePathname().split('/')[1];
  if (!token) {
    router.push(`/${locale}`);
  } else if (token.claims.role === Role.USER) {
    router.push(`/${locale}/organization-profile`);
  }
  return (
    <div className="flex flex-col items-center w-full text-black">
      <h3>Admin accounts don't have any functionality on this website. Please log into Salesforce directly.</h3>
      <button className="w-1/2 bg-teal rounded-lg" onClick={() => auth.signOut()}>Log Out</button>
    </div>
  );
}