export type CreditCard = {
  id: string;
  brand: "visa" | "mastercard" | "amex";
  number: string;
  holder: string;
  expiry: string;
  bgColor: string;
};

export const CARDS: CreditCard[] = [
  {
    id: "1",
    brand: "visa",
    number: "4242 4242 4242 4242",
    holder: "JOHN DOE",
    expiry: "12/27",
    bgColor: "#266678",
  },
  {
    id: "2",
    brand: "mastercard",
    number: "5555 5555 5555 4444",
    holder: "JANE SMITH",
    expiry: "08/26",
    bgColor: "#cb7c7a",
  },
  {
    id: "3",
    brand: "amex",
    number: "3782 822463 10005",
    holder: "ALEX JOHNSON",
    expiry: "03/28",
    bgColor: "#36a18b",
  },
  {
    id: "4",
    brand: "visa",
    number: "4012 8888 8888 1881",
    holder: "EMILY BROWN",
    expiry: "11/29",
    bgColor: "#747474",
  },
  {
    id: "5",
    brand: "mastercard",
    number: "5105 1051 0510 5100",
    holder: "MICHAEL LEE",
    expiry: "06/25",
    bgColor: "#cda35f",
  }
];
