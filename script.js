let speed = 10;
let lastPaintTime = 0;
let snakeArr = [{x:12,y:13}];
let food = {x:5,y:4};
let inputDir = {x:0,y:0};
let gameOverSound = new Audio("gameover.mp3");  
let score = 0;
let foodSound = new Audio("food.mp3");
let startMusic = new Audio("music.mp3");
let moveSound = new Audio("move.mp3");
let hscore = 0;

const main1 = (c) =>{
    window.requestAnimationFrame(main1);
    if((c - lastPaintTime)/1000 < 1/speed){
        return ;
    }
    lastPaintTime = c;
    gameEngine();
}

const isCollide = () =>{
    if(snakeArr[0].x == 19 || snakeArr[0].y == 19 || snakeArr[0].x ==0 || snakeArr[0].y ==0){ 
        return [true,1];
    }
    for(let i=1;i<=(snakeArr.length)-1;i++){
       if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
        return [true,2];
       } 
    }
    return false;
}


function gameEngine() {

document.getElementsByClassName("score")[0].innerHTML = "Score: " + score;
//logic after eating food
if(food.x === snakeArr[0].x && food.y === snakeArr[0].y){
    score+=1;
    document.getElementsByClassName("score")[0].innerHTML = "Score: " + score;
    if(score>JSON.parse(hiscore)){
        hiscore = score;
        localStorage.setItem("hiscore",JSON.stringify(hiscore));
    }
    foodSound.play();
    let a = 2;
    let b = 16;
    foodElement.classList.remove("food");
    mainboard.removeChild(foodElement)
    food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())};
    snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y+inputDir.y});

}

//moving the snake
for(let i=snakeArr.length-2;i>=0;i--){
    snakeArr[i+1] = {...snakeArr[i]};
    
}
snakeArr[0].x = snakeArr[0].x + inputDir.x;
snakeArr[0].y += inputDir.y;

//displaying snake and food
mainboard.innerHTML = "";
snakeArr.forEach((e,i) => {
    
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(i===0){
       snakeElement.classList.add("snake");
    }
    else{
    snakeElement.classList.add("sbody");
    }
    mainboard.appendChild(snakeElement);
   });
   
   foodElement = document.createElement("div");
   foodElement.style.gridColumnStart = food.x;
   foodElement.style.gridRowStart = food.y;
   foodElement.classList.add('food');
   mainboard.appendChild(foodElement);

cond = isCollide();
if(cond[0]){
        gameOverSound.play();
        startMusic.pause(); 
        if(cond[1] === 1){
            alert("Ahh, you crossed the boundary! Better luck next time!");
        }
        else{
            alert("Ahh, you bit yourself! Make sure you don't become an enemy of yourself the next time!");
        }       
        inputDir = {x:0,y:0};
        food = {x:5,y:4};
        snakeArr = [{x:12,y:13}];
        score = 0;
} 
startMusic.play();

}

if(score%2 == 0){
    console.log(speed);
    speed+=1;
}

let hiscore = localStorage.getItem("hiscore");
console.log(hiscore);
if(hiscore === null){
    localStorage.setItem("hiscore","0");
}
else{
    hiscoreval = JSON.parse(hiscore);
    console.log(hiscoreval);
    document.getElementById("hscore").innerHTML = "Hi Score: " + hiscoreval;
}

window.requestAnimationFrame(main1);
window.addEventListener('keydown',(e)=>{
    
    switch(e.key){
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;           
            break;
        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;           
            break;
        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;

    }
});

