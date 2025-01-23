import { NextRequest, NextResponse } from "next/server";
import { PricebookEntry, Product } from "@/types/types";
import { executeSOQLQuery } from "@/lib/salesforce/soqlQuery";
import { APIResponse, isError } from "@/types/apiTypes";
import { isAuthenticated } from "@/lib/firebase/serverAuthentication";

export async function GET(req: NextRequest) {
    try {
        const idToken = req.nextUrl.searchParams.get('idToken');
        if (!(await isAuthenticated(idToken))) {
          return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
        }
        const res: APIResponse<PricebookEntry[]> = await executeSOQLQuery(`SELECT Id, Name, product2id, Product2.Family
                                                                           FROM PricebookEntry
                                                                           WHERE Pricebook2Id = '01si0000002Ip3WAAS' AND IsActive = true
                                                                           ORDER BY Product2.Family, Name`);
        if (isError(res)) { return NextResponse.json(res.error, { status: res.status }); }
        const data = res.data;
        const groupedByFamily = data.reduce((acc, product) => {
            const family = product.Product2.Family || 'Misc';
            if (!acc[family]) {
                acc[family] = [];
            }
            acc[family].push({
                id: product.Id || '',
                name: product.Name,
                category: family,
            });
            return acc;
        }, {} as Record<string, Product[]>);
        return NextResponse.json(groupedByFamily, { status: 200 });
    } catch (error) {
        console.error((error as Error).message);
        return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
    }
}