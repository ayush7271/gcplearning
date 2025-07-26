import Cookies from 'universal-cookie';
import ENV_CONFIG from '../config/constant/index';

const cookieHandler = new Cookies();
const appVersionCode = cookieHandler.get('versionCode');
const domain = ENV_CONFIG.env.serverConstant.API_BASEPATH;

/**
 * @param {String} fxName pass function name it will return true if exist else false
 * @return {Boolean} if fxName is undefined, then it will check only weather its IOS or not, if fxName is provided then it will check if function exists or not
 */
export function isIOS(fxName = false) {
	let isChrome = null;
	if (typeof window !== 'undefined') {
		isChrome = window?.navigator?.userAgent.match('CriOS')?.length;
	}
	const isAppleDevice =
		typeof window !== 'undefined' &&
		typeof window.webkit !== 'undefined' &&
		typeof window.webkit.messageHandlers !== 'undefined' &&
		!isChrome;
	return isAppleDevice && fxName
		? typeof window.webkit.messageHandlers[fxName] === 'object' &&
		typeof window.webkit.messageHandlers[fxName].postMessage === 'function'
		: isAppleDevice;
}

/**
 * @param {String} fxName pass function name it will return true if exist else false
 * @return {Boolean} if fxName is undefined, then it will check only weather its Android or not, if fxName is provided then it will check if function exists or not
 */

export function isAndroid(fxName = false) {
	const isAndroidDevice = typeof window !== 'undefined' && typeof window.AndroidApp !== 'undefined';
	return isAndroidDevice && fxName ? typeof window.AndroidApp[fxName] === 'function' : isAndroidDevice;
}

export function isIOSDevice() {
	let isAppleDevice = null;
	if (typeof window !== 'undefined') {
		isAppleDevice =
			window?.navigator?.userAgent.match('iPhone OS')?.length || window?.navigator?.userAgent.match('Mac OS')?.length;
	}
	return isAppleDevice;
}

export const isHoodExplore = (location = window?.location) => {
	if (location?.search?.toLowerCase()?.includes('hood_explore')) {
		return true;
	}
	return false;
};




export function isHybridView() {
	if (isIOS() || isAndroid()) {
		return true;
	}
}

export const handleTelPrompt = (phoneNo) => {
	if (isIOS() && typeof window !== 'undefined') {
		window.webkit.messageHandlers.telPrompt.postMessage(phoneNo);
	} else {
		window.open(`tel:${phoneNo}`, '_self');
	}
};


const maskSensativeData = (info) => {
	let maskedData = '';
	for (let i = 0; i < info.length; i++) {
		const newCharCode = info.charCodeAt(i) + 5;
		maskedData += String.fromCharCode(newCharCode);
	}
	return maskedData;
};

/* Method to construct the firebase event Object */
const getFirebaseEventNewObject = (category, action, customParams, extraParamsCopy) => {
	const eventObject = {
		eventName: action,
		eventCategory: category,
		eventBundle: {
			...customParams,
			...extraParamsCopy,
		},
	};
	return eventObject;
};

/* Method to construct the firebase event Object */
const getFirebaseEventObject = (category, action) => {
	const eventObject = {
		eventName: category,
		eventBundle: {
			content_type: category,
			item_category: category,
			item_name: action,
			item_id: action,
		},
	};
	return eventObject;
};

