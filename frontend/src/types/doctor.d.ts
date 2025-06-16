import { Address } from "./user";

export interface Doctor {
    _id: string;
    name: string;
    image: string;
    speciality: string;
    degree: string;
    experience: string;
    available?: boolean;
    about: string;
    fees: number;
    address: Address;
    isBlocked: boolean; // Ensure this property exists
    slots_booked?: {
    [date: string]: string[]; 
  };
  }

