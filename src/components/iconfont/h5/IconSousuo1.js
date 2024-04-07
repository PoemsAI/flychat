/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconSousuo1 = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M431.616 791.04c-209.408 0-379.904-170.496-379.904-379.904S222.208 31.232 431.616 31.232 811.52 201.728 811.52 411.136 641.024 791.04 431.616 791.04z m0-693.248c-172.544 0-313.344 140.288-313.344 313.344 0 172.544 140.288 313.344 313.344 313.344 172.544 0 313.344-140.288 313.344-313.344 0-172.544-140.8-313.344-313.344-313.344z"
        fill={getIconColor(color, 0, '#707070')}
      />
      <path
        d="M676.864 660.48l278.528 278.528c12.8 12.8 12.8 34.304 0 47.104-12.8 12.8-34.304 12.8-47.104 0L629.76 707.584c-12.8-12.8-12.8-34.304 0-47.104 12.8-12.8 34.304-12.8 47.104 0z"
        fill={getIconColor(color, 1, '#707070')}
      />
    </svg>
  );
};

IconSousuo1.defaultProps = {
  size: 18,
};

export default IconSousuo1;
