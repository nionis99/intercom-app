import {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

export const isReadyRef: React.MutableRefObject<boolean | null> = React.createRef();

export const getCurrentRoute = () => navigationRef?.current?.getCurrentRoute() || null;

// export const navigate = (name: string, params: object) =>
//   navigationRef.current?.navigate(name, params);
