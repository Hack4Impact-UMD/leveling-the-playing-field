import ThankYouPage from "./ThankYouPage";
import RequireAuth from "@/components/auth/RequireAuth";
import { Role } from "@/types/types";

export default function ThankYouPageWrapper() {
  return (
    <RequireAuth allowedRoles={[Role.USER]}>
      <ThankYouPage />
    </RequireAuth>
  );
}
