import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const TermsIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <Path
      stroke={props?.color ?? '#13171B'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
      d="M8 2v3M16 2v3M7 13h8M7 17h5M16 3.5c3.33.18 5 1.45 5 6.15v6.18c0 4.12-1 6.18-6 6.18H9c-5 0-6-2.06-6-6.18V9.65c0-4.7 1.67-5.96 5-6.15z"
    ></Path>
  </Svg>
);

export default React.memo(TermsIcon);
