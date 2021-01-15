import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';

import ReactConfetti from 'react-confetti';

export default React.forwardRef((passedProps, ref) => {
  const { width, height } = useWindowSize();
  console.log(width, height);
  return (
    <ReactConfetti width={width} height={height} {...passedProps} ref={ref} />
  );
});
