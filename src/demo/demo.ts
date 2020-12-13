import './demo.scss';
import Sample from './components/sample/Sample';

$(() => {
  $('.js-demo__item').each((index, val) => {
    const $container = $(val);
    new Sample($container);
  });
});
