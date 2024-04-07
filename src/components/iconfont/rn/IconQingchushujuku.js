/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconQingchushujuku = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M923.00956367 369.5144583L766.92970039 290.19461592l87.41440899-173.27217129A32.48204589 32.48204589 0 0 0 854.62084707 71.81425742 32.68959873 32.68959873 0 0 0 809.30510615 71.08782207l-96.78888721 191.53683545-134.56353427-68.07738692c-14.42493457-7.26435527-27.98506406-10.9311249-40.2652837-10.9311249-22.24276435 0-36.73688291 11.62296826-42.99806513 22.62327803l-1.1415419 2.21389893C394.61419268 426.52235146 109.05584258 546.66095205 106.08091631 547.90626992c-12.45318047 5.50015488-21.23959131 15.25514589-24.76799209 27.43158955-5.7768917 19.95968145 5.1542332 37.80923994 7.40272412 41.19927275l3.49380879 5.25800919 521.4769374 322.95248349c18.33384903 11.27704658 33.96950947 16.77720146 47.7371918 16.77720146 13.14502383 0 21.2741833-5.05045635 25.04473067-8.19834345l1.45287069-1.27990986c188.56190918-179.60253838 249.27116484-443.64455859 255.22101827-504.5267751 5.05045635-52.23417451-10.30846641-71.19068203-20.13264229-78.00533965z m-37.32494942 72.29763193c-0.03459199 0.41510566-5.91526055 44.41634385-26.18627167 110.59116152-94.19447461-46.28432109-309.32316914-170.36642901-379.89119268-211.32355605a548.1820916 548.1820916 0 0 0 61.91998154-98.76064043c2.35226777 0.58806651 5.84607656 1.79879238 10.58520323 4.15106015 29.78385732 15.01300107 254.04488437 128.61368174 322.19145615 163.13666573l11.2078626 5.67311572c0.79562021 4.32402099 1.52205557 12.55695732 0.17296084 26.53219336z m-262.69292636 294.13720724a32.51663789 32.51663789 0 0 0 0.72643536-45.59247862 32.68959873 32.68959873 0 0 0-45.31574093-0.72643536l-100.14432714 97.54991456a28.36557773 28.36557773 0 0 0-3.11329512 3.56299365l-152.44768564-94.40202744L425.19366934 626.08457041a32.41286191 32.41286191 0 0 0 8.44048915-44.79685752 32.03234825 32.03234825 0 0 0-44.5201207-8.47508115l-115.22651308 78.97391982a31.30591201 31.30591201 0 0 0-8.61345 8.95937168l-112.9434293-69.91077217c56.93870917-26.56678536 185.48320693-94.26365859 288.91379004-204.95859696 72.78192247 42.34081377 301.81666904 174.72504199 399.47035957 221.87416727-30.64866153 82.05262295-87.17226416 198.35149307-184.20329619 294.10261524a86.68797363 86.68797363 0 0 1-12.62614131-6.60710391l-112.77046846-69.84158818 91.87679883-89.45534707z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconQingchushujuku.defaultProps = {
  size: 18,
};

IconQingchushujuku = React.memo ? React.memo(IconQingchushujuku) : IconQingchushujuku;

export default IconQingchushujuku;
