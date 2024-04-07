/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconGuanyuO = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 640v-170.666667h-42.666667v-42.666666h85.333334v213.333333h42.666666v42.666667h-128v-42.666667h42.666667z m21.333333 256C332.8 896 170.666667 733.866667 170.666667 533.333333S332.8 170.666667 533.333333 170.666667 896 332.8 896 533.333333 733.866667 896 533.333333 896z m0-42.666667c174.933333 0 320-145.066667 320-320S708.266667 213.333333 533.333333 213.333333 213.333333 358.4 213.333333 533.333333 358.4 853.333333 533.333333 853.333333zM554.666667 341.333333v42.666667h-42.666667V341.333333h42.666667z"
        fill={getIconColor(color, 0, '#444444')}
      />
    </svg>
  );
};

IconGuanyuO.defaultProps = {
  size: 18,
};

export default IconGuanyuO;
