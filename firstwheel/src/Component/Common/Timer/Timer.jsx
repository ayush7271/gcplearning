import React, { useEffect, useRef } from 'react';
import { formatTime } from '../../../utils/common';


const Timer = ({ setTimerStart = () => {}, timer, setTimer = () => {} }) => {
	const timerRef = useRef();

	useEffect(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		if (timer > 0) {
			timerRef.current = setTimeout(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		} else {
			setTimerStart(false);
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [timer, setTimer, setTimerStart]);

	return <div className='w-[100%] flex flex-row justify-end text-[#fff]'>Resend OTP after {formatTime(timer)}</div>;
};

export default Timer;
