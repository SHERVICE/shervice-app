import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const FilterIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
      d="M22 6.5h-6M6 6.5H2M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M22 17.5h-4M8 17.5H2M14 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
    ></Path>
  </Svg>
);

export default React.memo(FilterIcon);
