import Range from '../range/range';
import Checkbox from '../checkbox/checkbox';
import TextField from '../text-field/text-field';

export default class ControlPanel {
  public $controlPanel: JQuery<Object>;
  public range: Range;
  public $checkboxes: JQuery<Object>;
  public checkboxes: Checkbox[] = [];
  public $textFields: JQuery<Object>;
  public textFields: TextField[] = []

  constructor($container: JQuery<Object>, range: Range) {
    this.range = range;
    this.init($container);
  }

  init($container: JQuery<Object>) {
    this.$controlPanel = $container.find('.js-control-panel');

    this.$checkboxes = this.$controlPanel.find('.js-control-panel__checkbox');
    this.$checkboxes.each((index, element) => {
      this.checkboxes.push(new Checkbox($(element), this.range));
    });

    this.$textFields = this.$controlPanel.find('.js-control-panel__text-field');
    this.$textFields.each((index, element) => {
      this.textFields.push(new TextField($(element), this.range));
    });

    this.textFields.forEach((el) => {
      el.textFieldChanged.attach(() => this.updateValues());
    });

  }

  updateValues() {
    this.textFields.forEach((el) => el.updateValue());
  }
}