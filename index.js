const score=document.querySelector('.score');
const startScreen=document.querySelector('.startScreen')
const gameArea=document.querySelector('.gameArea')
const carEnemy=document.querySelector('.carEnemy')
const leftButton=document.querySelector('.left')
const rightButton=document.querySelector('.right')
const upButton=document.querySelector('.up')
const downButton=document.querySelector('.down')

const carBgm=new Audio('./media/carbgm.mp3')
const carAccident=new Audio('./media/caraccident.mp3')


document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)
startScreen.addEventListener('click',start)

let keys={ArrowUp:false , ArrowDown: false, ArrowLeft:false, ArrowRight:false}

var player={ speed:1,score:0 }
pressduration=0


function keyDown(e){
    e.preventDefault();
    keys[e.key]=true
    // console.log(e)
    // console.log(keys)
}

function keyUp(e){
    e.preventDefault();
    keys[e.key]=false
    // console.log(e.key)
}

function start(){
    // gameArea.classList.remove('hide')
    carBgm.currentTime=0
    carBgm.play()
    carBgm.reset
    gameArea.innerHTML="";
    startScreen.classList.add('hide')
    score.classList.remove('hide')
    player.start=true
    player.score=0;
    window.requestAnimationFrame(gamePlay)

    for(x=0; x<6 ; x++){
            let roadLine=document.createElement('div')
            roadLine.setAttribute('class','lines')
            gameArea.appendChild(roadLine)
            roadLine.y=(x*150)
            roadLine.style.top=roadLine.y+'px'
    }

    let car=document.createElement('div')
    car.setAttribute('class','car');
    gameArea.appendChild(car)

    player.x=car.offsetLeft;
    player.y=car.offsetTop;

    // console.log("Left Position " + player.x)

    for(x=0; x<4 ; x++){

        let folderPath='./media/'
        var images=['truck1.png','truck2.png','car2.png','car3.png','car4.png']
        let randomIndex=Math.floor(Math.random()*images.length)
        let imagePath=folderPath+images[randomIndex]

        let enemyCar=document.createElement('div')
        enemyCar.setAttribute('class','enemy')
        enemyCar.style.backgroundImage="url('"+imagePath+"')";
        enemyCar.style.left=Math.floor(Math.random()*379) +"px"
        gameArea.appendChild(enemyCar)
        enemyCar.y=((x+1)*350)*-1;
        enemyCar.style.top=enemyCar.y+'px'
}
}



function isCollide(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect()
    return!((aRect.bottom<bRect.top+10)||(aRect.top>bRect.bottom-10)||(aRect.right<bRect.left+10)||(aRect.left>bRect.right-10))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines')
    lines.forEach(function(item){

        if(item.y>=750){
            item.y-=800
        }

        item.y += player.speed
        item.style.top=item.y + "px"
    })
}

function endGame(){
    carBgm.pause()
    player.start=false
    startScreen.classList.remove('hide')
    startScreen.innerHTML="Game Over <br> Your final score is : "+ (player.score+1)+
    "<br> Press here to restart the Game";
    player.speed=2
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy')
    enemy.forEach(function(item){

        if(isCollide(car,item)){
            console.log("Boom")
            carAccident.play()
            endGame();
        }

        if(item.y>=750){
            item.y=-200
            item.style.left=Math.floor(Math.random()*350) +"px"
        }

        item.y += player.speed
        item.style.top=item.y + "px"
    })
}

function gamePlay(){
    let car = document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();

    if(player.start){

        moveLines()
        moveEnemy(car)

        if(keys.ArrowUp && player.y>(road.top + 70) ){ player.y-= player.speed }
        if(keys.ArrowDown && player.y<(road.bottom - 70) ){ player.y+= player.speed }
        if(keys.ArrowLeft && player.x>0){ player.x-= player.speed }
        if(keys.ArrowRight && player.x<(road.width - 50) ){ player.x+= player.speed }

        car.style.top=player.y + "px"
        car.style.left=player.x + "px"

     window.requestAnimationFrame(gamePlay)

     player.score++;
     score.innerText="Score: " +player.score;

     if((player.score%100)==0){
         player.speed+=0.5
         console.log(player.speed)
     }
    }
}



leftButton.addEventListener('touchstart',function(){
    leftTime=setInterval(onLeftPress,100);
    if(player.x>0 ){
        player.x-=player.speed+10
        }
})

leftButton.addEventListener('touchend',function(){
    clearInterval(leftTime)
})

function onLeftPress(){
    pressduration+=100;
    if(player.x>0 ){
        if(pressduration>=1000){
        player.x-=player.speed+20
        }
        }
}


rightButton.addEventListener('touchstart',function(){
    let road=gameArea.getBoundingClientRect();
    rightTime=setInterval(onRightPress,100);
    if(player.x<(road.width - 70) ){
        player.x+=player.speed+10
        }
})

rightButton.addEventListener('touchend',function(){
    clearInterval(rightTime)
})

function onRightPress(){
    let road=gameArea.getBoundingClientRect();
    pressduration+=100;
    if(player.x<(road.width - 70) ){
        if(pressduration>=1000){
        player.x+=player.speed+20
        }
        }
}

upButton.addEventListener('touchstart',function(){
    let road=gameArea.getBoundingClientRect();
    upTime=setInterval(onUpPress,100);
    if(player.y>(road.top + 70) ){
        player.y-=player.speed+10
        }
})

upButton.addEventListener('touchend',function(){
    clearInterval(upTime)
})
function onUpPress(){
    let road=gameArea.getBoundingClientRect();
    pressduration+=100;
    if(player.y>(road.top + 70)){
        if(pressduration>=1000){
        player.y-=player.speed+20
        }
        }
}

downButton.addEventListener('touchstart',function(){
    let road=gameArea.getBoundingClientRect();
    downTime=setInterval(onDownPress,100);
    if(player.y<(road.bottom - 70) ){
    player.y+=player.speed+10
    }
})

downButton.addEventListener('touchend',function(){
    clearInterval(downTime)
})
function onDownPress(){
    let road=gameArea.getBoundingClientRect();
    pressduration+=100;
    if(player.y<(road.bottom - 70)){
        if(pressduration>=1000){
        player.y+=player.speed+20
        }
        }
}
