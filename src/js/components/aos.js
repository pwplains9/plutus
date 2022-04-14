import AOS from 'aos';
import vars from '../helpers';

export function aosInit() {
	AOS.init({
		once: true,
		// disable: vars.isMobile(),
	});
}
