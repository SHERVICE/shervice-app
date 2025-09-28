import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const NotView: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <Svg
    width={props?.width ?? '24'}
    height={props?.height ?? '24'}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke={props?.color ?? '#13171B'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m14.53 9.47-5.06 5.06a3.576 3.576 0 1 1 5.06-5.06"
    ></Path>
    <Path
      stroke={props.color ?? '#13171B'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73c-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19.79 1.24 1.71 2.31 2.71 3.17M8.42 19.53c1.14.48 2.35.74 3.58.74 3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-.33-.52-.69-1.01-1.06-1.47"
    ></Path>
    <Path
      stroke={props.color ?? '#13171B'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M15.51 12.7a3.565 3.565 0 0 1-2.82 2.82M9.47 14.53 2 22M22 2l-7.47 7.47"
    ></Path>
  </Svg>
);

export default NotView;
