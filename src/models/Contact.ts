export interface PhoneNumber {
  number: string;
  type: string;
}
export interface Contact {
  id: string;
  userId: string;
  name: string;
  phone: PhoneNumber[];
  email: string;
  birthday: string | null;
  avatar: string;
}
