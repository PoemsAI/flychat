/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconShoucang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M513.6 160a1.92 1.92 0 0 0-1.6 0l-92.48 188.16A64 64 0 0 1 368.64 384L161.6 416a1.6 1.6 0 0 0 0 2.88l150.08 146.56a65.6 65.6 0 0 1 18.56 58.24l-35.2 207.04h2.24l184.96-96a67.2 67.2 0 0 1 61.44 0l184.96 96h2.24l-35.2-207.04a64 64 0 0 1 18.88-58.24L864 418.24a1.6 1.6 0 0 0 0-2.24l-207.04-32a64 64 0 0 1-49.28-35.84z m149.76 160l208.32 32a65.6 65.6 0 0 1 36.48 112L758.08 610.56s11.52 69.76 34.88 208.64a64 64 0 0 1-96 69.12L512 790.72s-62.4 32-186.56 97.6a64 64 0 0 1-96-69.12l35.2-207.04S214.72 562.24 114.24 464a65.6 65.6 0 0 1 38.08-112l207.04-30.4s32-64 93.76-188.8a64 64 0 0 1 117.76 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconShoucang.defaultProps = {
  size: 18,
};

IconShoucang = React.memo ? React.memo(IconShoucang) : IconShoucang;

export default IconShoucang;
