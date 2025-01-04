"use client"
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import { Locale, getDict } from "@/lib/i18n/dictionaries";
import Loading from "@/components/Loading";
import { Opportunity, OpportunityLineItem } from "@/types/types";
import ReceiptModal from "./ReceiptModal";

const ACCOUNT_ID = "001U800000FYoL8IAL"; //temporary

interface ReceiptsPageProps {
  lang: Locale;
}

export default function ReceiptsPage(props: ReceiptsPageProps) {
  const { lang } = props;
  const [dict, setDict] = useState<{ [key: string]: any }>({});
  const [receipts, setReceipts] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDict = async () => {
      const dictionary = await getDict(lang);
      setDict(dictionary);
    };

    const fetchReceipts = async () => {
      try {
        const response = await fetch(`/api/opportunities?accountId=${ACCOUNT_ID}&stage=Posted`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch opportunities');
        }
        const data = await response.json();
        setReceipts(data);
      } catch (err) {
        setError((err as Error).message);
        console.error('Error fetching receipts:', err);
      }
    };

    Promise.all([fetchDict(), fetchReceipts()]).then(() => setLoading(false))
  }, []);

  if (loading) return <Loading />;
  if (error) return (
    <div className="flex justify-center items-center h-screen text-2xl font-bree-serif text-red-700">
      Error: {error}
    </div>
  );

  const sortedReceipts = receipts.sort((a, b) => new Date(b.CloseDate).getTime() - new Date(a.CloseDate).getTime());

  const getTotalItems = (receipt: Opportunity) => {
    let totalItems = 0;
    receipt.LineItems?.forEach((lineItem: OpportunityLineItem) => {
      totalItems += lineItem.Quantity;
    })
    return totalItems;
  }

  const aggregateLineItems = (receipt: Opportunity) => {
    const productsGroupedByFamily: Record<string, OpportunityLineItem[]> = {};
    receipt.LineItems?.forEach((lineItem: OpportunityLineItem) => {
      const family = lineItem.PricebookEntry.Product2.Family;
      if (!productsGroupedByFamily[family]) {
        productsGroupedByFamily[family] = [lineItem];
      } else { 
        productsGroupedByFamily[family].push(lineItem);
      }
    });
    return {
      ...receipt,
      LineItems: undefined,
      productsGroupedByFamily
    }
  }

  return (
    <div className="flex flex-col items-center container mx-auto my-6 font-cabin-condensed">
      <h2 className="text-black text-3xl md:text-3xl font-bree-serif">
        {dict.receiptsPage.title.text}
      </h2>
      <div className="mt-8 md:w-3/5 w-[90%]">
        {sortedReceipts.map((receipt, index) => (
          <Dialog key={index}>
            <div className="bg-teal-light border-teal border-2 rounded-2xl shadow-lg mt-4">
              <div className="px-8 py-2 w-full text-left text-white">
                <div className="text-sm md:text-base">
                  <span className="font-bold mr-1">
                    {dict.receiptsPage.orderDetails.warehouse.text}
                  </span>
                  <span>{receipt.Market__c}</span>
                </div>
                <div className="text-sm md:text-base">
                  <span className="font-bold mr-1">
                    {dict.receiptsPage.orderDetails.date.text}
                  </span>
                  <span>{new Date(receipt.CloseDate).toLocaleDateString()}</span>
                </div>
                <div className="text-sm md:text-base">
                  <span className="font-bold mr-1">
                    {dict.receiptsPage.orderDetails.contact.text}
                  </span>
                  <span>{receipt.Primary_Contact__c}</span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base">
                  <div>
                    <span className="font-bold mr-1">
                      {dict.receiptsPage.orderDetails.total.text}
                    </span>
                    <span>{getTotalItems(receipt)}</span>
                  </div>
                  <DialogTrigger className="text-white underline cursor-pointer hover:opacity-80 text-sm md:text-base">
                    {dict.receiptsPage.viewButton.text}
                  </DialogTrigger>
                </div>
              </div>
            </div>
            <ReceiptModal receipt={aggregateLineItems(receipt)} totalItems={getTotalItems(receipt)} dict={dict!} />
          </Dialog>
        ))}
      </div>
    </div>
  );
}
