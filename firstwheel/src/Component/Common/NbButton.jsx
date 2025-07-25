import React from 'react';

function NbButton({ text = '', disabled = false, onClick = () => {}, btnCss = '', loading = false }) {
	const btnLoaderSvg = () => (
		<svg
			className='-ml-1 mr-3 h-5 w-5 text-white animate-spin'
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
		>
			<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
			<path
				className='opacity-75'
				fill='currentColor'
				d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
			></path>
		</svg>
	);

	return (
		<button
			className={`nb-button bg-[#56984C] text-white border-2 border-[#70707043] rounded-lg flex items-center justify-center disabled:opacity-50 ${btnCss}`}
			onClick={onClick}
			disabled={disabled}
		>
			{loading && btnLoaderSvg()}
			{text}
		</button>
	);
}

export default NbButton;
