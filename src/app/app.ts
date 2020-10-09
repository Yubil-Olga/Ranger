import './View/Slider/slider.scss';
import jQuery from 'jquery';
import IUserSettings from './IUserSettings';
// import CreateOptions from './Options/CreateOptions';
import Facade from './Presenter/Facade';

(function( $ ) {
  $.fn.perfectSlider = function(options: IUserSettings) {
    const settings = $.extend({}, options);
    try {
      return this.map(function() {
        // const options = CreateOptions.create(settings);
        const facade = new Facade(options, this);
        return facade;
      });
    }
    catch(err) {
      console.log(err);
    }

  };
})(jQuery);