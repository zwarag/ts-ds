class Elem<T> {
    value: T;
    next: Elem<T> | null;
    previous: Elem<T> | null;

    constructor(value: T, next?: Elem<T> | null, previous?: Elem<T> | null) {
        this.value = value;
        this.next = next ? next : null;
        this.previous = previous ? previous : null
    }
}

export class List<T> {
    head: Elem<T> | null;
    tail: Elem<T> | null;
    length: number = 0;
    readonly unique: boolean

    constructor(elem?: Elem<T> | null, unique?: boolean) {
        this.head = elem ? elem : null;
        this.tail = elem ? elem : null;
        this.unique = !!unique
    }

    append(value: T): void {
        if(this.unique && !this.isUnique(value)) {
            return;
        }
        let candidate = this.head;

        if (!candidate) {
            this.head = new Elem(value);
            this.tail = this.head;
        } else {
            if (this.tail) {
                this.tail.next = new Elem<T>(value, null, this.tail);
                this.tail = this.tail.next
            }
        }

        this.length++;
    }

    prepend(value: T): void {
        if(this.unique && !this.isUnique(value)) {
            return;
        }
        let candidate = this.head;

        if (!candidate) {
            this.head = new Elem(value);
            this.tail = this.head;
        } else {
            this.head = new Elem<T>(value, this.head, null);
        }

        this.length++;
    }

    insert(value: T): void {
        if(!this.head) {
            this.append(value)
            return;
        }

        if(this.unique && !this.isUnique(value)) {
            return;
        }

        let candidate: Elem<T> = this.head;
        let newElem = new Elem(value);
        let run = true;
        while(run) {
            if(candidate.value < value) {
                if(candidate.next) {
                    candidate = candidate.next
                } else {
                    candidate.next = newElem;
                    newElem.previous = candidate;
                    this.tail = newElem;
                    run = false;
                }
            } else {
                if(candidate.previous === null) {
                    this.head = newElem;
                    newElem.next = candidate;
                    candidate.previous = newElem;
                    run = false;
                } else {
                    newElem.previous = candidate.previous
                    newElem.next = candidate
                    candidate.previous.next = newElem;
                    candidate.previous = newElem;
                    run = false
                }
            }
        }

        this.length++;

    }

    remove(value: T): T | null {
        let retVal: T | null = null;
        if (!this.head) {
            return null;
        }

        if (this.head.value === value) {
            if (this.tail === this.head) {
                this.tail = null;
            }
            retVal = this.head.value
            this.head = this.head.next;
            this.length--;
            return retVal;
        }

        let candidate: Elem<T> | null = this.head;
        if (candidate && candidate.next) {
            if (candidate.next.value === value) {
                if (this.tail === candidate.next) {
                    this.tail = candidate;
                }
                retVal = candidate.next.value
                candidate.next = candidate.next.next;
                this.length--;
            }
        }
        return retVal;
    }

    removeFirst(): T | null {
        let retVal: T | null = null;
        if (!this.head) {
            return null;
        }

        retVal = this.head.value;
        if (this.tail === this.head) {
            this.tail = null
            this.head = null
        } else {
            if(this.head.next === this.tail) {
                this.head = this.tail;
            } else {
                this.head = this.head.next
            }
        }
        this.length--;
        return retVal;
    }

    removeLast(): T | null {
        let retVal: T | null = null
        if (!this.tail) {
            return null;
        }

        retVal = this.tail.value
        if (this.head === this.tail.previous) {
            this.tail = this.head
            this.length--;
        } else {
            if(this.head === this.tail) {
                this.head = null
                this.tail = null
            } else {
                this.tail = this.tail.previous
            }
            this.length--;
        }
        return retVal

    }

    has(value: T): boolean {
        let candidate = this.head;
        if (!candidate) {
            return false;
        }

        while (candidate && candidate.value !== value) {
            candidate = candidate.next;
        }

        return true;
    }

    isUnique(value: T): boolean {
        if(!this.head) {
            return true;
        }

        let candidate: Elem<T> | null = this.head;
        while (candidate) {
            if(candidate.value === value) {
                return false;
            }
            candidate = candidate.next
        }
        return true;
    }
}
