import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const CategoriesIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
      d="M17 10h2q3 0 3-3V5q0-3-3-3h-2q-3 0-3 3v2q0 3 3 3M5 22h2q3 0 3-3v-2q0-3-3-3H5q-3 0-3 3v2q0 3 3 3M6 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8M18 22a4 4 0 1 0 0-8 4 4 0 0 0 0 8"
    ></Path>
  </Svg>
);

export default React.memo(CategoriesIcon);
