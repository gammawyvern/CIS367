let player;
let cursors;

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("player", "./assets/player_sprite.png");
}

function create() {
  player = this.add.sprite(400, 300, "player");
  player.texture.setFilter(Phaser.Textures.FilterMode.NEAREST); 
  player.setScale(4);
  // player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    player.x -= 4;
  } else if (cursors.right.isDown) {
    player.x += 4;
  }

  if (cursors.up.isDown) {
    player.y -= 4;
  } else if (cursors.down.isDown) {
    player.y += 4;
  }
}

