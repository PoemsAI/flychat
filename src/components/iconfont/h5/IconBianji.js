/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconBianji = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M562.5 173.4l113.2 81.4-283 404.3h-0.2l-4.7 2.1L261.2 717l15.4-130.4 0.4-3.5v-1c0.3-0.7 0.6-1.6 0.9-2.2l284.6-406.5m-1.2-61.4c-17.7 0-35.1 7.9-45.2 23.1L227.9 546.8c-5.5 8.2-11 22-11 32.9l-17.3 146.5c0 32.2 27 54.8 55.1 54.8 5.4 0 10.9-0.8 16.2-2.6l141-62.1c11-2.7 22-11 27.4-19.2l288.2-411.7c16.5-24.7 11-57.6-13.7-76.9l-121-87c-9.3-6.4-20.4-9.5-31.5-9.5zM200 852h640v60H200z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconBianji.defaultProps = {
  size: 18,
};

export default IconBianji;
