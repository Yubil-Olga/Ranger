import './demo.scss';
import SliderInit from './SliderInit';

const options = [
  { isRange: true, start: -80, end: 40, step: 20, scaleStep: 20, },
  { start: -80, end: 40, prefix: '$', },
  { values: ['jen', 'feb', 'march', 'apr', 'may'], color: 'linear-gradient(yellow 0, red 100%)', },
  { isVertical: true, hasTagmark: false, }
];

options.forEach(options => new SliderInit(options));
