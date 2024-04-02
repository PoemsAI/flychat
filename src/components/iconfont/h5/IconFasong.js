/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconFasong = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M0 1024l106.496-474.112 588.8-36.864-588.8-39.936L0 0l1024 512z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconFasong.defaultProps = {
  size: 18,
};

export default IconFasong;
