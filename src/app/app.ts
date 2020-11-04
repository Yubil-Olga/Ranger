import './View/Slider/slider.scss';
import jQuery from 'jquery';
import Facade from './Presenter/Facade';
import IOptions from './IOptions';

(function( $ ) {
  $.fn.perfectSlider = function(options?: IOptions) {
    try {
      return this.map(function(index: number, element: HTMLElement) {
        if (typeof options === 'object' || !options) {
          const data: IOptions = $(element).data();
          const settings: IOptions = $.extend(data, options);
          const facade: Facade = new Facade(settings, this);
          return facade;
        }
        const facade: Facade = new Facade(options, this);
        return facade;
      });
    }
    catch(err) {
      console.log(err);
    }

  };
})(jQuery);