import helpers from '../helpers';

/**
* Модуль "Возврат наверх"
*/
const init = () => {
	const className = '.js-back-to-top';
	const $percentEl = $('.backTop__percents');
	const $svg = $('.backTop__progress');
	// const shownClass = 'is-shown';
	// let lastScrollTop = 0;

	helpers.$document.on('click.backTop', `${className}`, (e) => {
		if (e.currentTarget.classList.contains('is-active')) {
			helpers.scrollTo($('body'));
		}
	});

	helpers.$window.on('scroll.backTop', () => {
		const scrollTop = window.pageYOffset;
		const percentScroll = Math.round(100 * scrollTop / (helpers.$body.height() - window.innerHeight));
		$percentEl.html(`${percentScroll}%`);
		$svg.css('stroke-dashoffset', `${150 - 150 * percentScroll / 100}px`);
		if (percentScroll === 100) {
			$('.backTop').addClass('is-active');
		} else {
			$('.backTop').removeClass('is-active');
		}
		// if (scrollTop > window.innerHeight) {
		// 	if (lastScrollTop > scrollTop) {
		// 		$(className).addClass(shownClass);
		// 	} else {
		// 		$(className).removeClass(shownClass);
		// 	}
		// } else {
		// 	$(className).removeClass(shownClass);
		// }

		// lastScrollTop = scrollTop;
	});
};

const destroy = () => {
	helpers.$window.off('.backTop');
	helpers.$document.off('.backTop');
};

export default {
	init,
	destroy,
};
