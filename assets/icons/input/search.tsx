import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const SearchIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <Svg
    width={props.width ?? '24'}
    height={props.height ?? '24'}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke={props?.color ?? '#13171B'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19M22 22l-2-2"
    ></Path>
  </Svg>
);

export default React.memo(SearchIcon);
