import { APIResponse, isError } from "@/types/apiTypes";
import { Product } from "@/types/types";
import { executeSOQLQuery } from "./soqlQuery";

export async function getAllProducts(): Promise<APIResponse<Product[]>> {
  try {
    const response: APIResponse<Product[]> = await executeSOQLQuery(`
        SELECT Id, Name, product2id, Product2.Family
        FROM PricebookEntry
        WHERE Pricebook2Id = '01si0000002Ip3WAAS' AND IsActive = false
        ORDER BY Product2.Family, Name
    `);
    if (isError(response)) { return response; }
    const records = response.data.records;
    const groupedByFamily = records.reduce((acc, product) => {
      const family = product.Product2.Family || "Uncategorized";
      if (!acc[family]) {
        acc[family] = [];
      }
      acc[family].push({
        id: product.Id,
        name: product.Name,
        category: family,
      });
      return acc;
    }, {} as Record<string, Product[]>);

  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500
    }
  }
}