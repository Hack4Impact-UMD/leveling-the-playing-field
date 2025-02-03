import { Locale } from "@/lib/i18n/dictionaries";
import AppointmentsPage from "./AppointmentsPage";

interface AppointmentPageWrapperParams {
  lang: Locale;
}

export default function AppointmentsPageWrapper({ params }: { params: AppointmentPageWrapperParams }) {
  return <AppointmentsPage {...params} />;
}