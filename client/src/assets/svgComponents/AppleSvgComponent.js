import React from 'react';
import useBreakpoint from '../../customHooks/useBreakpoint';

const AppleSvgComponent = () => {
  const breakPoint = useBreakpoint();
  const breakPointMap = {
    mobile: {
      width: 27,
      height: 30,
    },
    tablet: {
      width: 28,
      height: 31,
    },
    desktop: {
      width: 32,
      height: 35,
    },
  };
  return (
    <svg width={breakPointMap[breakPoint].width} height={breakPointMap[breakPoint].height} viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.6301 22.8879C25.1709 23.9139 24.6273 24.8584 23.9975 25.7267C23.139 26.9105 22.4361 27.7299 21.8944 28.1849C21.0547 28.9318 20.1549 29.3143 19.1915 29.3361C18.4998 29.3361 17.6657 29.1457 16.6948 28.7596C15.7206 28.3753 14.8254 28.1849 14.0068 28.1849C13.1484 28.1849 12.2276 28.3753 11.2428 28.7596C10.2565 29.1457 9.46195 29.3469 8.85445 29.3669C7.93055 29.4049 7.00965 29.0116 6.09043 28.1849C5.50374 27.69 4.7699 26.8416 3.8908 25.6397C2.9476 24.3563 2.17215 22.8679 1.56465 21.1712C0.914039 19.3384 0.587891 17.5637 0.587891 15.8455C0.587891 13.8773 1.02763 12.1798 1.90842 10.7573C2.60064 9.61467 3.52154 8.71334 4.67412 8.05167C5.8267 7.38999 7.07206 7.05281 8.41321 7.03124C9.14704 7.03124 10.1094 7.25077 11.3052 7.68222C12.4978 8.11512 13.2635 8.33465 13.5992 8.33465C13.8501 8.33465 14.7008 8.07795 16.1427 7.5662C17.5064 7.0916 18.6573 6.8951 19.6001 6.9725C22.1549 7.17191 24.0743 8.14594 25.3508 9.90073C23.0659 11.2397 21.9356 13.115 21.9581 15.5208C21.9787 17.3947 22.6817 18.9541 24.0631 20.1922C24.6892 20.7669 25.3883 21.211 26.1662 21.5265C25.9975 21.9996 25.8194 22.4528 25.6301 22.8879ZM19.7707 0.588512C19.7707 2.05727 19.2159 3.42864 18.1099 4.69797C16.7754 6.20695 15.1611 7.07891 13.4106 6.94132C13.3883 6.76512 13.3754 6.57967 13.3754 6.38479C13.3754 4.97479 14.01 3.4658 15.1371 2.232C15.6998 1.60731 16.4155 1.08789 17.2833 0.673532C18.1493 0.26536 18.9684 0.0396315 19.7388 0.000976562C19.7613 0.197326 19.7707 0.393688 19.7707 0.588493V0.588512Z" fill="#323142" />
    </svg>
  );
};

export default AppleSvgComponent;