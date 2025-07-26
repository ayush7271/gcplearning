import getSymbolFromCurrency from 'currency-symbol-map';

// for Indian Currency
function addingCommasToNumber(x) {
	if (!x) {
		return '0';
	}
	let isNegativeNumber = false;

	if (x.charAt(0) === '-') {
		x = x.substr(1);
		isNegativeNumber = true;
	}
	let afterPoint = '';
	if (x.indexOf('.') > 0) afterPoint = x.substring(x.indexOf('.'), x.length);
	const roundOff = Math.round(parseInt(x));
	x = roundOff.toString();
	let lastThree = x.substring(x.length - 3);
	const otherNumbers = x.substring(0, x.length - 3);
	if (otherNumbers !== '') lastThree = `,${lastThree}`;
	const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;

	if (isNegativeNumber) {
		return `-${res}`;
	}
	return `${res}`;
}

export default function addCommaToCurrency(value, currency = 'INR') {
	const currencySymbol = getSymbolFromCurrency(currency || 'INR');
	const valueInString = value + '';
	const x = valueInString.split('.');
	let x1 = x[0];
	const x2 = x.length > 1 ? `.${(x[1] + '0').slice(0, 2)}` : '';
	if (currency === 'INR') {
		x1 = addingCommasToNumber(x1);
	} else {
		const rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			// eslint-disable-next-line no-useless-concat
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
	}
	return currencySymbol + x1 + x2;
}
