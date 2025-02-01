import Navbar from "@/components/Navbar";
import RequireAuth from "@/components/auth/RequireAuth";
import { Role } from "@/types/types";

export default function NavbarPagesLayout({
  children,
}: Readonly<{ children: JSX.Element }>) {
  return (
    <RequireAuth allowedRoles={[Role.USER]}>
      <>
        {children}
        <Navbar />
      </>
    </RequireAuth>
  );
}
