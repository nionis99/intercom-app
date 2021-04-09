import { DateTime } from '#types';

export default interface Door extends DateTime {
  id: number;
  name: string;
  note: string;
  project_id: number;
  project: string;
  type_id: number;
  type: string;
}
