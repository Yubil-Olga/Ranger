import './slider/app'
import $ from 'jquery'

export function sum(a: number, b: number): number {
    return a + b;
}

$('.perfectSlider1').perfectSlider({
    // "type": "double",
    "start": -80,
    "step": 20,
    "end": 0,
    "scalestep": 200,
    // "to": 70,
    // 'direction': 'vertical',
    values: ["olga", "roma", "grisha", "konstantin konstantinopolskij"],
    prefix: "$"
    // "color": "linear-gradient(yellow 0, red 100%)",
    // "thumb": "square",
    // "tagmark": false 
});

$('.perfectSlider2').perfectSlider({
    "type": "double",
    "start": -100,
    "step": 30,
    "end": 100,
    "scalestep": 20,
    'direction': 'vertical',
    "color": "linear-gradient(yellow 0, red 100%)",
    // "tagmark": false 
});




