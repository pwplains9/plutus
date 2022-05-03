import vars from "../helpers";
import {aosInit} from "./aos";
import slider from "./slider";

const init = () => {
	const button = vars.$document.find('.js-switch');
	let themeLocal = localStorage.getItem('theme');
	const hours = new Date().getHours()
	const isDayTime = hours > 6 && hours < 20;

	const dark = () => {
		vars.$html.addClass('is-white');
		vars.$html.find('.nav__themes-text').text('Dark mode');
		localStorage.setItem('theme', 'dark');

		gsap.timeline().to(vars.$body.find('main'), 0.5, {
			autoAlpha: 0,
			immediateRender: false,
		}).call(() => {
			vars.$document.find('.content').removeClass('is-hidden');
		}).from(vars.$body.find('main'), 0.5, {
			autoAlpha: 0,
			clearProps: true,
		})
	}

	const light = () => {
		vars.$html.removeClass('is-white');
		vars.$html.find('.nav__themes-text').text('Light mode');
		localStorage.setItem('theme', 'white');

		gsap.timeline().to(vars.$body.find('main'), 0.5, {
			autoAlpha: 0,
			immediateRender: false
		}).call(() => {
			vars.$document.find('.content').removeClass('is-hidden');
		}).from(vars.$body.find('main'), 0.5, {
			autoAlpha: 0,
			clearProps: true,
		})
	}

	if(isDayTime) {
		light();
	} else {
		dark();
	}

	if(themeLocal === 'dark') {
		dark();
	} else {
		light();
	}

	button.on('click', (e) => {
		if (!vars.$html.hasClass('is-white')) {
			dark();

		} else {
			light();
		}
	});

	setTimeout(() => {
		aosInit();

		slider.init();
	}, 1000)
};

export default {
	init,
}
