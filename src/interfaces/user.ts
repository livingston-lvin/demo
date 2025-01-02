export interface User {
  id:number;
  firstName?: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobileNo: number;
  role: string;
  password?: string;
  confirmPassword?: string;
  saveDt: string;
}
