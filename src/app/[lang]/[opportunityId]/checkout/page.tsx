import { Locale } from "@/lib/i18n/dictionaries";
import CheckoutPage from "./CheckoutPage";
import RequireAuth from "@/components/auth/RequireAuth";
import { Role } from "@/types/types";

interface Params {
  lang: Locale;
  opportunityId: string;
}

export default function CheckoutPageWrapper({ params }: { params: Params }) {
  return (
    <RequireAuth allowedRoles={[Role.USER]}>
      <CheckoutPage lang={params.lang} opportunityId={params.opportunityId} />
    </RequireAuth>
  );
}
