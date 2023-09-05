export class TodoForm {
  constructor(public parent: Element) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick,
    };
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

  onButtonClick(): void {
    console.log('button clicked');
  }

  template(): string {
    return `
      <div>
        <ul>
          <li>
            <span>some title here</span>
            <input type="checkbox">done?</input>
            <span>{color}</span>
          </li>
        </ul>

        <br />
        <br />

        <input type="text" placeholder="add task ..." />
        <button>change color</button>
      </div>
    `;
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
