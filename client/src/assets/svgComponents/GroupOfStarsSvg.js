import React, { memo } from 'react';
import useBreakpoint from '../../customHooks/useBreakpoint';
import { groupOfStarsSizesMap } from '../../constants/bpMapConstants';

const GroupOfStarsSvg = () => {
  const breakpoint = useBreakpoint();

  return (
    <svg width={groupOfStarsSizesMap[breakpoint].width} height={groupOfStarsSizesMap[breakpoint].height} viewBox="0 0 188 252" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M50.3065 74.1802C50.4985 68.4272 47.5444 62.69 41.067 59.2275C38.5588 57.8867 35.5874 57.3986 32.6611 56.9928C44.5493 56.6696 48.6765 46.8062 50.3307 39.1707C49.7562 46.0188 54.2728 53.4158 63.5029 54.0983C54.3146 58.3833 51.161 66.2464 50.3065 74.1802Z" stroke="#A597FF" strokeWidth="6.81286" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M10.8227 151.317C10.9187 148.44 9.44166 145.572 6.20296 143.841C4.94883 143.17 3.46315 142.926 2 142.723C7.94411 142.562 10.0077 137.63 10.8348 133.812C10.5476 137.236 12.8059 140.935 17.4209 141.276C12.8268 143.419 11.25 147.35 10.8227 151.317Z" stroke="#A597FF" strokeWidth="3.40643" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M152.836 249.418C152.932 246.542 151.455 243.673 148.217 241.942C146.962 241.271 145.477 241.027 144.014 240.824C149.958 240.663 152.021 235.731 152.848 231.913C152.561 235.337 154.82 239.036 159.435 239.377C154.84 241.52 153.264 245.451 152.836 249.418Z" stroke="#A597FF" strokeWidth="3.40643" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M121.029 165.479C121.221 159.726 118.267 153.989 111.79 150.526C109.281 149.186 106.31 148.697 103.384 148.292C115.272 147.968 119.399 138.105 121.053 130.469C120.479 137.318 124.995 144.715 134.226 145.397C125.037 149.682 121.884 157.545 121.029 165.479Z" stroke="#A597FF" strokeWidth="6.81286" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M162.203 58.5458C162.491 49.9163 158.059 41.3106 148.343 36.1169C144.581 34.1057 140.124 33.3734 135.734 32.7649C153.567 32.28 159.758 17.485 162.239 6.03174C161.377 16.3039 168.152 27.3993 181.997 28.4231C168.215 34.8506 163.484 46.6451 162.203 58.5458Z" stroke="#A597FF" strokeWidth="10.2193" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default memo(GroupOfStarsSvg);
