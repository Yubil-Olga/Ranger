import './View/Slider/slider.css';
import jQuery from 'jquery';
import Model  from './Model/Model';
import View from './View/View';
import Presenter from './Presenter/Presenter';
import IUserSettings from './IUserSettings';
import CreateOptions from './Options/CreateOptions';

(function( $ ) {
  $.fn.perfectSlider = function(options: IUserSettings) {
    const settings = $.extend({}, options);
    try {
      return this.each(function() {
        const param = CreateOptions.create(settings);
        const model = new Model(param),
          view = new View(param, this),
          presenter = new Presenter(model, view);

        model.init();
      });
    }
    catch(err) {
      console.log(err);
    }

  };
})(jQuery);