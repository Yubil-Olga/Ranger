import './View/Slider/slider.scss';
import jQuery from 'jquery';
import Facade from './Presenter/Facade';
import { IOptions } from './IOptions';

(function( $ ) {
  $.fn.perfectSlider = function(options?, newOptions?) {
    try {
      return this.map(function(_: number, element: HTMLElement) {
        if (typeof options === 'object' || !options) {
          const data: IOptions = $(element).data();
          const settings: IOptions = $.extend(data, options);
          const facade: Facade = new Facade(settings, this);
          $(this).data('facade', facade);

          return this;
        }
        const facade: Facade = $(this).data('facade');

        if (typeof options === 'string' && facade) {
          if (facade[options]) {
            return facade[options].call(facade, newOptions);
          }
        }

      });
    }
    catch(err) {
      console.log(err);
    }

  };
})(jQuery);