export function nbUserEvent(category, action, extraParams = {}, insightEc = {}, eventContextParam) {
	const { pi, ad_id } = extraParams;
	let platform = '';
	try {
		if (typeof window !== 'undefined') {
			if (isAndroid()) {
				platform += 'android';
			} else if (isIOS() || (window?.location?.search?.toLowerCase() || '').includes('_device=ios')) {
				platform += 'ios';
			} else if (window.innerWidth <= 768) {
				platform += 'mobile-web';
			} else {
				platform += 'desktop';
			}
		}
	} catch (e) {
		// e
		platform += 'desktop';
	}

	const additionalData = {};
	let extraParamsCopy = {};
	let insightPayload = {};

	try {
		const userStats = nbCache.get('ustats');

		if (userStats && userStats.id) {
			additionalData.userId = userStats.id;
		}

		const city = cookieHandler.get('nbcr');
		if (city) {
			additionalData.city = city;
		}

		if (typeof window !== 'undefined') {
			const ua = window?.navigator?.headers ? window?.navigator?.headers['user-agent'] : window?.navigator?.userAgent;
			if (ua) {
				additionalData.user_agent = ua;
			}
		}

		const mbTrackID = cookieHandler.get('mbTrackID');
		if (mbTrackID) {
			additionalData.device_id = mbTrackID;
		}

		const nbDevice = cookieHandler.get('nbDevice');
		if (nbDevice) {
			additionalData.nbDevice = nbDevice;
		}

		const nbCampaignData = cookieHandler.get('nbCampaign');
		if (nbCampaignData) {
			additionalData.nbCampaign = nbCampaignData;
		}

		const nbSourceData = cookieHandler.get('nbSource');
		if (nbSourceData) {
			additionalData.nbSource = nbSourceData;
		}

		const nbMediumData = cookieHandler.get('nbMedium');
		if (nbMediumData) {
			additionalData.nbMedium = nbMediumData;
		}

		const cfCountry = cookieHandler.get('cloudfront-viewer-country');
		if (cfCountry) {
			additionalData.country = cfCountry;
		}

		const cfLatitude = cookieHandler.get('cloudfront-viewer-latitude');
		if (cfLatitude) {
			additionalData.latitude = cfLatitude;
		}

		const cfLongitude = cookieHandler.get('cloudfront-viewer-longitude');
		if (cfLongitude) {
			additionalData.longitude = cfLongitude;
		}

		const cfAddress = cookieHandler.get('cloudfront-viewer-address');
		if (cfAddress) {
			additionalData.ip_address = cfAddress;
		}

		const nbfr = cookieHandler.get('nbfr');
		if (nbfr) {
			additionalData.nbfr = nbfr;
		}
		if (platform) {
			additionalData.event_label = platform;
		}

		if (typeof window !== 'undefined') {
			additionalData.page_url = window?.location?.href;
		}

		additionalData.event_category = category;

		extraParamsCopy = { ...extraParams };

		if (extraParamsCopy && Object.keys(extraParamsCopy).length > 0) {
			delete extraParamsCopy?.label;
		}

		if (!additionalData.nbSource) {
			const { nbSource, nbMedium, nbCampaign } = extractSourceMedium();
			additionalData.nbSource = nbSource;
			additionalData.nbMedium = nbMedium;
			additionalData.nbCampaign = nbCampaign;
		}

		insightPayload = {
			s: 'NOBROKER',
			ac: {
				userId: userStats.id,
				city,
			},
			di: {
				platform,
				device_id: additionalData?.device_id,
				versionCode: '0.0.1',
				ip_address: additionalData?.ip_address,
				user_agent: additionalData.user_agent,
				lat: additionalData.latitude,
				lng: additionalData.longitude,
				city,
			},
			ec: eventContextParam
				? { ...eventContextParam }
				: insightEc?.ec
					? insightEc?.ec
					: {
						id: category === 'AD' ? ad_id : pi,
						type: category,
						action,
					},
			en: insightEc?.en
				? addOrUpdateQueryParams({ eventName: insightEc?.en })
				: addOrUpdateQueryParams({ eventName: action?.toUpperCase() }),
			ft: new Date().valueOf(),
			ai: { ...additionalData, ...extraParamsCopy },
			ati: {
				nbSource: additionalData.nbSource,
				nbMedium: additionalData.nbMedium,
				nbCampaign: additionalData.nbCampaign,
				referrer: typeof window !== 'undefined' && window?.document?.referrer,
			},
		};
	} catch (error) {
		console.log(error);
	}

	try {
		window.dataLayer.push({
			event: 'nbuDataLayer',
			event_category: category,
			action,
			event_label: platform,
			insightPayload: { ...insightPayload },
		});
	} catch (error) {
		// console.log("gtm error", error);
	}
}

