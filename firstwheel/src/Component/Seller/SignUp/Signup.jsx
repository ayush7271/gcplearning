import React, { useEffect, useRef, useState } from 'react';
import homePageLottie from '../../../LottieJson/HomePageLottie.json';
import Lottie from 'react-lottie';
import { containsAlphabet, containsSpecialChars, isValidEmail } from '../../../utils/common';

const mainLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: homePageLottie,
    renderer: 'svg',
};

const Signup = ({ setGlobalState, globalState }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [checkBox, setCheckBox] = useState(true);
    const [loginDetails, setLoginDetails] = useState({});
    const [error, setError] = useState({})


    const circleStyle = (clr) => ({
        background: `radial-gradient(90% 90% at 70% 50%, ${clr} 0%, transparent 90%)`,
    });

    const handleChange = (key, value) => {
        const errorConfig = {
            name: {
                condition: (val) => {
                    const trimmedVal = val.trim();
                    if (trimmedVal.length < 3) {
                        return true;
                    }
                    return !containsAlphabet(trimmedVal);
                },
                message: 'Please enter your name (minimum 3 characters)!',
            },
            email: {
                condition: (val) => !isValidEmail(val),
                message: 'Please enter valid email address',
            },
            specialChars: {
                condition: (val) => containsSpecialChars(val),
                message: 'Special characters are not allowed',
            },
        };

        let errorMap = null;

        if (errorConfig?.[key]?.condition(value)) {
            errorMap = {
                show: true,
                message: errorConfig[key].message,
            };
        }
        else if (key !== 'email' && errorConfig.specialChars.condition(value)) {
            errorMap = {
                show: true,
                message: errorConfig.specialChars.message,
            };
        }
        setError((prev) => ({
            ...prev,
            [key]: errorMap ?? { show: false, message: '' },
        }));
        setLoginDetails((prevState) => ({
            ...prevState,
            [key]: key === 'phone' ? value.slice(0, 10) : value,
        }));
    };

    const handleChangePhone = () => {

        setLoginDetails(() => ({ phone: '' }))


    }




    return (
        <>


            <div className=' h-screen w-[100%] overflow-x-hidden bg-[#111014] pt-16 text-red  pb-[250px]'>
                {/* <div className='h-[200px] w-[200px] right-0 '>
						<Lottie options={mainLottieOptions} />
					</div> */}
                {/* <div
						className='w-[85%] h-80  top-32 right-0 opacity-40 blur-[50px]'
						style={circleStyle('#4E31EA')}
					></div> */}
                <p className='mt-[30px] w-[60%] text-[13px] opacity-50 ml-[30px]'>
                    On-demand access to money, flexible EMIs, pay only when you withdraw
                </p>
                <div className='w-[85%] m-auto mt-[100px] pb-[250px]'>
                    <>
                        <>
                            <div className='text-[#f4f4f4ca] font-bold text-[18px]'>Enter phone to continue</div>
                            <div className='h-[50px] mt-[10px] m-auto rounded-lg border-2 border-[#70707043] bg-gradient-to-l from-[#52337b] to-[#38353a] relative flex'>
                                <input
                                    className='custom-rounded w-[56px] cursor-none h-full p-2 bg-transparent placeholder-opacity-50 focus:outline-none text-[16px]'
                                    type='text'
                                    value={`+91`}
                                    disabled={true}
                                />
                                <input
                                    className={`w-[85%] h-full bg-transparent bg-no-repeat bg-padding-box padding-box placeholder:text-[16px] placeholder:opacity-40 text-[16px] text-[#ffffff] focus:outline-none`}
                                    type='number'
                                    value={loginDetails?.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    placeholder='Phone No. linked with PAN'
                                    disabled={loginDetails?.showotp}
                                />
                                {loginDetails?.showotp && (
                                    <p
                                        className='w-[150px] h-full bg-[#513376] pt-[14px] pl-2 placeholder-opacity-50 focus:outline-none text-[12px] cursor-pointer text-[] underline'
                                        onClick={handleChangePhone}
                                    >
                                        Change phone
                                    </p>
                                )}
                            </div>
                            {/* {singUpDetails?.showotp &&
                                        <>
                                            <p className='text-[16px] mt-5 text-[#D5D4D5] font-bold pb-5 opacity-80 z-100'>Enter OTP</p>
                                            <OTPInputBox
                                                otpNew={otp}
                                                cb={setOtp}
                                                timer={timer}
                                                timerStart={timerStart}
                                                setTimer={setTimer}
                                                setTimerStart={setTimerStart}
                                                handleResendOtp={handleResendOtp}
                                                css={`!border-b-[1px] !bg-transparent !rounded-none text-[#ffffff]`}
                                            />
                                        </>
                                    } */}
                        </>
                    </>
                </div>


            </div>
        </>

    );
};

export default Signup;
