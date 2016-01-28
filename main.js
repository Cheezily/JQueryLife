var board = [];
var width = 70;
var height = 50;
var cells = width * height;
var running = 0;
var delay = 30;

$(document).ready(function() {
	clearBoard();
	createBoard(board);
	activateBoard();
	initialSet();
	running = 1;
	runIt();
});

function clearBoard() {
	board = [];
	console.log(cells);
	for (var i = 0; i < (cells); i++) {
		board.push(0);
	}
};

function createBoard() {
	$('.container').empty();
	for (var i = 0; i < board.length; i++) {
		if (board[i] == 0) {
			var newCell = '<div class="cell" id=' + i + '></div>';
			$('.container').append(newCell);
		}
	}
};

function runGeneration() {

	var newBoard = [];
	for (var i = 0; i < (cells); i++) {
		newBoard.push(0);

		var check = cellCheck(i);
		if (board[i] == 1) {
			$('#' + i).addClass('old');
		} else {
			$('#' + i).removeClass('old');
		}

		//keeps the living cell alive if it has 2 or 3 living neighbors
		if (board[i] == 1 && (check == 3 || check == 2)) {
			newBoard[i] = 1;
		}
		//brings the dead cell to life if there are exactly 3 neighbors
		if (board[i] == 0 && check == 3) {
			newBoard[i] = 1;
		}
	}

	//check to see if all of the cells are dead.  Stops the run.
	for (var i = 0; i < cells; i++) {
		if (board[i] == 1) {break;}
		if (i == cells - 1) {
			//alert("They're all dead! Reseting.  :)");
      $('.reset').addClass('activeButton');
      setTimeout(function() {
        $('.reset').removeClass('activeButton');
      }, 400);
			running = 0;
			clearBoard();
			drawBoard(board);
			removeListeners();
			activateBoard();
		}
	}
	return newBoard;
};

function drawBoard(passedBoard) {
	var cells = width * height;
	//console.log("draw w: " + width + " h: " + height + " cells: " + cells);
	for (var i = 0; i < (cells); i++) {
		if (passedBoard[i] == 0) {
			$('#' + i).removeClass('alive');
			$('#' + i).removeClass('old');
		} else {
			$('#' + i).addClass('alive');
		}
	}
};

function activateBoard() {
	$('.cell').click(function() {
		var cellNum = $(this).attr('id');
		if (board[cellNum] == 0) {
			board[cellNum] = 1;
		} else {
			board[cellNum] = 0;
		}
		$(this).toggleClass('alive');
		console.log(cellNum);
	})

	$('.reset').click(function() {
		$('.stop').removeClass('activeButton');
		$('.reset').addClass('activeButton');
		setTimeout(function() {
			$('.reset').removeClass('activeButton');
		}, 700);	
		clearBoard();
		drawBoard(board);
		removeListeners();	
		activateBoard();
	});

	$('.run').click(function() {
		$('.stop').removeClass('activeButton');
		$('.reset').removeClass('activeButton');
		$('.run').addClass('activeButton');
		setTimeout(function() {
			$('.run').removeClass('activeButton');
		}, 700);
		//checkBoard();
		running = 1;
		runIt();
		removeListeners();	
		activateBoard();
	});

	$('.stop').click(function() {
		$('.stop').addClass('activeButton');
		running = 0;
		removeListeners();	
		activateBoard();
	});

	$('.50').click(function() {
		running = 0;
		width = 50;
		height = 30;
		cells = width * height;
		clearBoard();
		createBoard(board);
		$('.70').removeClass('activeButton');
		$('.100').removeClass('activeButton');
		$('.50').addClass('activeButton');
		$('.cell:nth-child(70n + 1)').css("clear", "none");
		$('.cell:nth-child(100n + 1)').css("clear", "none");
		$('.cell:nth-child(50n + 1)').css("clear", "both");
		$('.cell').css({"width":"12px","height":"12px"})
		$('.container').css({"width": "650px", "height": "390px"});
		removeListeners();	
		activateBoard();
		console.log("w: " + width + " h: " + height);
	});
	$('.70').click(function() {
		running = 0;
		width = 70;
		height = 50;
		cells = width * height;
		clearBoard();
		createBoard(board);
		$('.50').removeClass('activeButton');
		$('.100').removeClass('activeButton');
		$('.70').addClass('activeButton');
		$('.cell:nth-child(100n + 1)').css("clear", "none");
		$('.cell:nth-child(50n + 1)').css("clear", "none");
		$('.cell:nth-child(70n + 1)').css("clear", "both");
		$('.cell').css({"width":"11px","height":"11px"})
		$('.container').css({"width": "840px", "height": "600px"});
		removeListeners();		
		activateBoard();
		console.log("w: " + width + " h: " + height);
	});
	$('.100').click(function() {
		running = 0;
		width = 100;
		height = 80;
		cells = width * height;
		clearBoard();
		createBoard(board);
		$('.50').removeClass('activeButton');
		$('.70').removeClass('activeButton');
		$('.100').addClass('activeButton');
		$('.cell:nth-child(50n + 1)').css("clear", "none");
		$('.cell:nth-child(70n + 1)').css("clear", "none");
		$('.cell:nth-child(100n + 1)').css("clear", "both");
		$('.cell').css({"width":"8px","height":"8px"})
		$('.container').css({"width": "900", "height": "720"});
		removeListeners();
		activateBoard();
		console.log("w: " + width + " h: " + height);
	});
	$('.slow').click(function() {
		delay = 150;
		$('.medium').removeClass('activeButton');
		$('.fast').removeClass('activeButton');
		$('.slow').addClass('activeButton');
	});
	$('.medium').click(function() {
		delay = 60;
		$('.slow').removeClass('activeButton');
		$('.fast').removeClass('activeButton');
		$('.medium').addClass('activeButton');
	});
	$('.fast').click(function() {
		delay = 30;
		$('.slow').removeClass('activeButton');
		$('.medium').removeClass('activeButton');
		$('.fast').addClass('activeButton');
	});
};

