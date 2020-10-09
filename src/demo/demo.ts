import './demo.scss';
import SliderInit from './SliderInit';

const settings = [
  { type: 'double', start: -80, end: 40, step: 20, scalestep: 20, },
  { start: -80, end: 40, prefix: '$', },
  { values: ['jen', 'feb', 'march', 'apr', 'may'], color: 'linear-gradient(yellow 0, red 100%)', },
  { direction: 'vertical', hasTagmark: false, }
];

settings.forEach(settings => new SliderInit(settings));
