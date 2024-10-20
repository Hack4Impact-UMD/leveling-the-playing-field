"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/Accordion";

interface Item {
  name: string;
  quantity: number;
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
  itemList: Item[];
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
      { name: "Balls", quantity: 5 },
      { name: "Cleats", quantity: 2 },
      { name: "Goals", quantity: 3 },
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
      { name: "Balls", quantity: 5 },
      { name: "Cleats", quantity: 2 },
      { name: "Goals", quantity: 3 },
    ],
  },
];

const sortedReceipts = receipts.sort((a, b) => new Date(b.dateOfOrder).getTime() - new Date(a.dateOfOrder).getTime());

export default function Receipts() {
  return (
    <div className="flex flex-col items-center container mx-auto my-6 font-cabin-condensed">
      <h2 className="text-black text-3xl font-bree-serif">Receipts</h2>
      <Accordion className="mt-8 md:w-3/5" type="single" collapsible>
        {sortedReceipts.map((receipt, index) => (
          <AccordionItem className="bg-teal-light border-teal border-4 rounded-2xl shadow-lg mt-4" key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="px-8 py-2 w-full text-left text-white">
                <div>{receipt.city}, {receipt.state}</div>
                <div>{receipt.dateOfOrder}</div>
                <div>{receipt.startTime} - {receipt.endTime}</div>
                <div>Point of Contact: {receipt.pointOfContact.firstName} {receipt.pointOfContact.lastName}</div>
                <div># Items Checked Out: {receipt.itemsCheckedOut}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-8 bg-teal-light text-white border-t-2">
              <h2 className="font-medium text-lg">Order Details</h2>
              <table className="table-auto w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Item</th>
                    <th className="py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {receipt.itemList.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td className="py-2">{item.name}</td>
                      <td className="py-2">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
