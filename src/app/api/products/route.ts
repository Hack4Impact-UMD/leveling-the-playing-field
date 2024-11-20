import { refreshAccessToken } from "@/lib/salesforce/authorization";
import { Product } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface QueryResponse<T> {
    totalSize: number;
    done: boolean;
    records: Array<T>;
}

interface PricebookEntry {
    Id: string;
    Name: string;
    Product2Id: string;
}

const executeSOQLQuery = async (query: string, access_token: string) => {
    const url = new URL('/services/data/v62.0/query', process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN);
    url.searchParams.set('q', query);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`, // Use your Salesforce OAuth token
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Salesforce API error: ${response.statusText}`);
    }

    return response.json();
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const access_token = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const query = `
        SELECT Id, Name, product2id
        FROM PricebookEntry
        WHERE Pricebook2Id = '01si0000002Ip3WAAS'
    `;

    try {
        const data: QueryResponse<PricebookEntry> = await executeSOQLQuery(query.trim(), access_token);
        const records = data.records;
        const productCategories = await Promise.all(records.map(async (p) => {
            const data: QueryResponse<{ Family: string }> = await executeSOQLQuery(`SELECT Family FROM PRODUCT2 WHERE Id='${p.Product2Id}'`, access_token);
            const family = data.records[0].Family;
            const product: Product = { category: family, id: p.Id, name: p.Name }
            return product;
        }))
        return NextResponse.json(productCategories, { status: 200 });
    } catch (error) {
        console.error((error as Error).message);
        return NextResponse.json({ status: 500 });
    }
}