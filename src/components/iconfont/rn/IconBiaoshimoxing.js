/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconBiaoshimoxing = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M122.7 152.6l239.4 107.8h299.3l233.5-107.8H122.7zM410 320.2h203.5L511.8 487.9 410 320.2zM691.4 314.3l269.4-125.7L541.7 871V553.7l149.7-239.4zM332.2 314.3l149.7 239.4-6 317.3-413-682.4 269.3 125.7z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBiaoshimoxing.defaultProps = {
  size: 18,
};

IconBiaoshimoxing = React.memo ? React.memo(IconBiaoshimoxing) : IconBiaoshimoxing;

export default IconBiaoshimoxing;
