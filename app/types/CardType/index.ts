import { DateTime } from '#types';

export default interface CardType extends DateTime {
  id: number;
  name: string;
  note: string;
}
