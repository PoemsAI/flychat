/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconFasong = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 1024l106.496-474.112 588.8-36.864-588.8-39.936L0 0l1024 512z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFasong.defaultProps = {
  size: 18,
};

IconFasong = React.memo ? React.memo(IconFasong) : IconFasong;

export default IconFasong;
