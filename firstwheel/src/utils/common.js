import React from 'react';
import ENV_CONFIG from '../config/constant/index';
import { isAndroid, isIOS } from './eventUtils';
import Cookies from 'universal-cookie';
import axios from 'axios';
let cookieHandler = new Cookies()
cookieHandler=cookieHandler.get('versionCode')
export const links = {
	TnCLink: 'terms-and-condition#creditScore',
	AboutUsLink: 'about/about-us',
	PolicyLink: 'instacash',
};

export const checkIsMobileDevice = () => {
	const isMobileFromWindow =
		navigator.userAgent.match(/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|Mobi|webOS|BlackBerry/i) ||
		window.innerWidth < 768;

	return isMobileFromWindow;
};

export function validateAge(dob) {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;
	const currentDay = currentDate.getDate();
	const dobArray = dob?.split('-');
	const year = parseInt(dobArray[0]);
	const month = parseInt(dobArray[1]);
	const day = parseInt(dobArray[2]);

	let age = currentYear - year;
	if (currentMonth < month || (currentMonth === month && currentDay < day)) {
		age--;
	}
	if (age >= 18) {
		return true;
	} else {
		return false;
	}
}

export function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export function getStampValue(loanAmount) {
	switch (true) {
		case loanAmount <= 100000:
			return 100;
		case loanAmount <= 250000:
			return 250;
		case loanAmount <= 500000:
			return 500;
		case loanAmount <= 750000:
			return 750;
		case loanAmount <= 1000000:
			return 1000;
		case loanAmount <= 1250000:
			return 2500;
		case loanAmount <= 1500000:
			return 3000;
		case loanAmount <= 1750000:
			return 3500;
		case loanAmount <= 2000000:
			return 4000;
		case loanAmount <= 2250000:
			return 4500;
		case loanAmount <= 2500000:
			return 5000;
		case loanAmount <= 2750000:
			return 5500;
		default:
			return 6000;
	}
}

export function validateName(name) {
	const pattern = /^[a-zA-Z\s]+$/;
	if (pattern.test(name)) {
		return false;
	}
	return true;
}
export function current_Page(url) {
	if (url === '/instacash' || url === '/instacash/') {
		return 'home';
	} else if (url === '/instacash/landing') {
		return 'landing';
	}
}
export const isValidEmail = (email) => {
	const normalizedEmail = email.trim().toLowerCase();
	if (normalizedEmail.includes('creditline')) {
		return false;
	}

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(normalizedEmail);
};

export const getDeviceType = () => {
	try {
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;

		// Check for iOS devices
		if (/iPad|iPhone|iPod/.test(userAgent) && !window?.MSStream) {
			return 'ios';
		}

		// Check for Android devices
		if (/android/i.test(userAgent)) {
			return 'android';
		}

		// Other devices, such as desktop or unsupported mobile OS
		return 'other';
	} catch (ex) {
		console.log('error in getDeviceType', ex);
		return '';
	}
};

export function getPlatform(userAgent, isApp) {
	userAgent = userAgent.toLowerCase();
	if (isAndroid() || isIOS()) {
		if (userAgent.includes('android')) {
			return 'App';
		} else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
			return 'App';
		}
	} else {
		if (userAgent.includes('android')) {
			return 'Mweb';
		} else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
			return 'Mweb';
		} else if (userAgent.includes('macintosh') || userAgent.includes('windows') || userAgent.includes('linux')) {
			return 'web';
		}
	}
}
export const appStoreredirection = () => {
	const deviceType = getDeviceType();
	if (deviceType === 'ios') {
		window.location.href =
			'https://apps.apple.com/in/app/nobroker-rent-buy-sell-flats/id1200507100?referrer=utm_source=instacash&utm_medium=website';
	} else {
		window.location.href =
			'https://play.google.com/store/apps/details?id=com.nobroker.app&referrer=utm_source=instacash&utm_medium=website';
	}
};
export const containsSpecialChars = (text) => {
	const regex = /[!@#$%^&*(),.?":{}|<>]/g;
	return regex?.test(text);
};
export const removeSpecialChar = (str) => {
	return str ? str?.replace(/^[\W_]+/, '') : false;
};

export function addHybridParams(url) {
	try {
		const urlObj = new URL(url);
		urlObj.searchParams.set('hybridActionBar', `true`);
		urlObj.searchParams.set('isHybrid', `${isAndroid() ? true : false}`);
		urlObj.searchParams.set('title', 'NB Instacash');

		url = urlObj.toString();
		if (typeof window.AndroidApp?.openHybridActivity === 'function') {
			window.AndroidApp?.openHybridActivity(url);
			return;
		} else if (isIOS('openHybridActivity')) {
			const redirectURL = `${url}`;
			console.log(redirectURL, 'redirectURL');
			window.webkit.messageHandlers?.openHybridActivity.postMessage(redirectURL);
		} else window.open(url, '_self');
	} catch (e) {
		console.log(e);
	}
}
export const handleTandC = (url) => {
	if (typeof window.AndroidApp?.openHybridActivity === 'function') {
		window.AndroidApp?.openHybridActivity(url);
		return;
	} else if (isIOS('openHybridActivity')) {
		window.webkit.messageHandlers?.openHybridActivity.postMessage(url);
	} else window.open(url, '_blank');
};

// export const btnLoaderSvg = () => (
// 	<svg
// 		className='-ml-1 mr-3 h-5 w-5 text-white animate-spin'
// 		xmlns='http://www.w3.org/2000/svg'
// 		fill='none'
// 		viewBox='0 0 24 24'
// 	>
// 		<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
// 		<path
// 			className='opacity-75'
// 			fill='currentColor'
// 			d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
// 		></path>
// 	</svg>
// );

export const validateNumber = (number, maskMobileno) => {
	if (
		number.slice(0, 2) === maskMobileno.slice(0, 2) &&
		number.slice(number.length - 2, number.length) === maskMobileno.slice(maskMobileno.length - 2, maskMobileno.length)
	) {
		return true;
	}
	return false;
};

export const nobrokerLogout = async () => {
	const domain = ENV_CONFIG.env.serverConstant.API_BASEPATH;
	try {
		const url = `${domain}/signout`;
		const response = await axios.get(url);
		window.location.reload()
		return response;
	} catch (error) {
		return error?.response;
	}
};

export const containsAlphabet = (val) => /[a-zA-Z]/.test(String(val));

export function maskPAN(pan) {
	if (!pan || pan.length !== 10) return '';

	const firstPart = pan.slice(0, 5);
	const lastChar = pan.slice(-1);
	return `${firstPart}****${lastChar}`;
}

export const getFileMimeType = (docUrl) => {
	switch (docUrl) {
		case docUrl?.includes('.docx'):
			return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
		case docUrl?.includes('.doc'):
			return 'application/msword';
		case docUrl?.includes('.pdf'):
			return 'application/pdf';
		default:
			return 'application/pdf';
	}
};

export const startDownload = (value) => {
	let mimeType = getFileMimeType(value)
	if (value) {
		if (isAndroid('startDownload')) window.AndroidApp.startDownload('application/pdf', value);
		else if (isIOS('startDownload') && window.webkit.messageHandlers.startDownload) {
			if (cookieHandler < 758) {
				window.webkit.messageHandlers.startDownload.postMessage(value);
			} else {
				const fileName = value
					?.split('?')?.[0]
					?.split('/')
					?.pop();
				window.webkit.messageHandlers.startDownload.postMessage(
					JSON.stringify({ imgUrl: value, mimeType, fileName })
				);
			}
		} else window.open(value, '_blank');
	}
};
