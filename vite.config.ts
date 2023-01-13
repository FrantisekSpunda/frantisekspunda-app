import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'
import laravel from 'laravel-vite-plugin';

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		laravel({
			input: ['resources/css/app.css', 'resources/js/app.tsx'],
			refresh: true,
		}),
	],
});
