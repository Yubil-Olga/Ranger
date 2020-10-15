import './View/Slider/slider.scss';
import jQuery from 'jquery';
import Facade from './Presenter/Facade';
import IOptions from './IOptions';

(function( $ ) {
  $.fn.perfectSlider = function(options: IOptions) {
    const settings = $.extend({}, options);
    try {
      return this.map(function() {
        const facade = new Facade(options, this);
        return facade;
      });
    }
    catch(err) {
      console.log(err);
    }

  };
})(jQuery);