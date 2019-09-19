import { Platform, Dimensions } from 'react-native';

export const isiOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

// apple.com 17.0.0.0/8
export const appleIPHead = '17';

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

export const removeiOSSensitives = (items: any) =>
  items && items.filter((item: any) => !(isiOS && item.ios));
