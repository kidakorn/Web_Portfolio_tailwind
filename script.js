const scrollAmount = 300;

const setupScroll = (containerId, leftArrowId, rightArrowId) => {
	const container = document.getElementById(containerId);
	const leftArrow = document.getElementById(leftArrowId);
	const rightArrow = document.getElementById(rightArrowId);

	rightArrow.addEventListener('click', () => {
		container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	});

	leftArrow.addEventListener('click', () => {
		container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
	});
};

setupScroll('cardContainer', 'leftArrow', 'rightArrow');
setupScroll('cardContainer-tools', 'leftArrow-tools', 'rightArrow-tools');


document.getElementById('menu-btn').addEventListener('click', function () {
	const menu = document.getElementById('mobile-menu');
	menu.classList.toggle('hidden');
});