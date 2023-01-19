import Share from 'ninelines-sharing';
import helpers from '../helpers';

const changeShareDataTrigger = document.querySelector('.js-share-change-btn');
const titleShareInput = document.querySelector('.js-input-share-title');
const descShareInput = document.querySelector('.js-input-share-description');

if (changeShareDataTrigger) {
	changeShareDataTrigger.addEventListener('click', () => {
		const title = titleShareInput.value;
		const desc = descShareInput.value;
		if (title) {
			helpers.share.setTitle(title);
		}
		if (desc) {
			helpers.share.setDescription(desc);
		}
	});
}
if (document.querySelector('[data-social]')) {
	const list = document.querySelectorAll('[data-social]');

	Array.prototype.forEach.call(list, (item) => {
		item.addEventListener('click', (e) => {
			const social = e.currentTarget.dataset.social;
			const url = location.origin + location.pathname;

			Share[social](url);
		});
	});
}
