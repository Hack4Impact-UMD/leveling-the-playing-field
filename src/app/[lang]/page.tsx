import { Locale } from "@/lib/i18n/dictionaries";
import LoginPage from "./LoginPage";

interface LoginPageParams {
    lang: Locale;
}

export default function LoginPageWrapper({ params }: { params: LoginPageParams }) {
    return <LoginPage {...params}/>;
}