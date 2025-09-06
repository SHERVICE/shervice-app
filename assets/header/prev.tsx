import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const PrevIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <Svg width="9" height="18" fill="none" viewBox="0 0 9 18">
    <Path
      fill={props.color || '#13171B'}
      fillRule="evenodd"
      d="M8.53.55a.75.75 0 0 1 0 1.06L2.01 8.13a1.236 1.236 0 0 0 0 1.74l6.52 6.52a.75.75 0 0 1-1.06 1.06L.95 10.93a2.736 2.736 0 0 1 0-3.86L7.47.55a.75.75 0 0 1 1.06 0"
      clipRule="evenodd"
    ></Path>
  </Svg>
);

export default PrevIcon;
