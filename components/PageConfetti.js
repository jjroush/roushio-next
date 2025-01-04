import React from "react";
import { useWindowScroll, useWindowSize } from "react-use";
import ReactConfetti from "react-confetti";

export default React.forwardRef((passedProps, ref) => {
	const { width, height } = useWindowSize();
	const { y } = useWindowScroll();

	return (
		<>
			<ReactConfetti
				height={height + y}
				width={width - 15}
				{...passedProps}
				ref={ref}
			/>
		</>
	);
});
