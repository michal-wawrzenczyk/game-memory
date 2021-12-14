const memoryGame = {
    tileCount : 20, // number of tiles
    tileOnRow : 5, // number of tiles in a row
    divBoard : null, // game board div
    divScore : null, // game result div
    tiles : [], // mixed table of cards will go here
    tilesChecked : [], // marked tiles
    moveCount : 0, // number of movements
    tilesImg : [ // graphics for tiles
        "images/element1.png",
        "images/element2.png",
        "images/element3.png",
        "images/element4.png",
        "images/element5.png",
        "images/element6.png",
        "images/element7.png",
        "images/element8.png",
        "images/element9.png",
        "images/element10.png"
    ]

    startGame() {
        // clean the game board
        this.divBoard = document.querySelector(".game-board");
        this.divBoard.innerHTML = "";

        // clean the movement indicator
        this.divScore = document.querySelector(".game-score");
        this.divScore.innerHTML = 0;

        // clear the variables (the game can start again)
        this.tiles = [];
        this.tilesChecked = [];
        this.moveCount = 0;

        // generate an array of tile numbers (in pairs)
        for (let i=0; i<tileCount; i++) {
            this.tiles.push(Math.floor(i/2));
        }

        // mix the array of tile numbers
        for (let i=this.tileCount-1; i>0; i--) {
            const swap = Math.floor(Math.random()*i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }

        // place the tiles on the game board
        for (let i=0; i<this.tileCount; i++) {
            const tile = document.createElement("div");
            tile.classList.add("game-tile");
            this.divBoard.appendChild(tile);

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.addEventListener("click", e => this.tileClick(e));
            // after clicking on a tile, a number must be assigned and stored for it. dataset property must be added.
        }
    }
}