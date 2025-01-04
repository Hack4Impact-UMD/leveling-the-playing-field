import { Opportunity, OpportunityLineItem } from "@/types/types";

interface ReceiptModalProps {
  receipt: Omit<Opportunity, "LineItems"> & { productsGroupedByFamily: Record<string, OpportunityLineItem[]>; }
  dict: { [key: string]: any };
}

export default function ReceiptModal(props: ReceiptModalProps) {
  const { receipt, dict } = props;

  const productFamilies = Object.keys(receipt.productsGroupedByFamily).sort();

  return (
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
                    {dict?.receiptsPage?.orderDetails?.orderInfo?.items?.text ??
                      "Item"}
                  </th>
                  <th className="py-1 text-center">
                    {dict?.receiptsPage?.orderDetails?.orderInfo?.quantity
                      ?.text ?? "Quantity"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {receipt.productsGroupedByFamily[family].map((product, productIndex) => (
                  <tr key={productIndex}>
                    <td className="py-1 text-center">{product.PricebookEntry.Name}</td>
                    <td className="py-1 text-center">{product.Quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}