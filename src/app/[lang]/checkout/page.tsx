import { Locale } from "@/lib/i18n/dictionaries";
import CheckoutPage from "./CheckoutPage"

interface Params {
    lang: Locale
}

export default function CheckoutPageWrapper({ params }: { params: Params }) {
    return <CheckoutPage lang={params.lang} />;
}