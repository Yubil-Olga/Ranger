import './slider/app'
import $ from 'jquery'

export function sum(a: number, b: number): number {
    return a + b;
}

$('.perfectSlider').perfectSlider({
    "type": "double",
    "start": -20,
    "step": 40,
    "end": 100,
    "scalestep": 40,
    "to": 70,
    // 'direction': 'vertical',
    // "color": "linear-gradient(yellow 0, red 100%)",
    // "thumb": "square",
    // "tagmark": false 
});




