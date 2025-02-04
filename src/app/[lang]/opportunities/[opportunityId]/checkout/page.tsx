import CheckoutPage from "./CheckoutPage";
import RequireAuth from "@/components/auth/RequireAuth";
import { Role } from "@/types/types";

interface Params {
  opportunityId: string;
}

export default function CheckoutPageWrapper({ params }: { params: Params }) {
  return (
    <RequireAuth allowedRoles={[Role.USER]}>
      <CheckoutPage opportunityId={params.opportunityId} />
    </RequireAuth>
  );
}
