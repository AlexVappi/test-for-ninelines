import helpers from '../helpers';

class Popup {
	constructor() {
		this.$popup = null;
		this.init();
	}

	init() {
		const btns = document.querySelectorAll('[data-popup]');
		if (btns.length) {
			btns.forEach((btn) => {
				btn.addEventListener('click', (e) => {
					e.stopPropagation();
					const id = e.currentTarget.dataset.popup;
					this.open(id);
				});
			});
		}
		const closeEls = document.querySelectorAll('.js-popup-close');
		if (closeEls.length) {
			closeEls.forEach((btn) => {
				btn.addEventListener('click', () => {
					this.close();
				});
			});
		}

		const bodyEls = document.querySelectorAll('.popup__body');
		if (bodyEls.length) {
			bodyEls.forEach((body) => {
				body.addEventListener('click', (e) => {
					e.stopPropagation();
				});
			});
		}
		helpers.$document.on('click', () => {
			if (this.$popup && this.$popup.hasClass('is-active')) {
				this.close();
			}
		});
	}

	open(id) {
		this.$popup = $(id);
		if (!this.$popup) {
			return false;
		}
		helpers.lockScroll(true, this.$popup);
		this.$popup.addClass('is-active');
		setImmediate(() => {
			helpers.$body.css('padding-right', `${helpers.getScrollbarWidth()}px`);
			helpers.$header.css('right', `${helpers.getScrollbarWidth()}px`);
		});
		this.$popup.fadeIn(300);

		return true;
	}

	close() {
		if (!this.$popup.hasClass('is-active')) {
			return false;
		}
		helpers.lockScroll(false, this.$popup);
		this.$popup.removeClass('is-active');
		this.$popup.fadeOut(300);
		helpers.$body.css('padding-right', '');
		helpers.$header.css('right', '');

		return true;
	}
}

export default Popup;
