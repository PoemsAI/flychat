/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconQiangzhiqingchu = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M951.168 383.872c-5.056-7.936-12.16-14.336-20.672-18.56l-125.696-61.76 85.056-166.144c6.08-11.904 5.12-26.24-2.56-39.36-6.336-10.688-16.832-20.032-29.504-26.304-12.736-6.208-26.624-8.832-39.232-7.36-15.36 1.792-27.712 9.664-33.792 21.568l-84.992 165.952L564.544 185.472l0.064-0.256L558.72 182.656C557.888 182.208 557.12 181.888 556.224 181.504L556.032 181.44C555.52 181.184 555.072 180.992 554.624 180.864l0 0c-0.64-0.256-1.28-0.512-1.856-0.704L547.392 177.92 547.136 178.496c0 0-0.064 0-0.064 0L546.24 178.304C545.408 178.112 544.64 177.984 544 177.856 543.296 177.728 542.528 177.664 541.568 177.536L538.88 177.28c-0.512-0.064-1.088-0.064-1.92-0.064l-1.152 0c-0.64 0-1.344 0-1.728 0-1.088 0-2.112 0.064-2.88 0.128C530.432 177.408 529.6 177.472 528.832 177.536 528.064 177.664 527.232 177.792 525.376 178.112L521.792 178.944C521.024 179.136 520.32 179.328 519.296 179.648L518.528 179.904c-0.64 0.192-1.216 0.448-1.728 0.64C516.352 180.736 515.776 180.864 515.264 181.12l-5.312 2.56C509.376 184 508.8 184.32 507.968 184.832L504 187.52c-0.64 0.448-1.28 0.96-1.984 1.536C501.504 189.504 500.992 189.952 500.288 190.592 499.584 191.168 498.88 191.808 498.496 192.256 497.792 192.96 497.088 193.664 496.512 194.368 495.872 195.008 495.36 195.584 495.04 196.032 494.4 196.736 493.888 197.504 493.312 198.272 492.736 199.04 492.224 199.808 491.904 200.256 491.52 200.832 491.136 201.472 490.816 202.048l-0.384 0.64c-0.448 0.704-0.832 1.408-1.088 1.92l0 0c-22.208 42.24-50.56 82.56-84.224 119.872C404.608 325.056 404.032 325.632 403.84 325.888 382.272 349.632 358.4 372.288 332.864 393.408c-67.712 55.872-146.88 100.8-235.52 133.568-20.672 7.68-34.304 27.968-33.28 49.472C63.232 594.816 72.704 612.096 88.768 621.696l544.64 325.44c4.8 2.88 10.048 4.928 15.552 6.144 7.744 4.352 16.576 6.656 25.536 6.656 13.632 0 26.496-5.12 36.224-14.464 78.336-75.136 139.84-159.616 182.912-250.944C937.344 601.856 959.68 506.88 960 412.352 960.064 402.176 956.992 392.32 951.168 383.872zM636.992 742.016 636.992 742.016c9.856-9.472 15.424-22.08 15.552-35.584 0.192-13.504-5.056-26.304-14.784-35.904-19.904-19.904-52.736-20.288-73.152-0.768l-75.84 72.512-102.016-60.992 60.288-41.344c11.328-7.744 18.88-19.264 21.312-32.576 2.432-13.312-0.64-26.752-8.576-37.888-16.32-22.784-48.64-28.352-72.064-12.352l-97.28 66.688L223.168 583.552c64.32-31.36 123.584-69.248 176.448-112.832 18.88-15.616 36.928-31.936 53.696-48.512l359.36 200.64c-4.096 9.92-8.448 19.776-12.992 29.376-32.832 69.696-78.336 135.232-135.36 194.88l-84.48-50.496L636.992 742.016zM855.552 441.728c-1.664 27.136-5.568 54.656-11.584 82.112l-322.048-179.84c12.16-16.064 23.616-32.64 34.176-49.472L855.552 441.728z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconQiangzhiqingchu.defaultProps = {
  size: 18,
};

export default IconQiangzhiqingchu;