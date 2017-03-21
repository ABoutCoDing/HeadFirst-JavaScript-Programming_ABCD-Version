var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
}

/* 373 page */
//view.displayMiss("00");
//view.displayHit("34");
//view.displayMiss("55");
//view.displayHit("12");
//view.displayMiss("25");
//view.displayHit("26");


/* 376 page */
//var ship1 = {locations: ["10", "20", "30"], hits: ["", "", ""] };
//var ship2 = {locations: ["32", "33", "34"], hits: ["", "", ""] };
//var ship3 = {locations: ["63", "64", "65"], hits: ["", "", "hit"] };
//
//var ships = [{locations: ["10", "20", "30"], hits: ["", "", ""] },
//              {locations: ["32", "33", "34"], hits: ["", "", ""] },
//              {locations: ["63", "64", "65"], hits: ["", "", "hit"] }];

/* 379 page */
var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [
          { locations: ["06", "16", "26"], hits: ["", "", ""] },
          { locations: ["24", "34", "44"], hits: ["", "", ""] },
          { locations: ["10", "11", "12"], hits: ["", "", ""] }
        ],


  /* 407 page */
//  ships: [
//        { locations: [0, 0, 0], hits: ["", "", ""] },
//        { locations: [0, 0, 0], hits: ["", "", ""] },
//        { locations: [0, 0, 0], hits: ["", "", ""] }
//      ],

  /* 380 page */
  fire: function(guess) {
    for(var i = 0; i < this.numShips; i++){
      var ship = this.ships[i];

      locations = ship.locations;
      var index = locations.indexOf(guess);

//      var index = ship.locations.indexOf(guess);
      if ( index >= 0 ) {
        // 명중했습니다.

        /* 382 ~ 383 page */
        ship.hits[index] = "hit";

        /* 385 page */
        view.displayHit(guess);
        view.displayMessage("명중!");

        /* 384 page */
        if (this.isSunk(ship)) {
          view.displayMessage("전함이 격침되었습니다.!");
          this.shipsSunk++;
        }
        return true;
      }
    }

    view.displayMiss(guess);
    view.displayMessage("실패하였습니다.");
    return false;
  },

  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++ ) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },

  /* 402 page */
  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++ ){
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },

  /* 403 page */
  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if (direction === 1) {
      /* 404 page */
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    } else {
      /* 404 page */
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      col = Math.floor(Math.random() * this.boardSize);
    }

    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        /* 404 page */
        newShipLocations.push(row + "" + (col + i));
      } else {
        /* 404 page */
        newShipLocations.push((row + i) + "" + col);
      }
    }

    return newShipLocations;
  },

  collision: function (locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) {
          if (ship.locations.indexOf(locations[j]) >= 0) {
              return true;
          }
      }
    }
    return false;
  }
};

/* 386 page */
//model.fire("53");
//
//model.fire("06");
//model.fire("16");
//model.fire("26");
//
//model.fire("34");
//model.fire("24");
//model.fire("44");
//
//model.fire("12");
//model.fire("11");
//model.fire("10");

/* 390 page */
function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  if (guess === null || guess.length !== 2) {
    alert("입력이 올바르지 않습니다. 게임판의 무자와 숫자를 이용해 입력하세요!");
  } else {
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert("위칫값이 올바르지 않습니다.");
    } else if (row < 0 || row >= model.boardsize || column < 0 || column >= model.boardsize ) {
      alert("앗, 보드 바깥으로 벗어났어요!");
    } else {
      return row + column;
    }
  }
  return null;
}

/* 393 page */
var controller = {
  guesses: 0,

  processGuess: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);

      if ( hit && model.shipsSunk === model.numShips ) {
        view.displayMessage("여러분은 " + this.guesses + "번 추측해 전함을 모두 격침 시켰습니다.");
      }

    }
  }
}

/* 395 page */
//controller.processGuess("A0");
//
//controller.processGuess("A6");
//controller.processGuess("B6");
//controller.processGuess("C6");
//
//controller.processGuess("C4");
//controller.processGuess("D4");
//controller.processGuess("E4");
//
//controller.processGuess("B0");
//controller.processGuess("B1");
//controller.processGuess("B2");


/* 397 page */
function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;

  /* 399 page */
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

  /* 407 page */
  model.generateShipLocations();
}

function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;

  controller.processGuess(guess);

  guessInput.value = "";
}

window.onload = init;


/* 399 page */
function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}


