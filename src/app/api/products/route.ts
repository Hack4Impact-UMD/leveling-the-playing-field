import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types/types";
import { executeSOQLQuery } from "@/lib/salesforce/database/soqlQuery";
import { APIResponse, isError } from "@/types/apiTypes";

interface QueryResponse<T> {
    totalSize: number;
    done: boolean;
    records: Array<T>;
}

interface PricebookEntry {
    Id: string;
    Name: string;
    Product2Id: string;
    Product2: Product2;
}

interface Product2 {
    Family: string;
}

export async function GET(req: NextRequest) {
    const query = `
        SELECT Id, Name, product2id, Product2.Family
        FROM PricebookEntry
        WHERE Pricebook2Id = '01si0000002Ip3WAAS' AND IsActive = false
        ORDER BY Product2.Family, Name
    `;
    try {
        const response = await executeSOQLQuery(query);
        console.log('response', response);
        if (isError(response)) {
            return NextResponse.json(response.error, { status: response.status });
        }
        console.log(response.data)
        const records = response.data.records;
        const groupedByFamily = records.reduce((acc, product) => {
            const family = product.Product2.Family || 'Uncategorized';
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
        return NextResponse.json(groupedByFamily, { status: 200 });
    } catch (error) {
        console.error((error as Error).message);
        return NextResponse.json({ status: 500 });
    }
}