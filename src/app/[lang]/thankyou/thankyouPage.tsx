'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import LPFLogo from "@/../public/images/lpf-logo.png"
import Loading from '@/components/Loading';
import { Locale, getDict } from '@/lib/i18n/dictionaries';
import Link from 'next/link';

interface ThankYouPageProps {
  lang: Locale;
}

export default function ThankYouPage(props: ThankYouPageProps) {
  const { lang } = props;
  const [dict, setDict] = useState<{ [key: string]: any } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDict = async () => {
      const loadedDict = await getDict(lang);
      setDict(loadedDict);
    }

    setLoading(true);
    loadDict().then(() => setLoading(false));
  }, []);

  if (loading) { return <Loading /> }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <Image src={LPFLogo} width={100} height={100} alt="LPF logo" />
      <br />
      <h1 className="text-6xl font-bold text-black mb-4 font-bree-serif">
        {dict?.thankYouPage.thankYou.text}
      </h1>
      <p className="text-xl text-teal-800 mb-6 font-cabin-condensed">
        {dict?.thankYouPage.successfulCheckout.text}
      </p>
      <Link href={`${lang}/d/receipts`}>
        <button className="bg-teal-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 font-cabin-condensed">
          {dict?.thankYouPage.viewReceipt.text}
        </button>
      </Link>
    </div>
  );
}
