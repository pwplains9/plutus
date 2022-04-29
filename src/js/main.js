import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import scrollToAnchor from './modules/scrollToAnchor';

import theme from "./components/theme";
import helpers from "./helpers";

ieFix();
vhFix();
actualYear();
scrollToAnchor.init();

header.init();
lazyLoading.init();
theme.init();

if ($('.tabs').length) {
	let $tabNav = helpers.$document.find('.tabs__nav');

	$tabNav.on('click', (event) => {
		const $this = $(event.currentTarget);

		$tabNav.removeClass('is-active');

		$this.addClass('is-active');

		if ($this.data('tab') === 2 || $this.data('tab') === 4) {
			helpers.$document.find('.tabs__navs').addClass('is-active')
		} else {
			helpers.$document.find('.tabs__navs').removeClass('is-active')
		}

		gsap.timeline()
			.to(helpers.$document.find('.tabs__element.is-active'), 0.5, {
					autoAlpha: 0,
					clearProps: true,
				}
			)
			.call(() => {
				helpers.$document.find('.tabs__element').addClass('is-hidden').removeClass('is-active');
				helpers.$document.find(`.tabs__element[data-tab='${$this.data('tab')}']`).removeClass('is-hidden').addClass('is-active');
			})
			.from(helpers.$document.find(`.tabs__element[data-tab='${$this.data('tab')}']`), 0.5, {
				autoAlpha: 0,
				clearProps: true,
			});
	});
}
