export class Tree<T> {
  private _value: T;
  private _children: Tree<T>[];
  private _parent: Tree<T> | null;

  constructor(value: T, parent?: Tree<T>, childs?: Tree<T>[]) {
    this._value = value;
    this._children = childs ? childs : [];
    this._parent = parent ? parent : null;
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
  }

  get children(): Tree<T>[] {
    return this._children;
  }

  set children(value: Tree<T>[]) {
    this._children = value;
  }

  get parent(): Tree<T> | null {
    return this._parent;
  }

  set parent(value: Tree<T> | null) {
    this._parent = value;
  }
}
