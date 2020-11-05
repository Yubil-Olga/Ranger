import './demo.scss';
import Sample from './components/sample/sample';

$(() => {
  $('.js-demo__item').each((index, val) => {
    const $container = $(val);
    new Sample($container);
  });
});
