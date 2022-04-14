import helpers from '../helpers';

function openMenu() {
	return new Promise((resolve) => {
		$('.js-burger').addClass('is-disabled').attr('disabled', true);

		helpers.lockScroll(true, helpers.$nav, 'nav');

		helpers.$nav.addClass('is-menu-opened');
		helpers.$header.addClass('is-menu-opened');
		// helpers.$nav.removeClass('is-hidden');

		setImmediate(() => {
			helpers.$body.css('padding-right', `${helpers.getScrollbarWidth()}px`);
			helpers.$nav.css('right', `${helpers.getScrollbarWidth()}px`);
		});

		setTimeout(() => {
			helpers.$nav.addClass('is-active');
			$('.js-burger').removeClass('is-disabled').attr('disabled', false);

			resolve();
		}, 100);
	});
}

function closeMenu() {
	return new Promise((resolve) => {
		$('.js-burger').addClass('is-disabled').attr('disabled', true);

		helpers.lockScroll(false, helpers.$nav, 'nav');
		helpers.$body.css('padding-right', '');
		helpers.$nav.css('right', '');

		helpers.$nav.removeClass('is-menu-opened');
		helpers.$header.removeClass('is-menu-opened');
		$('.header__menu').removeClass('is-active');

		setTimeout(() => {
			// helpers.$nav.addClass('is-hidden');
			$('.js-burger').removeClass('is-disabled').attr('disabled', false);

			resolve();
		}, 500);
	});
}

function toggleMenu(event) {
	event.preventDefault();
	event.stopPropagation();

	if ($(event.currentTarget).hasClass('is-active')) {
		$(event.currentTarget).removeClass('is-active');
		closeMenu();
	} else {
		$(event.currentTarget).addClass('is-active');
		openMenu();
	}
}

function init() {
	helpers.$header = $('.header');

	$('.js-burger').on('click.header', toggleMenu);

	helpers.$document
		.on('click.nav', (e) => {
			let $container = $('.header__menu');

			if ($container.is(e.target) && $container.has(e.target).length === 0 && $container.hasClass('is-active')) {
				closeMenu();
				$('.js-burger').removeClass('is-active');
			}
		})
		.on('keyup.header', (e) => {
			if ((e.key === 'Escape' || e.key === 'Esc') && $('.header__menu').hasClass('is-active')) {
				closeMenu();
				$('.js-burger').removeClass('is-active');
			}
		});
}

function destroy() {
	$('.js-burger').off('.nav');
	helpers.$document.off('.nav');
}

export default {
	init,
	destroy,
	openMenu,
	closeMenu,
};
