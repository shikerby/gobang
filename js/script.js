var me = true;
var chessBoard = [];
var over = false;

//win arr
var count = 0;
var wins = [];

var myWin = [];
var computerWin = [];


for(var i=0; i<15; i++)
{
	wins[i] = [];
	for(var j=0; j<15; j++)
	{
		wins[i][j] = [];
	}
}
//横线赢法
for(var i=0; i<15; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//竖线赢法
for(var i=0; i<15; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
//斜线赢法
for(var i=0; i<11; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//反斜线赢法
for(var i=0; i<11; i++){
	for(var j=14; j>3; j--){
		for(var k=0; k<5; k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

console.log(count);
for(var i=0; i<count; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}


for(var i=0; i<15; i++)
{
	chessBoard[i] = [];
	for(var j=0; j<15; j++){
		chessBoard[i][j] = 0;
	}
}
var chess = document.getElementById('chess');
var ctx = chess.getContext('2d');

// ctx.moveTo(0,0);
// ctx.lineTo(450,450);
// ctx.stroke();

ctx.strokeStyle = "#BFBFBF";
drawChessBoard();
// oneStep(0, 1, true);
// oneStep(1, 1, false);
// oneStep(1, 2, true);
// oneStep(2, 2, false);


function drawChessBoard(){

	for(var i=0; i<15; i++)
	{
		ctx.moveTo(15 + i*30, 15);
		ctx.lineTo(15 + i*30, 435);
		ctx.stroke();

		ctx.moveTo(15, 15 + i*30);
		ctx.lineTo(435, 15 + i*30);
		ctx.stroke();
	}

}

function oneStep(i, j, me){
	
	ctx.beginPath();
	ctx.arc(15 + i*30, 15 + j*30, 14, 0, 2*Math.PI);
	ctx.closePath();
	var gradient = ctx.createRadialGradient(15 + i*30, 15 + j*30 - 2, 14, 15 + i*30, 15 + j*30 - 2, 0);
	if(me){
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	} else{
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}
	ctx.fillStyle = gradient;
	ctx.fill();

}


chess.onclick = function(e) {

	if(over){
		return;
	}
	if(!me){
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;

	var i = Math.floor( x / 30);
	var j = Math.floor( y / 30);

	if(chessBoard[i][j] == 0){

		oneStep(i, j, me);
		chessBoard[i][j] = 1;

		for(var k=0; k<count; k++)
		{
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k] = 6;
				if(myWin[k] == 5){
					window.alert("你赢了！");
					over = true;
				}
			}
		}

		if(!over){
			me = !me;
			computerAI();
		}
	}

}



























function computerAI(){
	var myScore = [];
	var computerScore = [];

	var max = 0;
	var u = 0;
	var v = 0;

	for(var i=0; i<15; i++)
	{
		myScore[i] = [];
		computerScore[i] = [];

		for(var j=0; j<15; j++)
		{
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}

	for(var i=0; i<15; i++)
	{
		for(var j=0; j<15; j++)
		{
			if(chessBoard[i][j] == 0){
				for(var k=0; k<count; k++){
					if(wins[i][j][k]){
						if(myWin[k] == 1){
							myScore[i][j] += 200;
						}else if(myWin[k] == 2){
							myScore[i][j] += 400;
						}else if(myWin[k] == 3){
							myScore[i][j] +=2000;
						}else if(myWin[k] == 4){
							myScore[i][j] += 10000;
						}

						if(computerWin[k] == 1){
							computerScore[i][j] += 220;
						}else if(computerWin[k] == 2){
							computerScore[i][j] += 420;
						}else if(computerWin[k] == 3){
							computerScore[i][j] +=2200;
						}else if(computerWin[k] == 4){
							computerScore[i][j] += 20000;
						}
					}
				}

				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				}else if(myScore[i][j] == max){
					if(computerScore[i][j] > myScore[u][v]){
						u = i;
						v = j;
					}
				}

				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if(computerScore[i][j] == max){
					if(myScore[i][j] > computerScore[u][v]){
						u = i;
						v = j;
					}
				}
			}
		}
	}

	oneStep(u, v, false);
	chessBoard[u][v] = 2;

	for(var k=0; k<count; k++)
	{
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k] = 6;
			if(computerWin[k] == 5){
				window.alert("你真笨！");
				over = true;
			}
		}
	}

	if(!over){
		me = !me;
	}

}

