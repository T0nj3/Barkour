const dog = document.querySelector('.dog');
let isJumping = false;

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    dog.style.transition = 'bottom 0.5s'; 
    dog.style.bottom = '200px'; 

    setTimeout(() => {
        dog.style.bottom = '80px'; 
        isJumping = false;
    }, 500); 
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = '100%'; 
    obstacle.style.width = '80px'; 
    document.querySelector('.game-container').appendChild(obstacle);

    const moveObstacle = setInterval(() => {
        const obstaclePosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
        
        if (obstaclePosition < -80) { 
            clearInterval(moveObstacle);
            obstacle.remove();
        } else {
            obstacle.style.left = obstaclePosition - 5 + 'px'; 
            obstacle.style.transform = 'rotate(' + (obstaclePosition - 100) + 'deg)'; 
            detectCollision(obstacle);
        }
    }, 20);
}

setInterval(createObstacle, 2500); 

function detectCollision(obstacle) {
    const dogRect = dog.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        dogRect.left < obstacleRect.right &&
        dogRect.right > obstacleRect.left &&
        dogRect.bottom > obstacleRect.top
    ) {
        alert("Game Over! Your score: " + score);
        resetGame();
    }
}

let score = 0;
setInterval(() => {
    score++;
    document.querySelector('.score').innerText = "Score: " + score;
}, 1000);

function resetGame() {
    document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
    score = 0;
    document.querySelector('.score').innerText = "Score: 0";
}