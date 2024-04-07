/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconJubao = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M960.2 839.8L547 124.1c-7.1-12.4-20.4-20-34.6-20s-27.5 7.6-34.6 20L64.5 839.8c-7.1 12.4-7.1 27.6 0 40 7.1 12.4 20.4 20 34.6 20h826.4c14.3 0 27.5-7.6 34.6-20 7.2-12.4 7.2-27.6 0.1-40z m-791.8-20l343.9-595.7 343.9 595.7H168.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M473 388.6v235.5c0 22.1 17.9 40 40 40s40-17.9 40-40V388.6c0-22.1-17.9-40-40-40s-40 17.9-40 40zM465.031 731.655a47.2 47.2 0 1 0 93.182-15.114 47.2 47.2 0 1 0-93.182 15.114z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IconJubao.defaultProps = {
  size: 18,
};

export default IconJubao;
