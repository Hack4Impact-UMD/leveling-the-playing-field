import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Opportunity, OpportunityLineItem } from "@/types/types";

interface ReceiptModalProps {
  receipt: Omit<Opportunity, "LineItems"> & { productsGroupedByFamily: Record<string, OpportunityLineItem[]>; }
  totalItems: number;
  dict: { [key: string]: any };
}

export default function ReceiptModal(props: ReceiptModalProps) {
  const { receipt, totalItems, dict } = props;

  const productFamilies = Object.keys(receipt.productsGroupedByFamily).sort();

  return (
    <DialogContent className="bg-teal-light text-white border-2 border-teal w-[85%] max-w-[500px] max-h-[90vh] rounded-3xl overflow-y-scroll">
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
          <span>{receipt.Market__c}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">
            {dict?.receiptsPage?.orderDetails?.date?.text ?? "Date of Purchase"}
            :
          </span>
          <span>{new Date(receipt.CloseDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">
            {dict?.receiptsPage?.orderDetails?.contact?.text ??
              "Point of Contact"}
            :
          </span>
          <span>{receipt.Primary_Contact__c}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">
            {dict?.receiptsPage?.orderDetails?.total?.text ??
              "Total Checked Out Items"}
            :
          </span>
          <span>{totalItems}</span>
        </div>
      </div>
      <div className="flex flex-wrap">
        {productFamilies.map((family, familyIndex) => (
          <div key={familyIndex} className="w-full md:w-1/2 px-2 mb-4">
            <div className="bg-orange-500 text-center text-white rounded-full px-2 py-1 mb-2 w-fit mx-auto">
              <h3 className="font-bold text-sm">{family}</h3>
            </div>
            <div className="border-teal border-2 rounded-lg p-2">
              <table className="table-auto w-full text-left text-sm md:text-base">
                <thead>
                  <tr>
                    <th className="py-1 text-center">
                      {dict?.receiptsPage?.orderDetails?.orderInfo?.items
                        ?.text ?? "Item"}
                    </th>
                    <th className="py-1 text-center">
                      {dict?.receiptsPage?.orderDetails?.orderInfo?.quantity
                        ?.text ?? "Quantity"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receipt.productsGroupedByFamily[family].map(
                    (product, productIndex) => (
                      <tr key={productIndex}>
                        <td className="py-1 text-center">
                          {product.PricebookEntry.Name}
                        </td>
                        <td className="py-1 text-center">{product.Quantity}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  );
}