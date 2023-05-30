const themes = ['@skeletonlabs/skeleton/themes/theme-sahara.css', '../../themes/trot1.postcss'];

// TODO: 95% sure this is possible to do
export function setTheme(theme?: any) {
	document.documentElement.style.setProperty('--color-primary-500', '255,255,255');
}