function removeListeners() {
	$('.50').off();
	$('.70').off();
	$('.100').off();
	$('.run').off();
	$('.reset').off();
	$('.stop').off();
	$('.cell').off();
	$('.slow').off();
	$('.medium').off();
	$('.fast').off();
};

function runIt() {
	if (running == 1) {
		setTimeout(function() {
			console.log('yup');
			board = runGeneration();
			drawBoard(board);
			setTimeout(function() {runIt();},delay);
		},0);
	}
};

function checkBoard() {
	for (var i = 0; i < board.length; i++) {
		if (board[i] == 1) {console.log(i);}
	}
};

function cellCheck(i) {

	var count = 0;
	var borderCell = 0;
	//checks wrap-around for the top row going upward to the bottom
	if (i >= 0 && i <= (width - 1)) {
		borderCell = 1;
		var dif = width - i;
		//console.log('i:' + i + ' dif:' + dif + ' cell:' + (cells - dif));
		if (board[cells - dif] == 1) {
			count++;
			//console.log(status + ' 1 high center one for: ' + i + ' cell: ' + (cells - dif));
		}
		if (i != 0 && board[cells - dif - 1] == 1) {
			count++;
			//console.log(status + ' 1 high left one for: ' + i + ' cell: ' + (cells - dif - 1));
		}
		if (i != (width - 1) && board[cells - dif + 1] == 1) {
			count++;
			//console.log(status + ' 1 high right one for: ' + i + ' cell: ' + (cells - dif + 1));
		}
		//normal checks, not involving wrap-arounds
		if (i != 0 && board[i + width - 1] == 1) {
			count++;
			//console.log(status + ' 1 low left one for: ' + i + ' cell: ' + (i + width - 1));
		}
		if (board[i + width] == 1) {
			count++;
			//console.log(status + ' 1 low center one for: ' + i + ' cell: ' + (i + width));
		}
		if (i != (width - 1) && board[i + width + 1] == 1) {
			count++;
			//console.log(status + ' 1 low right one for: ' + i + ' cell: ' + (i + width + 1));
		}
		if (i != 0 && board[i - 1] == 1) {
			count++;
			//console.log(status + ' 1 left one for: ' + i + ' cell: ' + (i - 1));
		}
		if (i != (width - 1) && board[i + 1] == 1) {
			count++;
			//console.log(status + ' 1 right right one for: ' + i + ' cell: ' + (i + 1));
		}
	}
	//checks wrap-around for the bottom row going down to the top row
	if (i >= (cells - width) && i <= (cells - 1)) {
		borderCell = 1;
		var dif = i + width - cells;
		//console.log('i:' + i + ' dif:' + dif + ' cell:' + (cells - dif));
		if (board[dif] == 1) {
			count++;
			//console.log(status + ' 2 low center one for: ' + i + ' cell: ' + (cells - dif));
		}
		if (i != (cells - width) && board[dif - 1] == 1) {
			count++;
			//console.log(status + ' 2 low left one for: ' + i + ' cell: ' + (cells - dif - 1));
		}
		if (i != (cells - 1) && board[dif + 1] == 1) {
			count++;
			//console.log(status + ' 2 low right one for: ' + i + ' cell: ' + (cells - dif + 1));
		}
		//normal checks, not involving wrap-arounds
		if (i != (cells - width) && board[i - width - 1] == 1) {
			count++;
			//console.log(status + ' 2 high left for: ' + i + ' cell: ' + (i - width - 1));
		}
		if (board[i - width] == 1) {
			count++;
			//console.log(status + ' 2 high center for: ' + i + ' cell: ' + (i + width));
		}
		if (i != (cells - 1) && board[i - width + 1] == 1) {
			count++;
			//console.log(status + ' 2 high right for: ' + i + ' cell: ' + (i - width - 1));
		}
		if (i != (cells - width) && board[i - 1] == 1) {
			count++;
			//console.log(status + ' 2 left for: ' + i + ' cell: ' + (i - 1));
		}
		if (i != (cells - 1) && board[i + 1] == 1) {
			count++;
			//console.log(status + ' 2 right for: ' + i + ' cell: ' + (i + 1));
		}

	}
	//checks for cells on the right border (wraping around to left)
	if (((i + 1) % width) == 0) {
		borderCell = 1;

		//to the 'immediate right' with wrap-around
		if (board[i - width + 1] == 1) {
			count++;
			//console.log(status + ' 3 right for: ' + i + ' cell: ' + (i - width + 1));
		}
		//to the 'lower right' with wrap-around
		if (i != (cells - 1) && board[i + 1] == 1) {
			count++;
			//console.log(status + ' 3 lower right: ' + i + ' cell: ' + (i + 1));
		}
		//to the 'lower right' with wrap-around for the last cell
		if (i == (cells - 1) && board[0] == 1) {
			count++;
			//console.log(status + ' 3 lower right for last cell: ' + i + ' cell: 0');
		}
		//to the 'upper right' with wrap-around for all but the cell
		//in the upper right
		if (i > width && board[i - (2 * width) + 1] == 1) {
			count++;
			//console.log(status + ' 3 upper right: ' + i + ' cell: ' + (i - (2 * width) + 1));
		}
		//to the 'upper right' with wrap-around for the
		//cell in the upper right
		if (i == width - 1 && board[(cells - width)] == 1) {
			count++;
			//console.log(status + ' 3 highdiag one for upper right cell: ' + i + ' cell: ' + (cells + 1 - width));
		}

		//normal checks for normal cells that don't wrap around

		//checks for the cell directly above (non-wrapping)
		if (i != (width - 1) && i != (cells - 1) && board[i - width] == 1) {
			count++;
			//console.log(status + ' 3 center top for: ' + i + ' cell: ' + (i - width));
		}
		//checks for the cell directly below (non-wrapping)
		if (i != (cells - 1) && i != (width - 1) && board[i + width] == 1) {
			count++;
			//console.log(status + ' 3 center bottom for: ' + i + ' cell: ' + (i + width));
		}
		if (i != (cells - 1) && i != (width - 1) && board[i + width - 1] == 1) {
			count++;
			//console.log(status + ' 3 lower left: ' + i + ' cell: ' + (i + width - 1));
		}
		if (i != (cells - 1) && i != (width - 1) && board[i - 1] == 1) {
			count++;
			//console.log(status + ' 3 left: ' + i + ' cell: ' + (i - 1));
		}
		if (i != (width - 1) && i != (cells - 1) &&board[i - width - 1] == 1) {
			count++;
			//console.log(status + ' 3 upper left: ' + i + ' cell: ' + (i - width - 1));
		}
		if (i == (width - 1) && board[cells - width - 1] == 1) {
			count++;
			//console.log(status + ' 3 upper left for top left cell: ' + i + ' cell: ' + (i + width - 1));
		}

	}
	//checks for cells on the left border (wraping around to right)
	if (((i) % width) == 0 || i == 0) {
		borderCell = 1;

		//to the 'immediate left' with wrap-around
		if (board[i + width - 1] == 1) {
			count++;
			//console.log(status + ' 4 left one for: ' + i + ' cell: ' + (i + width - 1));
		}
		//to the 'lower left' with wrap-around for all but lowest left cell
		if (i != (cells - width) && board[i + (width * 2) - 1] == 1) {
			count++;
			//console.log(status + ' 4 lower left one for: ' + i + ' cell: ' + (i + (width * 2) - 1));
		}
		//to the 'lower right' with wrap-around for the low left cell
		if (i == (cells - width) && board[width - 1] == 1) {
			count++;
			//console.log(status + ' 4 low left one for lowest left cell: ' + i + ' cell: ' + (width - 1));
		}
		//to the 'upper left' with wrap-around for all but the cell
		//in the upper left
		if (i >= width && board[i - 1] == 1) {
			count++;
			//console.log(status + ' 4 highleft one for: ' + i + ' cell: ' + (i - 1));
		}
		//to the 'upper left' with wrap-around for the
		//cell in the upper left
		if (i == 0 && board[cells - 1] == 1) {
			count++;
			//console.log(status + ' 4 highleft one for upper left cell: ' + i + ' cell: ' + (cells - 1));
		}

		//normal checks for normal cells that don't wrap around

		//checks for the cell directly above (non-wrapping)
		if (i != (width + 1) && i != (cells - width) && board[i - width] == 1) {
			count++;
			//console.log(status + ' 4 center top for: ' + i + ' cell: ' + (i - width));
		}
		//checks for the cell directly below (non-wrapping) for all but cell 0
		//or the lower left cell
		if (i != (cells - width - 1) && i != 0 && board[i + width] == 1) {
			count++;
			//console.log(status + ' 4 center bottom for: ' + i + ' cell: ' + (i + width));
		}
		//checks for the cell to the upper right (non-wrapping) for all but cell 0
		//or the lower left cell
		if (i != 0 && i != (cells - width) && board[i - width + 1] == 1) {
			count++;
			//console.log(status + ' 4 upper right for: ' + i + ' cell: ' + (i - width + 1));
		}
		//checks for the cell to the immediate right (non-wrapping)
		if (i != 0 && i != (cells - width) && board[i + 1] == 1) {
			count++;
			//console.log(status + ' 4 right for: ' + i + ' cell: ' + (i + 1));
		}
		//checks for the cell to the lower right (non-wrapping) for all
		//but lower left cell and cell 0
		if (i != (cells - width + 1) && i != 0 && board[i + width + 1] == 1) {
			count++;
			//console.log(status + ' 4 lower right for: ' + i + ' cell: ' + (i + width + 1));
		}

	}

	if (borderCell == 0) {
		if (board[i - width] == 1) {
			count++;
			//console.log(status + ' non-border -- upper center for: ' + i);
		}
		if (board[i - width - 1] == 1) {
			count++;
			//console.log(status + ' non-border -- upper left for: ' + i);
		}
		if (board[i - width + 1] == 1) {
			count++;
			//console.log(status + ' non-border -- upper right for: ' + i);
		}
		if (board[i - 1] == 1) {
			count++;
			//console.log(status + ' non-border -- left for: ' + i);
		}
		if (board[i + 1] == 1) {
			count++;
			//console.log(status + ' non-border -- right for: ' + i);
		}
		if (board[i + width] == 1) {
			count++;
			//console.log(status + ' non-border -- lower center for: ' + i);
		}
		if (board[i + width - 1] == 1) {
			count++;
			//console.log(status + ' non-border -- lower left for: ' + i);
		}
		if (board[i + width + 1] == 1) {
			count++;
			//console.log(status + ' non-border -- lower right for: ' + i);
		}
	}
	return count;
};

function initialSet() {
	//this populates the board with the initial cells

var firstCells = [1120,1121,1122,1123,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1134,
  1135,1136,1137,1138,1139,1140,1141,1142,1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,
  1154,1155,1156,1157,1158,1159,1160,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,
  1172,1173,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1189,174,175,245,244];
  
  //var firstCells = [395,394,464,534,463];
	for (var i = 0; i < firstCells.length; i++) {
		board[firstCells[i]] = 1;
	}
	drawBoard(board);
};