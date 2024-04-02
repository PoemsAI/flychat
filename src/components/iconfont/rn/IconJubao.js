/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconJubao = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M960.2 839.8L547 124.1c-7.1-12.4-20.4-20-34.6-20s-27.5 7.6-34.6 20L64.5 839.8c-7.1 12.4-7.1 27.6 0 40 7.1 12.4 20.4 20 34.6 20h826.4c14.3 0 27.5-7.6 34.6-20 7.2-12.4 7.2-27.6 0.1-40z m-791.8-20l343.9-595.7 343.9 595.7H168.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M473 388.6v235.5c0 22.1 17.9 40 40 40s40-17.9 40-40V388.6c0-22.1-17.9-40-40-40s-40 17.9-40 40zM465.031 731.655a47.2 47.2 0 1 0 93.182-15.114 47.2 47.2 0 1 0-93.182 15.114z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconJubao.defaultProps = {
  size: 18,
};

IconJubao = React.memo ? React.memo(IconJubao) : IconJubao;

export default IconJubao;
