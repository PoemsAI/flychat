/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconEfRedianGongju = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M389.12 855.04c33.28 10.24 43.52-20.48 30.72-30.72-43.52-30.72-66.56-84.48-48.64-135.68 15.36-56.32 61.44-76.8 61.44-161.28 0 0 56.32 40.96 43.52 104.96 56.32-64 30.72-145.92 20.48-184.32 140.8 74.24 261.12 238.08 120.32 376.32-15.36 12.8 0 38.4 25.6 30.72 381.44-217.6 94.72-542.72 43.52-581.12 15.36 38.4 20.48 99.84-12.8 130.56C614.4 186.88 473.6 143.36 473.6 143.36 486.4 253.44 409.6 376.32 332.8 468.48c-2.56-46.08-5.12-76.8-28.16-117.76-5.12 79.36-69.12 145.92-84.48 227.84-20.48 110.08 17.92 189.44 168.96 276.48z m0 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconEfRedianGongju.defaultProps = {
  size: 18,
};

IconEfRedianGongju = React.memo ? React.memo(IconEfRedianGongju) : IconEfRedianGongju;

export default IconEfRedianGongju;
