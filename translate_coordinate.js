


function translateCoordinate( x, y ) {
    if ( y < 32 ) {
        coordinate.x = 127 - x;
        coordinate.y = 31  - y;
    } else {
        // On the bottom panel, invert x and y
        coordinate.x = 63 - x;
        coordinate.y = 63 - y; }
        
        return coordinate; }
        
let coordinate = { "x": 0,"y": 0 }
                                        // copilot wrote this part for me
for ( let i = 0; i < 64; i++ ) {         // i could have done it, but dam that was fast
    for ( let j = 0; j < 64; j++ ) {
        coordinate = translateCoordinate( j, i );
        console.log( "input x: " + j + "  input y: " + i );
        console.log( coordinate );
        console.log( " " );
    }
}

// function to translate coordinates for two more panels

