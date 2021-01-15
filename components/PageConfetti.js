import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';

import ReactConfetti from 'react-confetti';

export default React.forwardRef((passedProps, ref) => {
  const { width, height } = useWindowSize();
  return (
    <ReactConfetti
      width={width - 15}
      height={height}
      {...passedProps}
      ref={ref}
    />
  );
});
