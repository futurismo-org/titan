import { Text } from 'native-base';
import styled from 'styled-components';

import Hero from 'react-native-hero';

export const StyledHero = styled(Hero)`
  position: absolute;
`;

export const Title = styled(Text)`
  font-size: 32px;
  color: #ffffff;
  font-weight: bold;
`;

export const Description = styled(Text)`
  font-size: 24px;
  color: #ffffff;
`;

export const Info = styled(Text)`
  font-size: 18px;
  color: #ffffff;
`;
