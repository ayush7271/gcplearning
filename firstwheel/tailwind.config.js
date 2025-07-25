/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	darkMode: 'class',
	// important: true,
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {
			colors: {
				'dark-bg-color': '#222020',
				'light-bg-color': '#FEFEFE',
				'modal-bg-color': '#2a2929',
				'congo-color': '#bdbdbd',
				'regular-text': '#DBDBDB',
				'light-text-color': '#606060',
				'loan-text': '#ECBC02',
				'btn-bg-color': '#56984C',
				'icon-bg-color': '#56984c26',
				'dark-border-color': '#3A3A3B',
				'white-shade': '#ffffff4f',
				'emi-color': '#292828',
				'emi-border-color': '#55974B',
				'emi-select-bg': '#272727',
				'recommeneded-text-color': '#72B272',
				'recommended-bg': '#3c5d375e',
				'green-bg': 'rgba(86, 152, 76, 0.7)',
			},
			height: {
				'45p': '45%',
			},
			fontFamily: {
				source: ['"Source Sans Pro"', 'sans-serif'],
			  },
			width: {
				'95p': '95%',
				'90p': '90%',
				78: '308px',
				wp: 'calc(100% - 48px)',
			},
			backgroundImage: {
				'mask-texture': "url('https://assets.nobroker.in/merchandise/media/instacash_mask.webp')",
				'home-texture': "url('https://assets.nobroker.in/merchandise/media/home-texture.svg')",
				'desktop-texture': "url('https://assets.nobroker.in/merchandise/media/d-texture.webp')",
				'not-eligible': "url('https://assets.nobroker.in/merchandise/media/msskgroup.png')",
				'rejectedlogo':"url('https://assets.nobroker.in/merchandise/media/rejectedLogo.png')",
				'mutualFund':"url('https://assets.nobroker.in/merchandise/media/mutualfund.png')",
				'elipse':"url('https://assets.nobroker.in/merchandise/media/elipse.png')",
				'mutualFundLogo':"url('https://assets.nobroker.in/merchandise/media/elipse.png')",
				'mutualFundrupiLog':"url('https://assets.nobroker.in/merchandise/media/elipse.png')",
			
			},
			boxShadow: {
				'btn-shadow': '0px 4px 8px #35717C36',
				'credit-modal': '0px 43px 46px #00000077',
				'radio-shadow': '-3px 3px 12px #000000AC',
				'emi-detail': '0px 3px 30px #00000045',
			},
			padding: {
				6.5: '1.625rem',
				15: '3.75rem',
			},
			screens: {
				sm: { max: '390px' },
				md: { max: '480px' },
				lg: { max: '1000px' },
				po: { max: '480px' },
				tab: { max: '767px' },
			},
		},
	},
	plugins: [],
};
