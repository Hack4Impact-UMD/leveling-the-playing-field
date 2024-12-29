// page.tsx
import { Locale } from '@/lib/i18n/dictionaries';
import ThankYouPage from './ThankYouPage';

interface ThankYouPageParams {
  lang: Locale;
}

export default function ThankYouPageWrapper({ params }: { params: ThankYouPageParams }) {
  return <ThankYouPage {...params}/>;
}
