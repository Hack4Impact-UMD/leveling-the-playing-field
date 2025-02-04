import LoginPage from "./LoginPage";
import RequireAuth from "@/components/auth/RequireAuth";

export default function LoginPageWrapper() {
  return (
    <RequireAuth allowedRoles={[]} allowUnauthenticated>
      <LoginPage />
    </RequireAuth>
  );
}