import * as React from 'react';

import { Path, Svg } from 'react-native-svg';

const SvgIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <Svg width="19" height="20" fill="none" viewBox="0 0 19 20">
    <Path
      fill="#4285F4"
      fillRule="evenodd"
      d="M19 10.209q-.002-.978-.167-1.88h-8.657v3.555h4.947a4.23 4.23 0 0 1-1.834 2.774v2.307h2.97c1.738-1.6 2.741-3.957 2.741-6.756"
      clipRule="evenodd"
    ></Path>
    <Path
      fill="#34A853"
      fillRule="evenodd"
      d="M10.176 19.191c2.482 0 4.562-.823 6.083-2.226l-2.97-2.307c-.824.552-1.876.878-3.113.878-2.394 0-4.42-1.617-5.143-3.79h-3.07v2.382a9.19 9.19 0 0 0 8.213 5.063"
      clipRule="evenodd"
    ></Path>
    <Path
      fill="#FBBC05"
      fillRule="evenodd"
      d="M5.033 11.746A5.5 5.5 0 0 1 4.745 10c0-.606.104-1.195.288-1.746V5.872h-3.07A9.2 9.2 0 0 0 .984 10c0 1.483.355 2.887.977 4.128z"
      clipRule="evenodd"
    ></Path>
    <Path
      fill="#EA4335"
      fillRule="evenodd"
      d="M10.176 4.464c1.35 0 2.561.464 3.514 1.375l2.636-2.636C14.734 1.719 12.653.809 10.176.809a9.19 9.19 0 0 0-8.214 5.063l3.07 2.382c.724-2.173 2.75-3.79 5.144-3.79"
      clipRule="evenodd"
    ></Path>
  </Svg>
);

export default React.memo(SvgIcon);
