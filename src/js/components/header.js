import helpers from '../helpers';

function openMenu() {
	return new Promise((resolve) => {
		$('.js-burger').addClass('is-disabled').attr('disabled', true);

		helpers.lockScroll(true, helpers.$header.find('.header__menu'), 'header');

		helpers.$header.addClass('is-menu-opened');
		$('.header__menu').removeClass('is-hidden');

		setImmediate(() => {
			helpers.$body.css('padding-right', `${helpers.getScrollbarWidth()}px`);
			helpers.$header.css('right', `${helpers.getScrollbarWidth()}px`);
		});

		setTimeout(() => {
			$('.header__menu').addClass('is-active');
			$('.js-burger').removeClass('is-disabled').attr('disabled', false);

			resolve();
		}, 100);
	});
}

function closeMenu() {
	return new Promise((resolve) => {
		$('.js-burger').addClass('is-disabled').attr('disabled', true);

		helpers.lockScroll(false, helpers.$header.find('.header__menu'), 'header');
		helpers.$body.css('padding-right', '');
		helpers.$header.css('right', '');

		helpers.$header.removeClass('is-menu-opened');

		$('.header__menu').removeClass('is-active');

		setTimeout(() => {
			$('.header__menu').addClass('is-hidden');
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

function watchScroll() {
	const aboutOffset = document.getElementById('about').getBoundingClientRect().top + scrollY - 100;
	const skillsOffset = document.getElementById('skills').getBoundingClientRect().top + scrollY - 100;
	const homeLink = $('.header__link[href="#intro"]');
	const aboutLink = $('.header__link[href="#about"]');
	const skillsLink = $('.header__link[href="#skills"]');

	document.addEventListener('scroll', () => {
		const scroll = document.documentElement.scrollTop;
		if (scroll > 50) {
			helpers.$header.addClass('is-active');
		} else {
			helpers.$header.removeClass('is-active');
		}
		if (scroll < aboutOffset) {
			homeLink.addClass('is-active').siblings().removeClass('is-active');
		} else if (scroll < skillsOffset) {
			aboutLink.addClass('is-active').siblings().removeClass('is-active');
		} else {
			skillsLink.addClass('is-active').siblings().removeClass('is-active');
		}
	});
}

function init() {
	helpers.$header = $('.header');

	if (helpers.isMobile()) {
		$('.js-burger').on('click.header', toggleMenu);

		helpers.$document
			.on('click.header', (e) => {
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
	watchScroll();
}

function destroy() {
	$('.js-burger').off('.header');
	helpers.$document.off('.header');
}

export default {
	init,
	destroy,
	openMenu,
	closeMenu,
};
