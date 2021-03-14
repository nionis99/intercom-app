import { MembersStackParamList } from '#navigation/AuthorizedStack/MembersStack';

export type SelectContactsParams = {
  searchValue: string;
  goBackRoute: CallBackRouteType;
};

export type CallBackRouteType = keyof MembersStackParamList;
