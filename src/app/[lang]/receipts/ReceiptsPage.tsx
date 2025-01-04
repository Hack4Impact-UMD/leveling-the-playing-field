"use client"
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/Dialog"
import { Locale, getDict } from "@/lib/i18n/dictionaries";
import Loading from "@/components/Loading";

const ACCOUNT_ID = "001U800000FYoL8IAL"; //temporary

interface ReceiptsPageDict {
  receiptsPage: {
    title: { text: string };
    viewButton: { text: string };
    orderDetails: {
      title: { text: string };
      warehouse: { text: string };
      date: { text: string };
      time: { text: string };
      contact: { text: string };
      total: { text: string };
      orderInfo: {
        items: { text: string };
        quantity: { text: string };
      };
    };
  };
}

interface Item {
  name: string;
  quantity: number;
}

interface SportItems {
  sport: string;
  items: Item[];
}

interface Receipt {
  market: string;
  dateOfOrder: string;
  time: string;
  pointOfContact: string;
  itemsCheckedOut: number;
  itemList: SportItems[];
}

interface ReceiptsPageProps {
  lang: Locale;
}

export default function ReceiptsPage(props: ReceiptsPageProps) {
  const { lang } = props;
  const [dict, setDict] = useState<ReceiptsPageDict | null>(null);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDict = async () => {
      const dictionary = await getDict(lang);
      setDict(dictionary);
    };
    fetchDict();
  }, []);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch(`/api/opportunity?accountId=${ACCOUNT_ID}&status=Posted`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch opportunities');
        }
        const data = await response.json();
        
        // Validate that records exist
        if (!data.records || !Array.isArray(data.records)) {
          throw new Error('Invalid response format');
        }
        
        setReceipts(data.records);
      } catch (err) {
        setError((err as Error).message);
        console.error('Error fetching receipts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  if (loading) return <Loading />;
  if (error) return (
    <div className="flex justify-center items-center h-screen text-2xl font-bree-serif text-red-700">
      Error: {error}
    </div>
  );

  const sortedReceipts = receipts.sort((a, b) => new Date(b.dateOfOrder).getTime() - new Date(a.dateOfOrder).getTime());

  return (
    <div className="flex flex-col items-center container mx-auto my-6 font-cabin-condensed">
      <h2 className="text-black text-3xl md:text-3xl font-bree-serif">
        {dict?.receiptsPage?.title?.text ?? "Receipts"}
      </h2>
      <div className="mt-8 md:w-3/5 w-[90%]">
        {sortedReceipts.map((receipt, index) => (
          <Dialog key={index}>
            <div className="bg-teal-light border-teal border-2 rounded-2xl shadow-lg mt-4">
              <div className="px-8 py-2 w-full text-left text-white">
                <div className="text-sm md:text-base">
                  <span className="font-bold mr-1">
                    {dict?.receiptsPage?.orderDetails?.warehouse?.text ?? "Warehouse"}:
                  </span>
                  <span>{receipt.market}</span>
                </div>
                <div className="text-sm md:text-base">
                  <span className="font-bold mr-1">
                    {dict?.receiptsPage?.orderDetails?.date?.text ?? "Date of Purchase"}:
                  </span>
                  <span>{receipt.dateOfOrder}</span>
                </div>
                <div className="text-sm md:text-base">
                  <span className="font-bold mr-1">
                    {dict?.receiptsPage?.orderDetails?.time?.text ?? "Time"}:
                  </span>
                  <span>{receipt.time}</span>
                </div>
                <div className="text-sm md:text-base">
                  <span className="font-bold mr-1">
                    {dict?.receiptsPage?.orderDetails?.contact?.text ?? "Point of Contact"}:
                  </span>
                  <span>{receipt.pointOfContact}</span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base">
                  <div>
                    <span className="font-bold mr-1">
                      {dict?.receiptsPage?.orderDetails?.total?.text ?? "Total Checked Out Items"}:
                    </span>
                    <span>{receipt.itemsCheckedOut}</span>
                  </div>
                  <DialogTrigger className="text-white underline cursor-pointer hover:opacity-80 text-sm md:text-base">
                    {dict?.receiptsPage?.viewButton?.text ?? "View Receipt"}
                  </DialogTrigger>
                </div>
              </div>
            </div>
            <DialogContent className="bg-teal-light text-white border-2 border-teal w-[85%] max-w-[500px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl md:text-3xl font-bree-serif font-normal">
                  {dict?.receiptsPage?.orderDetails?.title?.text ?? "ORDER DETAILS"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2 mb-4 font-cabin-condensed text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="font-bold">
                    {dict?.receiptsPage?.orderDetails?.warehouse?.text ?? "Warehouse"}:
                  </span>
                  <span>{receipt.market}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">
                    {dict?.receiptsPage?.orderDetails?.date?.text ?? "Date of Purchase"}:
                  </span>
                  <span>{receipt.dateOfOrder}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">
                    {dict?.receiptsPage?.orderDetails?.time?.text ?? "Time"}:
                  </span>
                  <span>{receipt.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">
                    {dict?.receiptsPage?.orderDetails?.contact?.text ?? "Point of Contact"}:
                  </span>
                  <span>{receipt.pointOfContact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">
                    {dict?.receiptsPage?.orderDetails?.total?.text ?? "Total Checked Out Items"}:
                  </span>
                  <span>{receipt.itemsCheckedOut}</span>
                </div>
              </div>
              <div className="flex flex-wrap">
                {receipt.itemList.map((sportItem, sportIndex) => (
                  <div key={sportIndex} className="w-full md:w-1/2 px-2 mb-4">
                    <div className="bg-orange-500 text-center text-white rounded-full px-2 py-1 mb-2 w-fit mx-auto">
                      <h3 className="font-bold text-sm">{sportItem.sport}</h3>
                    </div>
                    <div className="border-teal border-2 rounded-lg p-2">
                      <table className="table-auto w-full text-left text-sm md:text-base">
                        <thead>
                          <tr>
                            <th className="py-1 text-center">
                              {dict?.receiptsPage?.orderDetails?.orderInfo?.items?.text ?? "Item"}
                            </th>
                            <th className="py-1 text-center">
                              {dict?.receiptsPage?.orderDetails?.orderInfo?.quantity?.text ?? "Quantity"}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sportItem.items.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              <td className="py-1 text-center">{item.name}</td>
                              <td className="py-1 text-center">{item.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
