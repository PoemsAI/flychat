/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconTianjia = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M510.125 967.584c-250.936 0-454.36-203.464-454.36-454.431S259.19 58.736 510.127 58.736c250.937 0 454.36 203.448 454.36 454.417s-203.423 454.431-454.36 454.431z m0-852.05c-219.57 0-397.562 178.02-397.562 397.619s177.991 397.619 397.562 397.619 397.563-178.02 397.563-397.62-177.992-397.617-397.562-397.617zM680.51 541.56H538.525v142.007c0 15.678-12.715 28.396-28.398 28.396s-28.395-12.719-28.395-28.395V541.559h-141.99c-15.684 0-28.398-12.718-28.398-28.406 0-15.679 12.717-28.397 28.399-28.397h141.989V342.744c0-15.676 12.714-28.389 28.395-28.389 15.686 0 28.4 12.71 28.4 28.39v142.012h141.982c15.687 0 28.4 12.717 28.4 28.397 0 15.69-12.713 28.405-28.4 28.405z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconTianjia.defaultProps = {
  size: 18,
};

IconTianjia = React.memo ? React.memo(IconTianjia) : IconTianjia;

export default IconTianjia;
