const score1 = document.getElementById("score");
const allCards = document.querySelectorAll(".card");

let firstCard = null,
	secondCard = null;

let canClick = true;

let score = 0;

allCards.forEach((card) => {
	card.addEventListener("click", handleCardClicked);
});

// handle clicking on a card
function handleCardClicked() {
	if (!canClick) return;

	// prevent card double click
	if (this.classList.contains("flip")) return;

	this.classList.add("flip");

	if (!firstCard) firstCard = this;
	else if (!secondCard) secondCard = this;

	let img1 = firstCard ? firstCard.firstElementChild.src : null;
	let img2 = secondCard ? secondCard.firstElementChild.src : null;

	// handle matching condition
	if (img1 === img2) {
		console.log("Matching....");
		firstCard = null;
		secondCard = null;

		score++;
		score1.innerHTML = `Your Score is ${score} / 12`;
		if (score === 12) handleGameOver();
	}
	// handle non-matching condition
	else if (img1 && img2) {
		canClick = false;

		setTimeout(() => {
			firstCard.classList.remove("flip");
			secondCard.classList.remove("flip");
			firstCard = null;
			secondCard = null;
			canClick = true;
		}, 1000);
	}
}

function handleGameOver() {
	setTimeout(() => {
		let retVal = confirm("You Win 😍😍\nPlay Again ???");
		if (retVal === true) {
			location.reload();
		}
	}, 1000);
}

//  Shuffle Cards
allCards.forEach((card) => {
	let randPos = Math.floor(Math.random() * 24);
	card.style.order = randPos;
});
