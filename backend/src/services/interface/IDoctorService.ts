export interface IDoctorService {
    loginDoctor(email: string, password: string): Promise<string>;
    toggleAvailability(docId: string): Promise<void>;
    getAllDoctors(): Promise<any[]>;
  }