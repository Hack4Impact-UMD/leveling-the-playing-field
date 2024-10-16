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

const exampleReceipt: Receipt = {
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
    { name: "Item 1", quantity: 2 },
    { name: "Item 2", quantity: 1 },
    { name: "Item 3", quantity: 3 },
  ],
};

export default function Receipts() {
  return (
    <div className="flex flex-col items-center container mx-auto my-6 font-cabin-condensed">
      <h2 className="text-black text-3xl font-bree-serif">Receipts</h2>

      <Accordion className="mt-8 bg-teal-light border-teal-800 border-4 rounded-lg shadow-lg w-1/3" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="px-8 py-2 w-full text-left text-white">
              <div>{exampleReceipt.city}, {exampleReceipt.state}</div>
              <div>{exampleReceipt.dateOfOrder}</div>
              <div>{exampleReceipt.startTime} - {exampleReceipt.endTime}</div>
              <div>Point of Contact: {exampleReceipt.pointOfContact.firstName} {exampleReceipt.pointOfContact.lastName}</div>
              <div># Items Checked Out: {exampleReceipt.itemsCheckedOut}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="font-cabin-condensed p-8">
            <h2 className="font-bold text-white text-lg">Order Details</h2>
            <table className="table-auto w-full text-left text-white">
              <thead>
                <tr>
                  <th className="py-2">Item</th>
                  <th className="py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {exampleReceipt.itemList.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
