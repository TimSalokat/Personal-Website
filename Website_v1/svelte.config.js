import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			"$src": "./src",
			"$routes": "./src/routes",
			"$stores": "./src/stores",
			"$components": "./src/components",
			"$forms": "./src/components/forms",
		}
	},
	preprocess: vitePreprocess()
};

export default config;
