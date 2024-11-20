"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/Dialog"
import { getDict } from "@/lib/i18n/dictionaries";
import { useEffect, useState } from "react";

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
  city: string;
  state: string;
  dateOfOrder: string;
  startTime: string;
  endTime: string;
  pointOfContact: {
    firstName: string;
    lastName: string;
  };
  itemsCheckedOut: number;
  itemList: SportItems[];
}

const receipts: Receipt[] = [
  {
    city: "New York",
    state: "NY",
    dateOfOrder: "2024-10-15",
    startTime: "12:00 pm",
    endTime: "01:00 pm",
    pointOfContact: {
      firstName: "John",
      lastName: "Doe",
    },
    itemsCheckedOut: 5,
    itemList: [
      {
        sport: "Soccer",
        items: [
          { name: "Balls", quantity: 5 },
          { name: "Cleats", quantity: 2 },
        ],
      },
      {
        sport: "Tennis",
        items: [
          { name: "Rackets", quantity: 3 },
        ],
      },
    ],
  },
  {
    city: "Los Angeles",
    state: "CA",
    dateOfOrder: "2024-10-20",
    startTime: "02:00 pm",
    endTime: "03:00 pm",
    pointOfContact: {
      firstName: "Jane",
      lastName: "Smith",
    },
    itemsCheckedOut: 7,
    itemList: [
      {
        sport: "Basketball",
        items: [
          { name: "Balls", quantity: 5 },
        ],
      },
      {
        sport: "Lacrosse",
        items: [
          { name: "Sticks", quantity: 2 },
          { name: "Goals", quantity: 3 },
        ],
      },
    ],
  },
];

const sortedReceipts = receipts.sort((a, b) => new Date(b.dateOfOrder).getTime() - new Date(a.dateOfOrder).getTime());

export default function ReceiptsPage() {
  const [dict, setDict] = useState<ReceiptsPageDict | null>(null);

  useEffect(() => {
    const fetchDict = async () => {
      const locale = "en"; // Replace with dynamic locale if needed
      const dictionary = await getDict(locale);
      setDict(dictionary);
    };
    fetchDict();
  }, []);

  return (
    <div className="flex flex-col items-center container mx-auto my-6 font-cabin-condensed">
      <h2 className="text-black text-3xl md:text-3xl font-bree-serif">
        {dict?.receiptsPage?.title?.text ?? "Receipts"}
      </h2>
      <div className="mt-8 md:w-3/5 w-[90%]">
        {sortedReceipts.map((receipt, index) => (
          <Dialog key={index}>
            <div className="bg-teal-light border-teal border-4 rounded-2xl shadow-lg mt-4">
              <div className="px-8 py-2 w-full text-left text-white">
                <div className="text-sm md:text-base">{receipt.city}, {receipt.state}</div>
                <div className="text-sm md:text-base">{receipt.dateOfOrder}</div>
                <div className="text-sm md:text-base">{receipt.startTime} - {receipt.endTime}</div>
                <div className="text-sm md:text-base">
                  {dict?.receiptsPage?.orderDetails?.contact?.text ?? "Point of Contact"}: {receipt.pointOfContact.firstName} {receipt.pointOfContact.lastName}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base">
                    {dict?.receiptsPage?.orderDetails?.total?.text ?? "# Items Checked Out"}: {receipt.itemsCheckedOut}
                  </span>
                  <DialogTrigger className="text-white underline cursor-pointer hover:opacity-80 text-xs md:text-sm">
                    {dict?.receiptsPage?.viewButton?.text ?? "View Receipt"}
                  </DialogTrigger>
                </div>
              </div>
            </div>
            <DialogContent className="bg-teal-light text-white border-4 border-teal w-[85%] max-w-[500px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl md:text-3xl font-bree-serif font-normal">
                  {dict?.receiptsPage?.orderDetails?.title?.text ?? "ORDER DETAILS"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2 mb-4 font-cabin-condensed text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="font-bold">
                    {dict?.receiptsPage?.orderDetails?.warehouse?.text ?? "Warehouse Location"}:
                  </span>
                  <span>{receipt.city}, {receipt.state}</span>
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
                  <span>{receipt.startTime} - {receipt.endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">
                    {dict?.receiptsPage?.orderDetails?.contact?.text ?? "Point of Contact"}:
                  </span>
                  <span>{receipt.pointOfContact.firstName} {receipt.pointOfContact.lastName}</span>
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
