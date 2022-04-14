const init = () => {
	if ($('.slider').length) {
		new Swiper('.slider', {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			navigation: {
				nextEl: '.slider__nav--next',
				prevEl: '.slider__nav--prev',
			},
		});
	}
}

export default {
	init,
}
