import { Locale } from "@/lib/i18n/dictionaries";
import LoginPage from "./LoginPage";
import RequireAuth from "@/components/auth/RequireAuth";

interface LoginPageParams {
  lang: Locale;
}

export default function LoginPageWrapper({ params }: { params: LoginPageParams }) {
  return (
    <RequireAuth allowedRoles={[]} allowUnauthenticated>
      <LoginPage {...params} />
    </RequireAuth>
  );
}