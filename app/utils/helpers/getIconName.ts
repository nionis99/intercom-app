import { Route } from '@react-navigation/native';

const getIconName = (route: Route<'Profile' | 'Members'>) => {
  let iconName;

  if (route.name === 'Profile') {
    iconName = 'user-circle';
  } else if (route.name === 'Members') {
    iconName = 'users';
  } else {
    iconName = 'hexagon';
  }
  return iconName;
};

export default getIconName;
