new WOW().init();

let gameStarted = false;
const soundBackgroundMusic = new Audio('sounds/backgroundMusic.mp3'),
	wrongAnswerSound = new Audio('sounds/wrong_answer.mp3'),
	correctAnswerSound = new Audio('sounds/correct_answer.mp3'),
	soundsArray = [ correctAnswerSound, wrongAnswerSound, soundBackgroundMusic ];

const instruction = document.querySelector('.popup-num1'),
	instructionCloseBtn = document.querySelector('.popup-num1 button'),
	showPopupBtn = document.querySelectorAll('.show-popup'),
	closePopupBtn = document.querySelectorAll('.close-btn'),
	cancelPopup = document.querySelectorAll('.cancel'),
	popup = document.querySelectorAll('.popup'),
	innerPopup = document.querySelectorAll('.inner-popup'),
	finishedGame = document.querySelector('.finished-game'),
	restartGame = document.querySelector('.restart-game'),
	gameSent = document.querySelector('.sent-game'),
	sendTask = document.querySelector('.send-task'),
	container = document.querySelector('.container'),
	soundIcon = document.querySelector('.sound-icon'),
	soundSlider = document.querySelector('.icons-top .slider'),
	question = document.querySelector('.question');

const hook = document.querySelector('.hook'),
	allFishs = document.querySelectorAll('.fish'),
	questionArrows = question.querySelectorAll('.arrow'),
	stars = document.querySelector('.stars');

/* Start Popup */
instruction.style.display = 'block';

showPopupBtn.forEach(function(showPopupBtn) {
	showPopupBtn.addEventListener('click', (e) => {
		let thisPopup = showPopupBtn.getAttribute('data-popup-num');
		thisPopup = document.querySelector(`${thisPopup}`);
		thisPopup.style.display = 'block';
		e.preventDefault();
	});
});

popup.forEach(function(popUp) {
	popUp.addEventListener('click', () => {
		popUp.style.display = 'none';
		startMusicAndFuncs();
	});
});

closePopupBtn.forEach(function(closeBtn) {
	closeBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.path[2].style.display = 'none';
		startMusicAndFuncs();
	});
});

cancelPopup.forEach(function(closeBtn) {
	closeBtn.addEventListener('click', (e) => {
		console.log(e);
		e.preventDefault();
		e.path[3].style.display = 'none';
		startMusicAndFuncs();
	});
});

innerPopup.forEach(function(inner) {
	inner.addEventListener('click', (e) => {
		e.stopPropagation();
	});
});

document.addEventListener('keydown', (e) => {
	if (e.keyCode == 27) {
		popup.forEach((popUp) => {
			popUp.style.display = '';
			startMusicAndFuncs();
		});
	}
});

sendTask.addEventListener('click', () => {
	gameSent.style.display = 'block';
});

function startMusicAndFuncs() {
	if (gameStarted == false) {
		soundBackgroundMusic.currentTime = 0;
		soundBackgroundMusic.play();
		soundBackgroundMusic.loop = true;
		gameStarted = true;
	}
}

/* End Popup */
/*****************************************************************/
const QUESTIONS = [
	{
		questionPart1: 'Madrid is the ',
		questionPart2: ' of spain.',
		trueAnswer: 'Capital',
		a: 'Village',
		b: 'Neighborhood',
		c: 'School',
		d: 'Capital',
		e: 'Car'
	},
	{
		questionPart1: 'The ',
		questionPart2: ' is the color of bannana.',
		trueAnswer: 'Yellow',
		a: 'Red',
		b: 'Green',
		c: 'Yellow',
		d: 'Pink',
		e: 'Black'
	},
	{
		questionPart1: 'I like to ',
		questionPart2: ' glass of milk.',
		trueAnswer: 'Drink',
		a: 'Watch',
		b: 'Eat',
		c: 'Drink',
		d: 'Drive',
		e: 'Break'
	},
	{
		questionPart1: 'One minute is equal to 60',
		questionPart2: '.',
		trueAnswer: 'Seconds',
		a: 'Seconds',
		b: 'Miliseconds',
		c: 'Hour',
		d: 'Day',
		e: 'Month'
	},
	{
		questionPart1: 'The spring is the first season of the ',
		questionPart2: '.',
		trueAnswer: 'Year',
		a: 'Day',
		b: 'Year',
		c: 'Week',
		d: 'Hour',
		e: 'Kilometer'
	}
];

let isExam = window.location.href.includes('isExam=true');
console.log(isExam);
let userAnswers = [];

if (!isExam) {
	questionArrows.forEach((arrow) => {
		arrow.style.display = 'none';
	});
} else {
	for (let i = 0; i < QUESTIONS.length; i++) {
		userAnswers[i] = '';
	}
}

let questNum = 0,
	question_arr = [];
