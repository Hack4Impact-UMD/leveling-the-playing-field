import { Locale } from "@/lib/i18n/dictionaries";
import LoginPage from "./LoginPage";

export default function LoginPageWrapper({ params }: { params: { lang: Locale } }) {
  return <LoginPage lang={params.lang}/>;
}
