import { HasId, Model } from '../models/Model';

export abstract class View<T extends Model<K>, K extends HasId> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => this.render());
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment
        .querySelectorAll(selector) //
        .forEach((element: Element): void => {
          element.addEventListener(eventName, eventsMap[eventKey]);
        });
    }
  }

  render(): void {
    // clear old stuff
    this.parent.innerHTML = '';

    // real html from string
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    // bind events
    this.bindEvents(templateElement.content);

    // add to root
    this.parent.append(templateElement.content);
  }
}
