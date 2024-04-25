// Kaylee Morales
// Created: 4/24/2024
// Phaser: 3.70.0
//
// Movement
//
// An example of putting sprites on the screen using Phaser
// 
// Art assets from Kenny Assets "Shape Characters" set:
// https://kenney.nl/assets/shape-characters

// debug with extreme prejudice
"use strict";

// game config
    let config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        fps: { forceSetTimeOut: true, target: 30 }, // Add this line
        scene: [MyScene]
    };
    
    const game = new Phaser.Game(config);