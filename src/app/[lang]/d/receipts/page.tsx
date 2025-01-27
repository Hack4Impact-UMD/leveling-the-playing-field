import { Locale } from "@/lib/i18n/dictionaries";
import ReceiptsPage from "./ReceiptsPage";

interface ReceiptsPageParams {
  lang: Locale;
}

export default function ReceiptsPageWrapper({ params }: { params: ReceiptsPageParams }) {
  return <ReceiptsPage {...params}/>
}