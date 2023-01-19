const watch = (target) => {
	let observed = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-active');
			} else if (entry.boundingClientRect.y > 0) {
				entry.target.classList.remove('is-active');
			}
		});
	}, {
		threshold: 0.1,
	});
	observed.observe(target);
};

const watcherEls = document.querySelectorAll('.show-observed');
if (watcherEls.length) {
	watcherEls.forEach((el) => {
		watch(el);
	});
}