export const addOrUpdateQueryParams = (params) => {
	const urlObj = new URL(window.location);
	if (urlObj?.searchParams?.size > 0) {
		if (params) {
			Object.keys(params)?.forEach((key) => {
				urlObj?.searchParams?.set(key, params[key]);
			});
		}
		return `${urlObj?.searchParams?.toString()}`;
	}
	return params?.eventName.toString();
};



export function getUrlParameter({ param, query, existCheckOnly = false }) {
	let url = '';
	if (typeof global !== 'undefined' && global.server === true && query) {
		url = decodeURIComponent(query.substring(1));
	} else if (typeof window !== 'undefined') {
		url = decodeURIComponent(window.location.search.substring(1));
	} else {
		return false;
	}
	const params = url.split('&');
	let queryParam;
	for (let i = 0; i < params.length; i++) {
		queryParam = params[i].split('=');
		if (queryParam[0] === param) {
			return queryParam[1] === undefined ? existCheckOnly : queryParam[1];
		}
	}
	return false;
}

export function closeHybridView(callback) {
	try {
		if (isIOS('exitCall')) {
			window.webkit.messageHandlers.exitCall.postMessage('exit');
		} else if (isAndroid()) {
			window.AndroidApp.closeActivity();
		} else {
			typeof window !== 'undefined' && window.open(landingPageRedirection(), '_self');
		}
	} catch (error) {
		console.error(error);
	}
}

function landingPageRedirection(page) {
	switch (page) {
		case 'rent_page_desktop':
			return 'https://www.nobroker.in/pay-property-rent-online';
		case 'nbpay_wallet':
			return 'https://www.nobroker.in/wallet';
		case 'nbpay_rent_page':
			return 'https://www.nobroker.in/pay-property-rent-online';
		case 'nbpay_newrent_page':
			return 'https://www.nobroker.in/pay-rent-bills-online';
		default:
			return 'https://www.nobroker.in';
	}
}

export const loadClarity = (callback) => {
	const existingScript = document.getElementById('clarityAnalytics');
	if (!existingScript) {
		const script = document.createElement('script');
		script.id = 'clarityAnalytics';
		script.defer = true;
		const scriptText = document.createTextNode(
			`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "j1qpupz9mf");`
		);
		script.appendChild(scriptText);
		document.body.appendChild(script);
		setTimeout(() => {
			if (typeof callback === 'function') callback();
		}, 100);
	}
};

export const loadFaceBookPixel = (callback) => {
	const existingScript = document.getElementById('facebookPixel');
	if (!existingScript) {
		const script = document.createElement('script');
		script.id = 'facebookPixel';
		script.defer = true;
		const scriptText = document.createTextNode(
			`!function(f,b,e,v,n,t,s)
			{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
			n.callMethod.apply(n,arguments):n.queue.push(arguments)};
			if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
			n.queue=[];t=b.createElement(e);t.async=!0;
			t.src=v;s=b.getElementsByTagName(e)[0];
			s.parentNode.insertBefore(t,s)}(window,document,'script',
			'https://connect.facebook.net/en_US/fbevents.js');
			fbq('init', '686098691497157'); 
			fbq('track', 'PageView');`
		);
		script.appendChild(scriptText);
		document.body.appendChild(script);
		setTimeout(() => {
			if (typeof callback === 'function') callback();
		}, 100);
	}
};
export const initializeClarity = async (userId = '', screenName) => {
	try {
		loadClarity();
		const mbTrackID = cookieHandler.get('mbTrackID');
		window.clarity('identify', userId, mbTrackID || 'no-track-id');
		window.clarity('set', 'screen', screenName);
	} catch (error) {
		// console.log(error);
	}
};

export function getRandomNumber() {
	let number = Math.floor(Math.random() * 99) + 1;
	return number % 2 === 0;
}

export function jsonToBase64(jsonObj) {
	const jsonString = JSON.stringify(jsonObj);
	const base64String = btoa(jsonString);

	return base64String;
}

export function maskExceptLastFour(input, maskChar = 'X') {
	const str = String(input);
	const length = str.length;
	if (length <= 4) {
		return str;
	}
	const maskedPart = maskChar.repeat(length - 4);
	const lastFour = str.slice(-4);
	return maskedPart + lastFour;
}
