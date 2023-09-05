export class TodoForm {
  constructor(public parent: Element) {}

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

    // add to root
    this.parent.append(templateElement.content);
  }
}
