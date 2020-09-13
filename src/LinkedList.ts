class Elem<T> {
  value: T;
  next: Elem<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  head: Elem<T> | null;
  length: number = 0;

  constructor(elem?: Elem<T>) {
    this.head = elem ? elem : null;
  }

  add(value: T): void {
    let candidate = this.head;

    if (!candidate) {
      this.head = new Elem(value);
    } else {
      while (candidate.next) {
        candidate = candidate.next;
      }
      candidate.next = new Elem<T>(value);
    }

    this.length++;
  }

  remove(value: T): void {
    if (!this.head) {
      return;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      this.length--;
      return;
    }

    let candidate: Elem<T> | null = this.head;
    if (candidate) {
      if (candidate.next) {
        if (candidate.next.value === value) {
          candidate.next = candidate.next.next;
          this.length--;
        }
      }
    }
  }

  find(value: T): T | null {
    let candidate = this.head;
    if (!candidate) {
      return null;
    }

    while (candidate && candidate.value !== value) {
      candidate = candidate.next;
    }

    return candidate ? candidate.value : null;
  }
}
