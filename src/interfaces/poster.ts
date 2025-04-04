export interface Poster {
  poNo: string;
  prNo: string;
  docketAwbNo: string;
  challanNo: string;
  poDate: string;
  dispatchedThrough: string;
  docketAwbDate: string;
  challanDate: string;
  companyName: string;
  companyAddress: string;
  companyContact: string;
  gstin: string;
  state: string;
  code: string;
  customerName: string;
  noOfBoxes: number;
  items: {
    description: string;
    qty: number;
    gstRate: string;
    hsnSac: string;
  }[];
  deliveryContact: {
    person: string;
    phone: string;
    address: string;
    email: string;
    costCenter: string;
    gstNo: string;
  };
}
