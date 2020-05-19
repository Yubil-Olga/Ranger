import './slider/slider.css'
import jQuery from 'jquery'
import Model  from './model'
import View from './view'
import Presenter from './presenter'
import UserSettings from './IUserSettings'
import { Options } from './options'

(function( $ ) {
    $.fn.perfectSlider = function(options: UserSettings) {
      let settings = $.extend({}, options);
      try {
        return this.each(function() {
          let param = new Options(settings).create()
          let model = new Model(param),
            view = new View(param).appendSlider(this),
            presenter = new Presenter(model, view);
        
          model.init();
        }) 
      }
      catch(err) {
        console.log(err)
      }
      
    };
  })(jQuery);