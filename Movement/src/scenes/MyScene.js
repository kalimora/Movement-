class MyScene extends Phaser.Scene {
    constructor() {
        super('MyScene');
    }

    preload() {
        // Load all required assets
        this.load.image('background_cloud', 'assets/background_cloudA.png');
        this.load.image('background_tree', 'assets/background_tree.png');
        this.load.image('background_treeLarge', 'assets/background_treeLarge.png');
        this.load.image('character_handPurple', 'assets/character_handPurple.png');
        this.load.image('character_roundPurple', 'assets/character_roundPurple.png');
        this.load.image('effect_blast', 'assets/effect_blast.png');
        this.load.image('item_', 'assets/item_.png');
        this.load.image('item_arrow', 'assets/item_arrow.png');
        this.load.image('item_bow', 'assets/item_bow.png');
        this.load.image('item_helmet', 'assets/item_helmet.png');
        this.load.image('tile_bush', 'assets/tile_bush.png');
    }

    create() {
        // Add background images
        this.add.image(0, 0, 'background_cloud').setOrigin(0);
        this.add.image(this.sys.game.config.width / 2, 0, 'background_cloud').setOrigin(0);
        this.add.image(0, this.sys.game.config.height - 128, 'background_treeLarge').setOrigin(0);
        
        // Create player sprite and its elements
        this.player = this.physics.add.sprite(400, 500, 'character_roundPurple').setScale(2);
        this.hand = this.physics.add.sprite(450, 500, 'character_handPurple').setScale(2);
        this.helmet = this.physics.add.sprite(400, 450, 'item_helmet').setScale(2);
        this.bow = this.physics.add.sprite(400, 500, 'item_bow').setScale(2);

        // Set up emitted sprites group
        this.emittedSprites = this.physics.add.group();

        // Set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set up space bar key
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Set up "A" and "D" keys for horizontal movement
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        // Move player left on "A" and right on "D"
        if (this.keyA.isDown) {
            this.player.setVelocityX(-200);
            this.hand.x = this.player.x - 50;
            this.helmet.x = this.player.x;
            this.bow.x = this.player.x + 50;
        } else if (this.keyD.isDown) {
            this.player.setVelocityX(200);
            this.hand.x = this.player.x + 50;
            this.helmet.x = this.player.x;
            this.bow.x = this.player.x - 50;
        } else {
            this.player.setVelocityX(0);
            this.hand.x = this.player.x;
            this.helmet.x = this.player.x;
            this.bow.x = this.player.x;
        }

        // Ensure player does not go off the screen
        if (this.player.x < 0) {
            this.player.x = 0;
            this.hand.x = 0;
            this.helmet.x = 0;
            this.bow.x = 0;
        } else if (this.player.x > this.sys.game.config.width) {
            this.player.x = this.sys.game.config.width;
            this.hand.x = this.sys.game.config.width - 50;
            this.helmet.x = this.sys.game.config.width;
            this.bow.x = this.sys.game.config.width + 50;
        }

        // Emit sprite when space bar is pressed
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.emitSprite();
        }

        // Move emitted sprites upwards
        this.emittedSprites.children.iterate((sprite) => {
            sprite.y -= 5;
            if (sprite.y < 0) {
                sprite.destroy();
            }
        });
    }

    emitSprite() {
        // Create and add emitted sprite
        let emittedSprite = this.physics.add.sprite(this.bow.x, this.player.y, 'item_arrow');
        this.emittedSprites.add(emittedSprite);
    }
}
