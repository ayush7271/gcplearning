import React, { useState, useRef, useEffect } from 'react';
import Timer from './Timer/Timer';

export const OTPInputBox = ({
	cb = () => {},
	timer,
	setTimer,
	timerStart,
	setTimerStart,
	handleResendOtp,
	otpNew,
	css_a,
	css,
}) => {
	const [otp, setOtp] = useState(Array(6).fill(''));
	const inputRefs = useRef([]);

	const handleChange = (e, index) => {
		const { value } = e.target;
		const newOtp = [...otp];
		newOtp[index] = value.slice(-1);
		setOtp(newOtp);
		if (value && index < 5) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleBackspace = (e, index) => {
		if (e.key === 'Backspace' && index > 0 && !otp[index]) {
			inputRefs.current[index - 1].focus();
		}
	};

	useEffect(() => {
		if (otp) {
			cb(otp.join(''));
		}
	}, [otp]);

	useEffect(() => {
		if (!otpNew) {
			setOtp(Array(6).fill(''));
		}
	}, [otpNew]);

	return (
		<div>
			<div className='po:w-[100%] max-w-[320px] flex justify-between'>
				{[...Array(6)].map((_, i) => (
					<div key={i} className={`w-[50px] rounded-lg h-[40px] ${css_a}`}>
						<input
							ref={(el) => (inputRefs.current[i] = el)}
							className={`w-[50px] h-[45px] rounded-lg text-[20px] font-bold text-[#000000] text-center focus:outline-none ${css}`}
							type='number'
							value={otp[i]}
							onChange={(e) => handleChange(e, i)}
							onKeyDown={(e) => handleBackspace(e, i)}
							maxLength={1}
						/>
					</div>
				))}
			</div>
			{timerStart && (
				<p className={`w-full my-5  cursor-pointer text-[14px] opacity-80`}>
					<Timer timer={timer} setTimer={setTimer} timerStart={timerStart} setTimerStart={setTimerStart} />
				</p>
			)}
			<div className='flex flex-row justify-end'>
				{!timerStart && (
					<button onClick={handleResendOtp} className='text-[#fff] cursor-pointer px-1 rounded-md text-sm my-5'>
						Resend OTP
					</button>
				)}
			</div>
		</div>
	);
};
