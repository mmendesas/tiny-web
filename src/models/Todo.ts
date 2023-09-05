interface TodoProps {
  title?: string;
  color?: string;
  done?: boolean;
}

export class Todo {
  constructor(private data: TodoProps) {}

  get(key: string): string | number {
    return this.data[key];
  }

  set(update: TodoProps): void {
    Object.assign(this.data, update);
  }
}
