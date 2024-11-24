export interface Account {
  id: string;
  recordType: "Beneficiary";
  name: string;
  phoneNumber: string;
  email: string;
  billingAddress: Address;
  market: Market
}

export interface Contact {
  id: string;
  name: {
    title?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  phoneNumber: string;
  title?: string;
  accountId: string;
}

export interface Opportunity {
  id: string;
  name: string;
  closeDate: Date;
  stage: Stage;
  giftType: GiftType;
  market: Market;
  primaryContactId: string;
}

export type Stage = "Site Visit/Call" | "Posted";
export type GiftType = "School" | "Youth Program" | "Youth League" | "Partnership" | "Other" | "None"; 

export interface Product {
  id: string;
  name: string;
  category: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;
}

export enum Market {
  GREATER_WASHINGTON = "Greater Washington",
  BALTIMORE = "Baltimore",
  WESTERN_NEW_YORK = "Western New York",
  PHILADELPHIA = "Philadelphia",
  OHIO = "Ohio"
}