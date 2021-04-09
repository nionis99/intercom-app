import { DateTime } from '#types';

export default interface Member extends DateTime {
  id: number;
  user_id: number;
  user: string;
  flat_id: number;
  address: string;
  street: string;
  name: string;
  email: string;
  phone: string;
  note: string;
  pin: string;
  is_owner: boolean;
  is_active: boolean;
}
