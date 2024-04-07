/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconJingyin = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M524.8 149.333333h-2.133333c-8.533333 0-17.066667 2.133333-25.6 8.533334-125.866667 108.8-192 166.4-198.4 172.8H196.266667c-12.8 0-23.466667 4.266667-32 12.8-10.666667 10.666667-14.933333 21.333333-14.933334 32v277.333333c0 12.8 4.266667 23.466667 12.8 32 8.533333 8.533333 19.2 12.8 32 12.8H298.666667c2.133333 2.133333 21.333333 19.2 53.333333 46.933333 32 27.733333 66.133333 55.466667 96 81.066667 32 25.6 46.933333 40.533333 49.066667 40.533333 8.533333 6.4 17.066667 8.533333 25.6 8.533334h2.133333c17.066667-2.133333 27.733333-12.8 32-32v-661.333334c-4.266667-19.2-14.933333-29.866667-32-32z m-8.533333 676.266667c-6.4-4.266667-198.4-170.666667-198.4-170.666667H194.133333V371.2h123.733334s46.933333-42.666667 198.4-174.933333v629.333333zM776.533333 512l89.6-89.6c8.533333-8.533333 8.533333-21.333333 0-29.866667s-21.333333-8.533333-29.866666 0L746.666667 482.133333l-89.6-89.6c-8.533333-8.533333-21.333333-8.533333-29.866667 0s-8.533333 21.333333 0 29.866667l89.6 89.6-89.6 89.6c-8.533333 8.533333-8.533333 21.333333 0 29.866667s21.333333 8.533333 29.866667 0l89.6-89.6 89.6 89.6c8.533333 8.533333 21.333333 8.533333 29.866666 0s8.533333-21.333333 0-29.866667L776.533333 512z"
        fill={getIconColor(color, 0, '#221714')}
      />
    </Svg>
  );
};

IconJingyin.defaultProps = {
  size: 18,
};

IconJingyin = React.memo ? React.memo(IconJingyin) : IconJingyin;

export default IconJingyin;