function loadQuestion(questNum) {
	//
	document.querySelector('.quest-num').innerHTML = `${questNum + 1} / ${QUESTIONS.length}`;

	returnAllFishs();
	question_arr = [];
	let i = 3; //Answers Starts At this position

	// Get Question And Answers => Insert Into Array
	for (var prop in QUESTIONS[questNum]) {
		question_arr.push(QUESTIONS[questNum][prop]);
	}

	question.querySelector('h2').innerHTML = `${question_arr[0]} <span class="missing-word"></span> ${question_arr[1]}`;

	allFishs.forEach((fish) => {
		fish.querySelector('span').innerHTML = question_arr[i++];
	});

	//
	if (isExam) {
		question.querySelector('.missing-word').textContent = userAnswers[questNum];
	}
}
loadQuestion(questNum);

questionArrows.forEach((arrow) => {
	arrow.addEventListener('click', () => {
		if (arrow.classList.contains('arrow-right')) {
			questNum++;
			loadQuestion(questNum);
		} else {
			questNum--;
			loadQuestion(questNum);
		}

		if (questNum + 1 == QUESTIONS.length) {
			document.querySelector('.arrow-right').classList.add('disabled');
		} else {
			document.querySelector('.arrow-right').classList.remove('disabled');
		}

		if (questNum == 0) {
			document.querySelector('.arrow-left').classList.add('disabled');
		} else {
			document.querySelector('.arrow-left').classList.remove('disabled');
		}
	});
});

allFishs.forEach((fish) => {
	const randDirection = Math.floor(Math.random() * 2) + 1;

	if (randDirection == 1) {
		// Fish Go To Left
		fish.classList.add('fishToLeft');
	}
	if (randDirection == 2) {
		// Fish Go To Left
		fish.classList.add('fishToRight');
	}

	fish.addEventListener('click', (e) => {
		returnAllFishs();
		question.classList.remove('wow', 'animated', 'shake');
		hook.style.left = fish.offsetLeft + 'px';
		hook.style.top = fish.offsetTop - 350 + 'px';
		fish.style.webkitAnimationPlayState = 'paused';
		allFishs.forEach((fish) => {
			fish.classList.add('disable-click');
		});

		setTimeout(() => {
			fish.classList.add('fish-took');
			hook.classList.add('hook-up');
		}, 100);

		setTimeout(() => {
			question.querySelector('.missing-word').textContent = fish.querySelector('span').textContent;
			allFishs.forEach((fish) => {
				fish.classList.remove('disable-click');
			});
			hook.classList.remove('hook-up');
			hook.style.top = '-450px';

			if (!isExam) {
				checkAnswer();
			} else {
				userAnswers[questNum] = question.querySelector('.missing-word').textContent;
			}
		}, 2000);
	});
});

function returnAllFishs() {
	allFishs.forEach((fish) => {
		fish.classList.remove('disable-click', 'fish-took');
		fish.style.webkitAnimationPlayState = 'running';
	});
}

//check answer
function checkAnswer() {
	const missingWord = question.querySelector('.missing-word').textContent;

	if (missingWord == question_arr[2]) {
		stars.classList.add('wow', 'animated', 'zoomInUp');
		stars.style.display = 'flex';
		correctAnswerSound.play();
		nextLevel();
	} else {
		wrongAnswerSound.play();
		question.classList.add('wow', 'animated', 'shake');
	}
}

function nextLevel() {
	if (`${questNum + 1}` < `${QUESTIONS.length}`) {
		setTimeout(() => {
			stars.style.display = 'none';
			loadQuestion(++questNum);
		}, 3000);
	} else {
		setTimeout(() => {
			finishedGame.style.display = 'block';
			restartGame.style.display = 'block';
		}, 3000);
	}
}
/**************************************************************/
// Handle With Volume Slider
let volumeVal;
soundSlider.addEventListener('input', () => {
	volumeVal = soundSlider.value;
	volumeVal = volumeVal / 100;

	for (let i = 0; i < soundsArray.length; i++) {
		soundsArray[i].volume = volumeVal;
	}

	if (volumeVal == 0) {
		soundIcon.classList.add('fa-volume-mute');
		soundIcon.classList.remove('fa-volume-up');
		turnSoundsOff();
	} else {
		soundIcon.classList.remove('fa-volume-mute');
		soundIcon.classList.add('fa-volume-up');
		turnSoundsOn();
	}
});

// Mute/UnMute Sounds
soundIcon.addEventListener('click', () => {
	if (volumeVal != 0) {
		soundIcon.classList.toggle('fa-volume-up');
		soundIcon.classList.toggle('fa-volume-mute');
	}

	if (soundIcon.classList.contains('fa-volume-mute')) {
		turnSoundsOff();
	} else {
		turnSoundsOn();
	}
});

function turnSoundsOff() {
	for (let s = 0; s < soundsArray.length; s++) {
		soundsArray[s].muted = true;
	}
}

function turnSoundsOn() {
	for (let s = 0; s < soundsArray.length; s++) {
		soundsArray[s].muted = false;
	}
}
