class Elem<T> {
  value: T;
  next: Elem<T> | null;
  previous: Elem<T> | null;

  constructor(value: T, previous?: Elem<T> | null, next?: Elem<T> | null) {
    this.value = value;
    this.next = next ? next : null;
    this.previous = previous ? previous : null;
  }
}

export class DoubleLinkedList<T> {
  private _head: Elem<T> | null;
  private _tail: Elem<T> | null;
  private _length: number = 0;
  readonly unique: boolean;

  constructor(elem?: Elem<T> | null, unique?: boolean) {
    this._head = elem ? elem : null;
    this._tail = elem ? elem : null;
    this.unique = !!unique;
  }

  get length(): number {
    return this._length;
  }

  get head(): Elem<T> | null {
    return this._head;
  }

  get tail(): Elem<T> | null {
    return this._tail;
  }

  append(value: T): void {
    if (this.unique && !this.isUnique(value)) {
      return;
    }
    let candidate = this._head;

    if (!candidate) {
      this._head = new Elem(value);
      this._tail = this._head;
    } else {
      if (this._tail) {
        this._tail.next = new Elem<T>(value, this._tail, null);
        this._tail = this._tail.next;
      }
    }

    this._length++;
  }

  prepend(value: T): void {
    if (this.unique && !this.isUnique(value)) {
      return;
    }
    let candidate = this._head;

    if (!candidate) {
      this._head = new Elem(value);
      this._tail = this._head;
    } else {
      this._head = new Elem<T>(value, null, this._head);
    }

    this._length++;
  }

  insert(value: T): void {
    if (!this._head) {
      this.append(value);
      return;
    }

    if (this.unique && !this.isUnique(value)) {
      return;
    }

    let candidate: Elem<T> = this._head;
    let newElem = new Elem(value);
    let run = true;
    while (run) {
      if (candidate.value < value) {
        if (candidate.next) {
          candidate = candidate.next;
        } else {
          candidate.next = newElem;
          newElem.previous = candidate;
          this._tail = newElem;
          run = false;
        }
      } else {
        if (candidate.previous === null) {
          this._head = newElem;
          newElem.next = candidate;
          candidate.previous = newElem;
          run = false;
        } else {
          newElem.previous = candidate.previous;
          newElem.next = candidate;
          candidate.previous.next = newElem;
          candidate.previous = newElem;
          run = false;
        }
      }
    }

    this._length++;
  }

  remove(value: T): T | null {
    let retVal: T | null = null;
    if (!this._head) {
      return null;
    }

    if (this._head.value === value) {
      if (this._tail === this._head) {
        this._tail = null;
      }
      retVal = this._head.value;
      this._head = this._head.next;
      this._length--;
      return retVal;
    }

    let candidate: Elem<T> | null = this._head;
    if (candidate && candidate.next) {
      if (candidate.next.value === value) {
        if (this._tail === candidate.next) {
          this._tail = candidate;
        }
        retVal = candidate.next.value;
        candidate.next = candidate.next.next;
        this._length--;
      }
    }
    return retVal;
  }

  removeFirst(): T | null {
    let retVal: T | null = null;
    if (!this._head) {
      return null;
    }

    retVal = this._head.value;
    if (this._tail === this._head) {
      this._tail = null;
      this._head = null;
    } else {
      if (this._head.next === this._tail) {
        this._head = this._tail;
      } else {
        this._head = this._head.next;
      }
    }
    this._length--;
    return retVal;
  }

  removeLast(): T | null {
    let retVal: T | null = null;
    if (!this._tail) {
      return null;
    }

    retVal = this._tail.value;
    if (this._head === this._tail.previous) {
      this._tail = this._head;
      this._length--;
    } else {
      if (this._head === this._tail) {
        this._head = null;
        this._tail = null;
      } else {
        this._tail = this._tail.previous;
      }
      this._length--;
    }
    return retVal;
  }

  has(value: T): boolean {
    let candidate = this._head;
    if (!candidate) {
      return false;
    }

    while (candidate && candidate.value !== value) {
      candidate = candidate.next;
    }

    return true;
  }

  private isUnique(value: T): boolean {
    if (!this._head) {
      return true;
    }

    let candidate: Elem<T> | null = this._head;
    while (candidate) {
      if (candidate.value === value) {
        return false;
      }
      candidate = candidate.next;
    }
    return true;
  }

  *iterator(): IterableIterator<T> {
    let candidate: Elem<T> | null = this._head;

    while (candidate) {
      yield candidate.value;
      candidate = candidate.next;
    }
  }

  [Symbol.iterator]() {
    return this.iterator();
  }
}
