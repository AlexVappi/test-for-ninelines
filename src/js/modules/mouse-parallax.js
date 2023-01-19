import helpers from '../helpers';

export default class Parallax {
	constructor(el) {
		this.options = {
			speed: 500,
			reverse: false,
			perspective: false,
			root: document.documentElement,
		};

		this.el = el;
	}
	init() {
		if (this.el && !helpers.isMobile()) {
			this.body = document.querySelector('body');
			this.w = this.options.root.clientWidth;
			this.h = this.options.root.clientHeight;
			if (this.el.dataset.perspective) {
				this.options.perspective = true;
				this.el.style.perspective = 400;
				this.el.style.transformStyle = 'preserve-3d';
			}
			this.start();
		}
	}

	start() {
		this.body.addEventListener('mousemove', this);
	}

	stop() {
		this.body.removeEventListener('mousemove', this);
		this.elems.forEach((el) => {
			el.style.transform = '';
		});
	}

	moveHandler(e) {
		const x = (e.clientX - this.w / 2) * this.options.speed / 10000;
		const y = (e.clientY - this.h / 2) * this.options.speed / 10000;
		let transform = `translateX(${x}px) translateY(${y}px)`;
		if (this.options.perspective) {
			transform += `rotateY(${x}deg) rotateX(${0}deg)`;
		}
		this.el.style.transform = transform;
	}

	handleEvent(e) {
		if (e.type === 'mousemove') {
			this.moveHandler(e);
		}
	}
}
