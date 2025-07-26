export const copyToClipboard = (value) => {
	var tempID = document.createElement('input');
	tempID.value = value;
	document.body.appendChild(tempID);
	tempID.select();
	document.execCommand('copy');
	document.body.removeChild(tempID);
};
