export interface Address {
    line1: string;
    line2: string;
    city?: string;
    state?: string;
    pincode?: string;
  }
  
  export interface userData {
    _id: string;
    name: string;
    email: string;
    image: string;
    address: Address;
    gender: string;
    dob: string;
    phone: string;
    isBlocked: boolean;
  }