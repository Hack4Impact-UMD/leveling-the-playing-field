import Navbar from "@/components/Navbar";
import RequireAuth from "@/components/auth/RequireAuth";
import { Role } from "@/types/types";

export default function NavbarPagesLayout({
  children,
}: Readonly<{ children: JSX.Element }>) {
  return (
    <RequireAuth allowedRoles={[Role.USER]}>
      <div className="flex flex-col h-screen">
        <div className="overflow-y-scroll">{children}</div>
        <Navbar />
      </div>
    </RequireAuth>
  );
}
