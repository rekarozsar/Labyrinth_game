class GameEngine {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.timer = 0;
        this.player = { x: 0, y: 489, width: 50, height: 55, speed: 2 };
        this.keys = {};
        this.gameLoop = null;
        this.init();
    }

    init() {
        document.addEventListener("keydown", (e) => this.keys[e.key] = true);
        document.addEventListener("keyup", (e) => this.keys[e.key] = false);
        this.startGame();
    }

    startGame() {
        this.timer = 0;
        this.gameLoop = setInterval(() => {
            this.update();
            this.render();
        }, 1000 / 60);
        this.startTimer();
    }

    update() {
        if (this.keys["a"] || this.keys["A"]) this.player.x -= this.player.speed;
        if (this.keys["d"] || this.keys["D"]) this.player.x += this.player.speed;
        if (this.keys["w"] || this.keys["W"]) this.player.y -= this.player.speed;
        if (this.keys["s"] || this.keys["S"]) this.player.y += this.player.speed;
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }

    startTimer() {
        setInterval(() => {
            this.timer++;
            let minutes = Math.floor(this.timer / 60);
            let seconds = this.timer % 60;
            document.getElementById("timer").textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
}

new GameEngine();




// Game Engine that will handle the game flow
class GameEngine {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.timer = 0;
        this.player = new Knight(0, 489, 50, 55, 'knigths/ally_forward1.png');  // You can use a specific image
        this.keys = {};
        this.gameLoop = null;

        // Level and entities
        this.level = new Level('###.###\n.#.#.\n###.#.\n.#.|.#'); // Example level data
        this.dragon = new Dragon(100, 100, 50, 55, 'enemy.png');  // Use proper image paths

        this.init();
    }

    init() {
        document.addEventListener("keydown", (e) => this.keys[e.key] = true);
        document.addEventListener("keyup", (e) => this.keys[e.key] = false);
        this.startGame();
    }

    startGame() {
        this.timer = 0;
        this.gameLoop = setInterval(() => {
            this.update();
            this.render();
        }, 1000 / 60);
        this.startTimer();
    }

    update() {
        if (this.keys["a"] || this.keys["A"]) this.player.setVelx(-3); 
        if (this.keys["d"] || this.keys["D"]) this.player.setVelx(3);
        if (this.keys["w"] || this.keys["W"]) this.player.setVely(-3);
        if (this.keys["s"] || this.keys["S"]) this.player.setVely(3);

        this.player.move(this.level);
        this.dragon.move(this.level, 1);  // Example level number for dragon behavior
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw Level, player, and enemy
        this.level.draw(this.ctx, this.player, this.dragon);
        this.player.draw(this.ctx);
        this.dragon.draw(this.ctx);
    }

    startTimer() {
        setInterval(() => {
            this.timer++;
            let minutes = Math.floor(this.timer / 60);
            let seconds = this.timer % 60;
            document.getElementById("timer").textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
}

new GameEngine();
