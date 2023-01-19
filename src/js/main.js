import './vendor';
import './helpers';
import './components/social';
import './modules/observed';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import scrollToAnchor from './modules/scrollToAnchor';
import Popup from './components/popup';
import backToTop from './modules/backToTop';
import Preloader from './components/preloader';
import Parallax from './modules/mouse-parallax';

const preloader = new Preloader();
preloader.init();

ieFix();
vhFix();
actualYear();
scrollToAnchor.init();

header.init();
lazyLoading.init();
backToTop.init();

const popup = new Popup();
popup.init();

const parallaxEls = document.querySelectorAll('[data-m-parallax]');
if (parallaxEls.length) {
	parallaxEls.forEach((el) => {
		const parallax = new Parallax(el);
		parallax.init();
	});
}
