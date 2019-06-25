const creatures = {
    block: {
        structure: [
            [1,1],[1,1]
        ],
        kind: 'stillLifes',
        title: 'Block',
        value: 'block'
    },
    beehive: {
        structure: [
            [0,1,1,0],[1,0,0,1],[0,1,1,0]
        ],
        kind: 'stillLifes',
        title: 'Beehive',
        value: 'beehive'
    },
    loaf: {
        structure: [
            [0,1,1,0],[1,0,0,1],[0,1,0,1],[0,0,1,0]
        ],
        kind: 'stillLifes',
        title: 'Loaf',
        value: 'loaf'
    },
    boat: {
        structure: [
            [1,1,0],[1,0,1],[0,1,0]
        ],
        kind: 'stillLifes',
        title: 'Boat',
        value: 'boat'
    },
    tub: {
        structure: [
            [0,1,0],[1,0,1],[0,1,0]
        ],
        kind: 'stillLifes',
        title: 'Tub',
        value: 'tub'
    },
    blinker: {
        structure: [
            [1,1,1]
        ],
        kind: 'oscillators',
        title: 'Blinker',
        value: 'blinker'
    },
    toad: {
        structure: [
            [0,1,1,1],[1,1,1,0]
        ],
        kind: 'oscillators',
        title: 'Toad',
        value: 'toad'
    },
    beacon: {
        structure: [
            [1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]
        ],
        kind: 'oscillators',
        title: 'Beacon',
        value: 'beacon'
    },
    pulsar: {
        structure: [
            [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,1,1,0,0,1,1,0,1,1,0,0,1,1,1],
            [0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
            [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
            [0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
            [1,1,1,0,0,1,1,0,1,1,0,0,1,1,1],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
        ],
        kind: 'oscillators',
        title: 'Pulsar',
        value: 'pulsar'
    },
    pentaDecathlon: {
        structure: [
            [1,1,1],[1,0,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,0,1],[1,1,1]
        ],
        kind: 'oscillators',
        title: 'Penta decathlon',
        value: 'pentaDecathlon'
    },
    glider: {
        structure: [
            [0,1,0],[0,0,1],[1,1,1]
        ],
        kind: 'spaceShips',
        title: 'Glider',
        value: 'glider'
    },
    lightWeightSpaceShip: {
        structure: [
            [1,0,0,1,0],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1]
        ],
        kind: 'spaceShips',
        title: 'Light weight spaceShip',
        value: 'lightWeightSpaceShip'
    },
    middleWeightSpaceShip: {
        structure: [
            [0,1,1,0,0,0],[1,1,0,1,1,1],[0,1,1,1,1,1],[0,0,1,1,1,0]
        ],
        kind: 'spaceShips',
        title: 'Middle weight spaceShip',
        value: 'middleWeightSpaceShip'
    },
    heavyWeightSpaceShip: {
        structure: [
            [0,1,1,0,0,0,0],[1,1,0,1,1,1,1],[0,1,1,1,1,1,1],[0,0,1,1,1,1,0]
        ],
        kind: 'spaceShips',
        title: 'Heavy weight spaceShip',
        value: 'heavyWeightSpaceShip'
    },
};

