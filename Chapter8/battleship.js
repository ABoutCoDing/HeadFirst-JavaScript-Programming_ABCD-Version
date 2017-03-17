var view = {
	// 메시지 출력
  displayMessage: function (msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },

  // 명중 표시
  displayHit: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  // 불발 표시
  displayMiss: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,

	// 배들 3척
	// ships: [
	// 	{ locations: ["06", "16", "26"], hits: ["","",""]},
	// 	{ locations: ["24", "34", "44"], hits: ["","",""]},
	// 	{ locations: ["10", "11", "12"], hits: ["","",""]},
	// ],
	ships: [
		{ locations: [0, 0, 0], hits: ["","",""]},
		{ locations: [0, 0, 0], hits: ["","",""]},
		{ locations: [0, 0, 0], hits: ["","",""]},
	],

	// 발사
	fire: function (guess) {
		// 배의 수만큼 반복
		for (var i=0; i<this.numShips; i++) {
			var ship = this.ships[i];
			locations = ship.locations;

			// 배의 길이만큼 반복
			for (var j=0; j<this.shipLength; j++) {
				var index = locations.indexOf(guess);
				if (index >= 0) {
					ship.hits[index] = "hit";
					view.displayHit(guess);
					view.displayMessage("명중!");

					if (this.isSunk(ship)) {
						view.displayMessage("전함이 격침되었습니다.");
						this.shipsSunk++;
					}
					return true;
				}
			}
		}

		view.displayMiss(guess);
		view.displayMessage("실패했습니다.");
		return false;
	},

	// 침몰인가?
	isSunk: function (ship) {
		for (var i=0; i<this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},

	// 배 3척을 생성
	generateShipLocations : function () {
		var locations;
		for (var i=0; i<this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},

	// 배 1척의 위치를 생성
	generateShip: function () {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) {
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else {
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i=0; i<this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}

		return newShipLocations;
	},

	// 배의 위치가 충돌하는지 검사
	collision: function (locations) {
		for (var i=0; i<this.numShips; i++) {
			var ship = model.ships[i];
			for (var j=0; j<locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >=0) {
					return true;
				}
			}
		}
		return false;
	},
};

var controller = {
	guesses: 0,

	// 게이머가 추측한 값을 처리
	parseGuess: function (guess) {
		var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

		if (guess === null || guess.length !== 2) {
			alert("입력이 올바르지 않습니다. 게임판의 문자와 숫자를 이용해 입력하세요!");
		} else {
			firstChar = guess.charAt(0);
			// 영문자를 숫자로 변환
			var row = alphabet.indexOf(firstChar);
			var column = guess.charAt(1);

			// 올바른 값인지 검사
			if (isNaN(row) || isNaN(column)) {
				alert("위칫값이 올바르지 않습니다.");
			} else if (row < 0 || row >= model.boardSize ||
								column < 0 || column >= model.boardSize) {
				alert("앗, 보드 바깥으로 벗어났어요!");
			} else {
				// console.log(typeof row);
				// console.log(typeof column);
				return row + column;
			}
		}
		return null;
	},

	// 사용자 입력값 처리
	processGuess: function (guess) {
		var location = this.parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);

			// 전체 배의 수와 침몰된 배의 수가 같으면 결과 메시지
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("여러분은 " + this.guesses + "번 추측해 전함을 모두 격침시켰습니다.");
			}
		}
	}
};

// 자바스크립트 초기화
function init () {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();

	// var table1 = document.getElementById("table1");
	// table1.onclick = handleMouseclick;
};

// 발사 버튼 처리
function handleFireButton () {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
};

// 입력창의 키 누름 처리
function handleKeyPress (e) {
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

// function handleMouseclick(e) {
// 	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

// 	var x = Math.floor(e.layerX / (670/7));
// 	var y = Math.floor(e.layerY / (675/7));
// 	console.log(alphabet[y],x);
// 	controller.processGuess(alphabet[y]+x);
// }

window.onload = init;
