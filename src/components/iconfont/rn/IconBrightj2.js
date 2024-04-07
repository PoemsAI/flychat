/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconBrightj2 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512.1 801.5c-158.1 0-289.8-131.7-289.8-289.8S354 221.8 512.1 221.8s289.8 131.7 289.8 289.8-131.7 289.9-289.8 289.9z m0-52.7c131.7 0 237.1-105.4 237.1-237.1S643.9 274.5 512.1 274.5 275 379.9 275 511.7s105.4 237.1 237.1 237.1zM485.8 63.7h52.7v105.4h-52.7V63.7z m0 790.5h52.7v105.4h-52.7V854.2zM960 485.3V538H854.6v-52.7H960z m-790.4 0V538H64.2v-52.7h105.4z m642.9-310.9l36.9 36.9-73.8 73.8-36.9-36.9 73.8-73.8zM253.9 733l36.9 36.9-73.8 73.7-36.9-36.9 73.8-73.7z m595.5 79l-36.9 36.9-73.8-73.8 36.9-36.9 73.8 73.8zM290.8 253.4l-36.9 36.9-79-79 36.9-36.9 79 79z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBrightj2.defaultProps = {
  size: 18,
};

IconBrightj2 = React.memo ? React.memo(IconBrightj2) : IconBrightj2;

export default IconBrightj2;
