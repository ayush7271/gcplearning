'use strict';

const isDev = import.meta.env.VITE_NODE_ENV === 'development';
const isBeta = import.meta.env.VITE_NODE_ENV === 'beta';

let config;

if (isDev) {
  config = await import('./constant.dev.js');
} else if (isBeta) {
  config = await import('./constant.beta.js');
} else {
  config = await import('./constant.prod.js');
}

export default config.default;
