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
    ],
    canGet : true, // to prevent clicking on other tiles while deleting or resetting function works

    tileClick(e) {
        if (this.canGet) {
            // if we have not already chosen an item yet
            // or index of the element does not already exist in the tilesChecked array...
            // so here we check if chosen tile is not already clicked (i.e. if it has been already thrown into tilesChecked array)
            // then we can add this element to the array and set the background basing on dataset of the element.
            if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== e.target.dataset.index)) {
                this.tilesChecked.push(e.target);
                e.target.style.backgroundImage = `url(${this.tilesImg[e.target.dataset.cardType]})`;
            }
            // the tilesChecked array can contain only 2 elements
            if (this.tilesChecked.length === 2) {
                // we cannot click on another tile while delete or reset function is running.
                this.canGet = false;
                // second tile must be chosen. Now if cardType of both elements in tilesChecked array is the same, then the pair of tiles has been matched.
                if (this.tilesChecked[0].dataset.cardType === this.tilesChecked[1].dataset.cardType) {
                    // if the pair has been matched, execute the deleteTiles function to get rid of them.
                    setTimeout(this.deleteTiles.bind(this), 500);
                    // or: setTimeout(() => this.deleteTiles(), 500);
                } else {
                    // if the tiles are different, hide them again by execute the resetTiles method. Hide them with 500ms time delay.
                    setTimeout(this.resetTiles.bind(this), 500);
                    // or: setTimeout(() => this.resetTiles(), 500);
                }
                this.moveCount++;
                this.divScore.innerText = this.moveCount;
            }
        }
    },

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