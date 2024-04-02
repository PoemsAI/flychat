/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconMofabang = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M870.4 947.2L419.2 496c-6.4-6.4-6.4-19.2 0-25.6l54.4-54.4c6.4-6.4 19.2-6.4 25.6 0L950.4 870.4l3.2 3.2c22.4 22.4 19.2 57.6-3.2 76.8-9.6 9.6-25.6 16-38.4 16-19.2 0-32-6.4-41.6-19.2z m-668.8-195.2c-19.2-64-70.4-115.2-134.4-134.4-3.2-3.2-6.4-6.4-6.4-12.8 0-3.2 3.2-6.4 6.4-9.6 64-19.2 115.2-70.4 134.4-134.4 0-3.2 3.2-6.4 6.4-6.4 6.4-3.2 12.8 0 16 6.4 19.2 64 70.4 115.2 134.4 134.4 3.2 0 6.4 3.2 6.4 6.4 3.2 6.4 0 12.8-6.4 16-64 19.2-115.2 70.4-134.4 134.4-3.2 3.2-6.4 6.4-9.6 6.4-9.6 0-12.8-3.2-12.8-6.4z m137.6-336l-60.8-60.8c-9.6-9.6-9.6-28.8 0-38.4l38.4-38.4c9.6-9.6 28.8-9.6 38.4 0l60.8 60.8c6.4 6.4 6.4 19.2 0 25.6l-54.4 54.4c-3.2 3.2-9.6 6.4-12.8 6.4-3.2-3.2-6.4-3.2-9.6-9.6z m294.4-25.6c-22.4-73.6-80-128-150.4-150.4-3.2 0-6.4-3.2-9.6-9.6-3.2-6.4 3.2-12.8 9.6-16 73.6-22.4 128-80 150.4-150.4 0-3.2 3.2-6.4 9.6-9.6 6.4-3.2 12.8 3.2 16 9.6 22.4 73.6 80 128 150.4 150.4 3.2 3.2 6.4 6.4 6.4 12.8s-3.2 9.6-6.4 12.8c-73.6 22.4-128 80-150.4 150.4 0 6.4-6.4 9.6-12.8 9.6s-12.8-3.2-12.8-9.6z m-460.8-105.6c-3.2 0-6.4-3.2-6.4-6.4-12.8-48-51.2-86.4-99.2-99.2-3.2 0-3.2-3.2-6.4-6.4 0-3.2 0-9.6 6.4-9.6 48-12.8 86.4-51.2 99.2-99.2 0-3.2 3.2-3.2 6.4-6.4 3.2 0 9.6 0 9.6 6.4 12.8 48 51.2 86.4 99.2 99.2 3.2 0 3.2 3.2 6.4 6.4 0 3.2 0 9.6-6.4 9.6-48 12.8-86.4 51.2-99.2 99.2-3.2 3.2-6.4 6.4-9.6 6.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconMofabang.defaultProps = {
  size: 18,
};

export default IconMofabang;