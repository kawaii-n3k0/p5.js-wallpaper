// ------------------------------------------------------ パラメータの宣言

var default_scale = 20;
var default_width = window.screen.width;
var default_heigt = 2250;

var default_background = "#000000";
var default_line = "#99FF66";

var default_fill = {
    fill: true,
    color: default_line + "AE"
};

// ------------------------------------------------------

var cols, rows;
var scl = default_scale;

var w = default_width;
var h = default_heigt;

var flying = 0;

var terrain = [];

// ------------------------------------------------------ セットアップ機能

function setup() {
    createCanvas(w, h, WEBGL);

    // defining the columns and rows

    cols = w / scl;
    rows = h / scl;

    // assigning the default value for the terrain of 0

    for (var x = 0; x < cols; x++) {
        terrain[x] = []; // assigning an empty array to the terrain array
        for (var y = 0; y < rows; y++) {
            terrain[x][y] = 0;
        }
    }

    console.log(terrain);
}

// ------------------------------------------------------ ドローイング機能

function draw() {
    flying -= 0.05;

    // declaring the yOffset to be the same as the flying value, which decreases to move the camera forward
    var yOff = flying;

    for (var y = 0; y < rows; y++) {

        // declaring the xOffset to be 0, but it will increase
        var xOff = 0;

        for (var x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xOff, yOff), 0, 1, -100, 100);

            // increasing the xOffset
            xOff += 0.2;
        }

        // increasing the yOffset
        yOff += 0.2;
    }

    // setting the bg color

    background(default_background);
    translate(0, -h/4);
    rotateX(PI/2.7);
    stroke(default_line);
    if (!default_fill.fill) {
        noFill();
    }
    else {
        fill(default_fill.color);
    }
    translate(-w/2, -h/3);

    for (var _y = 0; _y < rows-1; _y++) {
        beginShape(TRIANGLE_STRIP);

        for (var _x = 0; _x < cols; _x++) {
            vertex(_x*scl, _y*scl, terrain[_x][_y]);
            vertex(_x*scl, (_y+1)*scl, terrain[_x][_y+1]);
        }

        endShape();
    }
}
