import { DateTime } from '#types';

export enum UserRoleEnum {
  OWNER = 'owner',
  ADMIN = 'admin',
}

export default interface User extends DateTime {
  id: number;
  login: string;
  password: string;
  role_id: number;
  role: UserRoleEnum;
}
