import { MembersStackParamList } from '#navigation/AuthorizedStack/BottomTabs/MembersStack';

export type SelectContactsParams = {
  searchValue: string;
  goBackRoute: CallBackRouteType;
};

export type CallBackRouteType = keyof MembersStackParamList;
