import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';

InertiaProgress.init({
	color: 'red',
});

createInertiaApp({
	resolve: (name) => import(`./Pages/${name}.jsx`),
	setup({ el, App, props }) {
		render(<App {...props} />, el);
	},
});
