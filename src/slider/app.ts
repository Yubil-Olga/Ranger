import './slider.css'
import jQuery from 'jquery'
import Model  from './model'
import View from './view'
import Presenter from './presenter'

(function( $ ) {
    $.fn.perfectSlider = function(options: any) {
      let settings = $.extend({

      }, options);
      return this.each(function() {
        let model = new Model(),
          view = new View(),
          presenter = new Presenter(model, view);
        
      presenter.init(this, options);
      })
      
    };
  })(jQuery);