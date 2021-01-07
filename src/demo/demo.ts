import Sample from './components/sample/Sample';

$(() => {
  $('.js-demo__item').each((_, val) => {
    const $container = $(val);
    new Sample($container);
  });
});
