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
import vars from "./helpers";

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

if ($('.card__navs').length) {
	let $tabNav = helpers.$document.find('.card__nav');

	$tabNav.on('click', (event) => {
		const $this = $(event.currentTarget);

		$tabNav.removeClass('is-current');

		$this.addClass('is-current');

		gsap.timeline()
			.to(helpers.$document.find('.card__tab.is-active'), 0.5, {
					autoAlpha: 0,
					clearProps: true,
				}
			)
			.call(() => {
				helpers.$document.find('.card__tab').addClass('is-hidden').removeClass('is-active');
				helpers.$document.find(`.card__tab[data-tab='${$this.data('tab')}']`).removeClass('is-hidden').addClass('is-active');
			})
			.from(helpers.$document.find(`.card__tab[data-tab='${$this.data('tab')}']`), 0.5, {
				autoAlpha: 0,
				clearProps: true,
			});
	});
}

if($('.js-connect').length) {

	$('.js-connect').on('click', (e) => {
		e.preventDefault();
		document.querySelector('[data-popup="connect"]').classList.remove('is-hidden');
	})

	$('.popup__close--1').on('click', (e) => {
		e.preventDefault();
		document.querySelector('[data-popup="connect"]').classList.add('is-hidden');
	})

	$('.popup__close--2').on('click', (e) => {
		e.preventDefault();
		document.querySelector('[data-popup="profile"]').classList.add('is-hidden');
	})

	document.querySelectorAll('.popup__item').forEach(item => {
		item.addEventListener('click', (e) => {
			e.preventDefault();

			document.querySelector('[data-popup="profile"]').classList.remove('is-hidden');
		})
	})
}


if($('.explore__filter').length) {
	$('.explore__filter').on('click', (event) => {
		const $this = $(event.currentTarget);

		console.log(event)
		vars.$document.find('.explore__filter').removeClass('is-current')
		$this.addClass('is-current');

		$('.explore__title').text($this.text())

		if($this.attr('data-index') === '2') {
			$('.filter__buy, .filter__price').addClass('is-hidden');
			$('.filter__activitys').removeClass('is-hidden');
		} else {
			$('.filter__buy, .filter__price').removeClass('is-hidden');
			$('.filter__activitys').addClass('is-hidden');
		}

		vars.$document.find(`.explore__items`).addClass('is-hidden')
		vars.$document.find(`.explore__items[data-tab="${$this.attr('data-index')}"]`).removeClass('is-hidden')
	})
}

