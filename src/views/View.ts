import { HasId, Model } from '../models/Model';

export abstract class View<T extends Model<K>, K extends HasId> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => this.render());
  }

  onRender(): void {}

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

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
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
    this.mapRegions(templateElement.content);

    // nesting
    this.onRender();

    // add to root
    this.parent.append(templateElement.content);
  }
}
