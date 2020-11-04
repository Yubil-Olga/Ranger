import IOptions from './app/IOptions';

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    perfectSlider(options?: IOptions): JQuery<Object>;
  }
}



