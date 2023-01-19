import helpers from '../helpers';

class Preloader {
	constructor() {
		this.images = [
			'head.png', 'header-fig.png', 'fig-1.png', 'fig-2.png', 'dude.png', 'heart.png', 'heart@2x.png',
		];
		this.minSpeed = 0.09;
		this.speed = this.minSpeed;
		this.uploadedImages = 0;
		this.position = 0;
		this.$preloader = $('.preloader');
		this.picture = document.querySelector('.preloader__picture');
		this.pictureWidth = this.picture.clientWidth;
		helpers.lockScroll(true, this.$preloader);
	}

	init() {
		this.animate();
		const image = new Image();
		image.onload = () => {
			this.uploadAll();
		};
		image.src = './images/rocket.png';
	}

	uploadAll() {
		if (!this.images.length) {
			return false;
		}

		this.images.forEach((name) => {
			const image = new Image();
			image.onload = () => {
				this.speed = this.minSpeed * (++this.uploadedImages * 2);
			};
			image.src = `./images/${name}`;
		});

		return true;
	}
	animate() {
		this.position += this.speed;
		this.picture.style.transform = `translate(${this.position * helpers.ratio}px, -${this.position}px)`;
		if (this.position * helpers.ratio > helpers.winWidth + 2 * this.pictureWidth) {
			cancelAnimationFrame(this.rAF);
			this.done();
		} else {
			this.rAF = requestAnimationFrame(this.animate.bind(this));
		}
	}

	done() {
		this.$preloader.fadeOut(500);
		setTimeout(() => {
			helpers.lockScroll(false, $('.preloader'));
			helpers.$body.addClass('loaded');
		}, 500);
	}
}

export default Preloader;
