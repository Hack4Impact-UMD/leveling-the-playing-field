import { Locale } from "@/lib/i18n/dictionaries";
import SearchPage from "./SearchPage"

interface SearchPageParams {
    lang: Locale;
}

export default function SearchPageWrapper({ params }: { params: SearchPageParams }) {
    return (<SearchPage {...params}/>)
}