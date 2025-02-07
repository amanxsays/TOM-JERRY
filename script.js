//Game Constants & variable
let inputDir={x:0,y:0};
const foodSound=new Audio('music/food.mp3');
const gameOverSound=new Audio('music/gameover.mp3');
const moveSound=new Audio('music/move.mp3');
const musicSound=new Audio('music/music.mp3');
let speed =5;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}//initial position of snake 
]
food={x:9,y:15}//it's not array as sankeArr because it's a static partical but the snake will increase its size
//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){//low the fps
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(sarr){
    //if eat your self
    for (let i = 1; i < sarr.length; i++) {
        if(sarr[i].x === sarr[0].x && sarr[i].y===sarr[0].y){
            return true;
        }
    }
    if(sarr[0].x>=18 || sarr[0].x<=0 || sarr[0].y>=18 || sarr[0].y<=0 ){
        return true;
    }
        

}

function gameEngine(){
    //update the snake array and food
    if(isCollide(snakeArr)){
        musicSound.pause();
        gameOverSound.play();
        inputDir={x:0,y:0}; 
        alert("GAME OVER. PRESS ANY KEY TO PLAY AGAIN!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
        scoreBox.innerHTML="SCORE: "+score;
    }
    //if u have eaten the food increment the score and regenerate the food
    if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x){
        foodSound.play();
        score++;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            highScoreBox.innerHTML="HIGHSCORE: "+hiscoreval;
        }
        scoreBox.innerHTML="SCORE: "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y})//add at starting
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}//generate random bw a and b
    }

    //moving the snake
    for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1]={...snakeArr[i]}//derefence
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    //display snake
    board.innerHTML="";//clean
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');//body
        snakeElement.style.gridRowStart=e.y;//position
        snakeElement.style.gridColumnStart=e.x;//position
        if(index===0){
            musicSound.play();
            snakeElement.classList.add('head');
        } 
        else{
            snakeElement.classList.add('snake');//attach class so direct add the css through class
        }
        board.appendChild(snakeElement);
    })
    // display food
    foodElement=document.createElement('div');//head
    foodElement.style.gridRowStart=food.y;//position
    foodElement.style.gridColumnStart=food.x;//position
    foodElement.classList.add('food');//attach class so direct add the css through class
    board.appendChild(foodElement);
}



//Main Logic Starts here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    highScoreBox.innerHTML="HIGHSCORE: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir={x:0,y:1}//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir={x:0,y:-1};
            break;

        case "ArrowDown":
            inputDir={x:0,y:1};
            break;

        case "ArrowLeft":
            inputDir={x:-1,y:0};
            break;

        case "ArrowRight":
            inputDir={x:1,y:0};
            break;

        default:
            break;
    }
})