import { IOptions } from './app/IOptions';

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    perfectSlider: (
      options?: IOptions | 'setOptions' | 'getOptions' | 'subscribe' | 'unsubscribe',
      newOptions?: IOptions | Function
    ) => JQuery<Object>;
  }
}



