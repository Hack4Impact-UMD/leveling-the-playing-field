import { IdTokenResult, ParsedToken, User } from "firebase/auth";

export interface Account {
  Id: string;
  Name: string;
  Phone: string;
  Email__c: string;
  BillingStreet: string;
  BillingCity: string;
  BillingState: string;
  BillingCountry: string;
  BillingPostalCode: string;
}

export interface Contact {
  Id?: string;
  Salutation?: string;
  FirstName: string;
  LastName: string;
  Name: string;
  Email: string;
  Phone: string;
  Title?: string;
  AccountId: string;
}

export interface Opportunity {
  Id?: string;
  Name: string;
  CloseDate: string;
  StageName: Stage;
  Gift_Type__c: GiftType;
  Market__c: Market;
  Primary_Contact__c: string;
  AccountId: string;
  LineItems?: OpportunityLineItem[];
}

export interface OpportunityLineItem {
  Id?: string;
  OpportunityId?: string;
  PricebookEntryId: string;
  PricebookEntry?: PricebookEntry;
  Quantity: number;
  UnitPrice?: number;
}

export interface PricebookEntry {
  Id?: string;
  Name: string;
  Product2Id?: string;
  Product2: Product2;
}

interface Product2 {
  Family: string;
}

export interface CheckoutItem {
  PricebookEntryId: string;
  Quantity: number;
}

export type Stage = "Site Visit/Call" | "Posted";
export type GiftType = "School" | "Youth Program" | "Youth League" | "Partnership" | "Other" | "None";

export interface Product {
  id: string;
  name: string;
  category: string;
}

export enum Market {
  GREATER_WASHINGTON = "Greater Washington",
  BALTIMORE = "Baltimore",
  WESTERN_NEW_YORK = "Western New York",
  PHILADELPHIA = "Philadelphia",
  OHIO = "Ohio"
}

export const MARKETS: Market[] = [
  Market.GREATER_WASHINGTON,
  Market.BALTIMORE,
  Market.WESTERN_NEW_YORK,
  Market.PHILADELPHIA,
  Market.OHIO
]

export interface AuthContextType {
  user: User | null;
  token: IdTokenResult | null;
  loading: boolean;
}

export enum Role {
  ADMIN = "admin",
  USER = "user"
}

export interface UserClaims extends ParsedToken {
  role: Role;
  salesforceIds: {
    accountId: string;
    contactId: string | null;
  }
}