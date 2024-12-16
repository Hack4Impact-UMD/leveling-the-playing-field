import { getDict } from "@/lib/i18n/dictionaries";
import OrganizationProfile from "./components/OrganizationProfile";

export default async function OrganizationProfileWrapper({ params }: { params: { lang: string } }) {
  const locale = params.lang as 'en' | 'es' | 'fr';
  const dict = await getDict(locale); 

  return (
    <OrganizationProfile dict={dict} />
  );
}