

class GameEngine {
    constructor(levelNumber) {
        this.levelNumber = levelNumber
        this.isRestarting = false;
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.timer = 0;
        const selectedCharacter = localStorage.getItem("selectedCharacter") || "knights/ally_forward1.png";
        this.knight = new Knight(30, 550, 50, 55, selectedCharacter);

        

        this.keys = {};
        this.gameLoop = null;
        this.timerInterval = null;
        this.gameOver = false;

        this.keydownHandler = (e) => {
            if (!this.isRestarting) {
                this.keys[e.key] = true;
            }
        };
        this.keyupHandler = (e) => {
            if (!this.isRestarting) {
                this.keys[e.key] = false;
            }
        };
        document.addEventListener("keydown", this.keydownHandler);
        document.addEventListener("keyup", this.keyupHandler);

        this.levels = [
            [
                ".#..#...|",
                ".#.#..#.#",
                ".#....#..",
                "...##..##",
                "#.....#..",
                "..##....#",
                ".....#...",
                "...#.#.##",
                "...######"

            ],
            [
                "..##....|",
                ".#..####.",
                "....#....",
                ".##....#.",
                ".#....#..",
                ".#...#..#",
                "....#....",
                "...####..",
                ".......##"
            ],
            [
                "..#.....|",
                "....#.###",
                "#.##....#",
                "#....##.#",
                "..#.....#",
                ".###.##..",
                ".......#.",
                "....#####",
                "........."
            ],
            [
                "........|",
                "####..#..",
                "...#..#.#",
                "..###...#",
                "...###.##",
                ".#...#...",
                ".....#.##",
                "...#....#",
                "....#..##"

            ],
            [
                "##......|",
                "#..####.#",
                "#.#####..",
                "..###.#.#",
                ".###..#.#",
                ".##..#..#",
                ".#.....##",
                "....##..#",
                "......###"

            ],
            [
                "#.......|",
                "#..#..###",
                "#.##.####",
                "...#....#",
                ".#.####.#",
                "##....#..",
                "...###...",
                ".#.....##",
                "....#..##"

            ],
            [
                ".......#|",
                ".######..",
                ".#....#..",
                ".#.####.#",
                ".#......#",
                ".#.###..#",
                "......#.#",
                ".####...#",
                ".....#..#"
                
            ],
            [
                "#.......|",
                "..#####.#",
                ".....#...",
                "##...#.##",
                "##.###...",
                "#....##.#",
                "..###...#",
                "......###",
                "......###"

            ],
            [
                "....#...|",
                "#..####.#",
                "......#.#",
                ".#.##....",
                "##..##..#",
                ".#..##...",
                "...#....#",
                ".#...#...",
                "..#######"

            ],
            [
                ".#......|",
                ".#.####.#",
                ".#.#..#.#",
                ".#.#..#..",
                ".#.#..#.#",
                ".#.#..#..",
                "...#..#.#",
                "........#",
                "........#"
            ]
        ];

        this.loadLevel(this.levelNumber);

        let dragonPosition = this.getRandomValidPosition();

        this.dragon = new Dragon(dragonPosition.x, dragonPosition.y, 70, 70, `enemies/enemy_forward${this.levelNumber}.png`);

    }

    loadLevel(levelNumber) {
        if (levelNumber < 1 || levelNumber > this.levels.length) {
            console.error("Invalid level number!");
            return;
        }

        let levelData = this.levels[levelNumber - 1].join("\n");
        this.level = new Level(levelData);
        this.init();
    }

    getRandomValidPosition() {
        let x, y;
        let minDistance = 300; // Minimum distance from the knight
        let valid = false;

        while (!valid) {
            x = Math.floor(Math.random() * (this.canvas.width - 70));
            y = Math.floor(Math.random() * (this.canvas.height - 70));

            let dx = x - 30;
            let dy = y - 550;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Check if position is not on a wall and is far enough from the knight
            let tempDragon = new Dragon(x, y, 70, 70, "");
            if (!this.level.collides(tempDragon) && distance >= minDistance) {
                valid = true;
            }
        }

        return { x, y };
    }



    

    init() {
        this.startGame();
    }

