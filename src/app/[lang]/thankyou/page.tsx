// page.tsx
import { Locale } from "@/lib/i18n/dictionaries";
import ThankYouPage from "./ThankYouPage";
import RequireAuth from "@/components/auth/RequireAuth";
import { Role } from "@/types/types";

interface ThankYouPageParams {
  lang: Locale;
}

export default function ThankYouPageWrapper({
  params,
}: {
  params: ThankYouPageParams;
}) {
  return (
    <RequireAuth allowedRoles={[Role.USER]}>
      <ThankYouPage {...params} />
    </RequireAuth>
  );
}
