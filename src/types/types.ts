interface Account {
  id: string;
  recordType: "Beneficiary";
  name: string;
  phoneNumber: string;
  email: string;
  billingAddress: Address;
  market: Market
}

interface Contact {
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

interface Opportunity {
  id: string;
  name: string;
  closeDate: Date;
  stage: Stage;
  giftType: GiftType;
  market: Market;
  primaryContactId: string;
}

type Stage = "Site Visit/Call" | "Posted";
type GiftType = "School" | "Youth Program" | "Youth League" | "Partnership" | "Other" | "None"; 

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;
}

enum Market {
  GREATER_WASHINGTON = "Greater Washington",
  BALTIMORE = "Baltimore",
  WESTERN_NEW_YORK = "Western New York",
  PHILADELPHIA = "Philadelphia",
  OHIO = "Ohio"
}