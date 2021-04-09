import { DateTime } from '#types';

export default interface Place extends DateTime {
  id: number;
  project_id: number;
  project: string;
  street_id: number;
  street: string;
  name: string;
  flat_no: string;
  house_no: string;
  note: string;
}
