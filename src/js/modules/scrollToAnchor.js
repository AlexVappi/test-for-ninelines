import header from '../components/header';
import helpers from '../helpers';

/**
* Модуль "Плавный переход к якорю"
*/
const init = () => {
	helpers.$document.on('click.anchor', '.js-to-anchor', (e) => {
		e.preventDefault();
		e.stopPropagation();

		const id = $(e.currentTarget).attr('href');
		const speed = $(e.currentTarget).data('speed') || 500;
		// eslint-disable-next-line max-len
		// const offset = helpers.$header.css('position') === 'fixed' || helpers.$header.css('position') === 'absolute' ? -helpers.$header.outerHeight(true) : 0;
		// $('.header__link').removeClass('is-active');
		// e.target.classList.add('is-active');
		if (helpers.isMobile()) {
			header.closeMenu().then(() => {
				$('.js-burger').removeClass('is-active');
				helpers.scrollTo($(id), speed, 0);
			});
		} else {
			helpers.scrollTo($(id), speed, 0);
		}
	});
};

const destroy = () => {
	helpers.$document.off('.anchor');
};

export default {
	init,
	destroy,
};