    startGame() {
        this.timer = 0;
        this.gameOver = false;
        this.isRestarting = false;

        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => {
            this.update();
            this.render();
        }, 1000 / 60);
        this.startTimer();
    }

    startGameNewLevel(){
        this.gameOver = false;
        this.isRestarting = false;

        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => {
            this.update();
            this.render();
        }, 1000 / 60);
       
    }

    update() {
        if (this.gameOver) {
            return;  // Stop the update loop during the game over phase
        }
        

        if (this.knight.died(this.dragon)) {
            this.knight.setImage("knights/ally_dead1.png");  // Update knight's image to dead
            this.dragon.setImage("enemies/enemy_angry1.png"); 
            this.handleKnightDeath();
            return; // Stop the game loop after knight's death
        }

        if(this.level.isOver(this.knight)){
            console.log(this.levelNumber);
            if (this.levelNumber < 10){
                this.levelNumber = this.levelNumber + 1
                
                console.log('a');
                this.loadLevel(this.levelNumber);
                this.newLevel();
            }
            else{
                this.stopTimer();
                clearInterval(this.gameLoop);
                alert("Congratulations! You have completed all levels! 🎉");
                this.levelNumber = 1;
                this.loadLevel(this.levelNumber);
                this.restart();
            }
            /*if (this.levelNumber < this.levels.length) {
                this.levelNumber++;
                 // Correctly load the next level
            } else {
                this.winGame();  // Trigger win game if no more levels
            }
            return;*/
            
        }



        

        this.knight.setVelx(0);
        this.knight.setVely(0);

        
       
        if (this.keys["a"] || this.keys["A"]) this.knight.setVelx(-this.knight.speed);
        if (this.keys["d"] || this.keys["D"]) this.knight.setVelx(this.knight.speed);
        if (this.keys["w"] || this.keys["W"]) this.knight.setVely(-this.knight.speed);
        if (this.keys["s"] || this.keys["S"]) this.knight.setVely(this.knight.speed);
        
        this.knight.move(this.level);
        this.dragon.move(this.level, this.levelNumber);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.level.draw(this.ctx, this.knight, this.dragon);
        this.knight.draw(this.ctx);
        if (this.level.inVisionRange(this.knight, this.dragon, 3 * this.level.BRICK_WIDTH)) {
            this.dragon.draw(this.ctx);
        }
    }

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timerInterval = setInterval(() => {
            this.timer++;
            let minutes = Math.floor(this.timer / 60);
            let seconds = this.timer % 60;
            document.getElementById("timer").textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    handleKnightDeath() {
         // Update dragon's image to angry
        
        this.stopTimer();  // Stop the game timer
        alert("You died :/!");  // Alert the player

       
        this.gameOver = true;

        // Stop listening to keys temporarily
        this.isRestarting = true;

        // Restart the game (you can adjust this as needed for your flow)
        this.restart();
    }

    restart() {
        this.stopTimer();
        clearInterval(this.gameLoop);
        const selectedCharacter = localStorage.getItem("selectedCharacter") || "knights/ally_forward1.png";
        this.knight = new Knight(30, 550, 50, 55, selectedCharacter);
        let dragonPosition = this.getRandomValidPosition();

        this.dragon = new Dragon(dragonPosition.x, dragonPosition.y, 70, 70, `enemies/enemy_forward${this.levelNumber}.png`);
        this.knight.setVelx(0);
        this.knight.setVely(0);

        this.timer = 0;
        this.isRestarting = true; 
        this.gameOver = false;

        this.keys = {};

        setTimeout(() => {
            
            this.isRestarting = false;
            
            this.startGame();  // Start the game loop again
        }, 500);
    }

    newLevel(){
        clearInterval(this.gameLoop);
        const selectedCharacter = localStorage.getItem("selectedCharacter") || "knights/ally_forward1.png";
        this.knight = new Knight(30, 550, 50, 55, selectedCharacter);
        let dragonPosition = this.getRandomValidPosition();

        this.dragon = new Dragon(dragonPosition.x, dragonPosition.y, 70, 70, `enemies/enemy_forward${this.levelNumber}.png`);
        this.knight.setVelx(0);
        this.knight.setVely(0);

        
        this.isRestarting = true; 
        this.gameOver = false;

        this.keys = {};

        setTimeout(() => {
            
            this.isRestarting = false;
            
            this.startGameNewLevel();  // Start the game loop again
        }, 500);
    }

    
    

}







class Sprite {
    /**
     * Constructor to initialize the sprite with its position, size, and image.
     * @param {number} x - The x-coordinate of the top-left corner.
     * @param {number} y - The y-coordinate of the top-left corner.
     * @param {number} width - The width of the sprite.
     * @param {number} height - The height of the sprite.
     * @param {string} imageSrc - The image source URL.
     */
    constructor(x, y, width, height, imageSrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    setImage(imageSrc) {
        this.image.src = imageSrc;
    }

    /**
     * Draws the sprite on the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    /**
     * Checks if this sprite collides with another sprite.
     * @param {Sprite} other - The other sprite to check collision with.
     * @returns {boolean} - True if the two sprites collide, false otherwise.
     */
    collides(other) {
        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }
}

class Brick extends Sprite {
    /**
     * Constructor for a Brick object, which extends Sprite.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {number} width - The width of the brick.
     * @param {number} height - The height of the brick.
     * @param {string} imageSrc - The image source URL for the brick.
     */
    constructor(x, y, width, height, imageSrc) {
        super(x, y, width, height, imageSrc);
    }
}

class Level {
    constructor(levelData) {
        this.BRICK_WIDTH = 90;
        this.BRICK_HEIGHT = 70;
        this.bricks = [];
        this.floors = [];
        this.loadLevel1(levelData);
    }

    loadLevel1(levelData) {
        
        let lines = levelData.split('\n');
        let y = 0;
        for (let line of lines) {
            let x = 0;
            for (let blockType of line) {
                switch (blockType) {
                    case '#':
                        this.bricks.push(new Brick(x * this.BRICK_WIDTH, y * this.BRICK_HEIGHT, this.BRICK_WIDTH, this.BRICK_HEIGHT, 'pictures/brick.jpg'));
                        break;
                    case '.':
                        this.floors.push(new Brick(x * this.BRICK_WIDTH, y * this.BRICK_HEIGHT, this.BRICK_WIDTH, this.BRICK_HEIGHT, 'pictures/floor3.jpg'));
                        break;
                    case '|':
                        this.floors.push(new Brick(x * this.BRICK_WIDTH, y * this.BRICK_HEIGHT, this.BRICK_WIDTH, this.BRICK_HEIGHT, 'pictures/door.jpg'));
                        break;
                }
                x++;
            }
            y++;
        }
    }

    /*
    nextLevel(levelNumber) {
        console.log("Next level number:", levelNumber);  // Log the level number
        console.log("Level data:", this.levels[levelNumber - 1]);  // Log the level data
        
        if (levelNumber - 1 >= 0 && levelNumber - 1 < this.levels.length) {
            let levelData = this.levels[levelNumber - 1].join("\n");
            this.loadLevel(levelData);
        } else {
            this.winGame();
        }
    }*/
    
    
    collides(entity) {
        for (let brick of this.bricks) {
            if (entity.collides(brick)) {
                if (entity.x + entity.width > brick.x && entity.x < brick.x) {
                    entity.x = brick.x - entity.width;
                } else if (entity.x < brick.x + brick.width && entity.x + entity.width > brick.x + brick.width) {
                    entity.x = brick.x + brick.width;
                }
                if (entity.y + entity.height > brick.y && entity.y < brick.y) {
                    entity.y = brick.y - entity.height;
                } else if (entity.y < brick.y + brick.height && entity.y + entity.height > brick.y + brick.height) {
                    entity.y = brick.y + brick.height;
                }
                return true;
            }
        }
        return false;
    }

    draw(ctx, knight, dragon) {
        let visionRadius = 3 * this.BRICK_WIDTH;
        
        for (let floor of this.floors) {
            if (this.inVisionRange(knight, floor, visionRadius)) {
                floor.draw(ctx);
            }
        }
        for (let brick of this.bricks) {
            if (this.inVisionRange(knight, brick, visionRadius)) {
                brick.draw(ctx);
            }
        }
        if (this.inVisionRange(knight, dragon, visionRadius)) {
            dragon.draw(ctx);
        }
    }

    inVisionRange(knight, object, radius) {
        let dx = (object.x + this.BRICK_WIDTH / 2) - (knight.x + knight.width / 2);
        let dy = (object.y + this.BRICK_HEIGHT / 2) - (knight.y + knight.height / 2);
        return dx * dx + dy * dy <= radius * radius;
    }

    isOver(knight) {
        // Check if the knight has reached the door (top-right corner)
        return knight.y < 35 && knight.x > 760;
    }

    

    stopTimer() {
        clearInterval(this.timerInterval);
    }
}


/**
 * Dragon class representing the enemy character.
 * Moves randomly within the game level and handles collisions.
 */
class Dragon extends Sprite {
    constructor(x, y, width, height, imageSrc) {
        super(x, y, width, height, imageSrc);
        this.velx = 3;
        this.vely = 3;
    }

    /**
     * Moves the dragon within the game level, handling collisions and out-of-bounds conditions.
     * @param {Level} level - The current level of the game.
     * @param {number} levelNum - The current level number (for changing the image if needed).
     */
    move(level, levelNum) {
        let oldX = this.x;
        let oldY = this.y;

        this.x += this.velx;
        this.y += this.vely;

        if (level.collides(this) || this.outOfBounds()) {
            this.x = oldX;
            this.y = oldY;
            this.changeDirection(levelNum);
        }
    }

    /**
     * Checks if the dragon is out of bounds.
     * @returns {boolean} True if out of bounds, false otherwise.
     */
    outOfBounds() {
        return (this.x < 0 || this.x > 740 || this.y < 0 || this.y > 580);
    }

    /**
     * Randomly changes the dragon's movement direction and updates its image accordingly.
     * @param {number} levelNum - The current level number.
     */
    changeDirection(levelNum) {
        let dragonImageBack = `enemies/enemy_backward${levelNum}.png`;
        let dragonImageFront = `enemies/enemy_forward${levelNum}.png`;
        
        // Randomize velocity (-1, 0, or 1)
        this.velx = Math.floor(Math.random() * 3) - 1;
        this.vely = Math.floor(Math.random() * 3) - 1;

        if (this.velx === 1) {
            this.setImage(dragonImageBack);
        } else if (this.velx === -1) {
            this.setImage(dragonImageFront);
        }
        
        if (this.velx === 0 && this.vely === 0) {
            this.velx = 1; 
        }
    }
}

class Knight extends Sprite{
    constructor(x, y, width, height, imageSrc) {
        super(x, y, width, height, imageSrc);
        this.velx = 0;
        this.vely = 0;
        this.speed = 3;
    }

    // Move the Knight, handling collisions and out-of-bounds conditions
    move(level) {
        const oldX = this.x;
        const oldY = this.y;

        this.x += this.velx;
        this.y += this.vely;

        if (level.collides(this) || this.out()) {
            this.x = oldX;
            this.y = oldY;
        }
    }

    // Check if the Knight is out of bounds
    out() {
        return (this.x < 0 || this.x > 763 || this.y < 0 || this.y > 578);
    }

    // Check if the Knight collides with the given Dragon
    died(dragon) {
        return dragon.collides(this);
    }

    // Getter and setter for velx
    getVelx() {
        return this.velx;
    }

    setVelx(velx) {
        this.velx = velx;
    }

    // Getter and setter for vely
    getVely() {
        return this.vely;
    }

    setVely(vely) {
        this.vely = vely;
    }

    // Getter and setter for image
    setImage(image) {
        this.image = image;
    }

    getImage() {
        return this.image;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const characterLinks = document.querySelectorAll(".character");
    const modal = document.getElementById("myModal");
    const gameCanvas = document.getElementById("gameCanvas");
    const timerTile = document.getElementById("timer");

    characterLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            const selectedImage = this.querySelector("img").src;

            // Store selected character image globally
            localStorage.setItem("selectedCharacter", selectedImage);

            // Hide character selection and show the game
            modal.style.display = "none";
            gameCanvas.classList.remove("hide");
            timerTile.classList.remove("hide");

            new GameEngine(1);
        });
    });
});



