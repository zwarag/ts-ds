import { DoubleLinkedList } from '../src';

describe('test unordered not unique list', () => {
  let l: DoubleLinkedList<number>;
  beforeEach(() => {
    l = new DoubleLinkedList<number>();
  });

  it('new List is empty', () => {
    expect(l.length).toBe(0);
  });

  it('adding Element increases length', () => {
    l.append(1);
    expect(l.length).toBe(1);
  });

  it('adding multiple Element increases length further', () => {
    l.append(1);
    l.append(2);
    l.append(3);
    expect(l.head?.value).toBe(1);
    expect(l.tail?.value).toBe(3);
    expect(l.length).toBe(3);
  });

  it('adding Element and removing it should yield length of 0', () => {
    l.append(1);
    l.remove(1);
    expect(l.length).toBe(0);
    expect(l.head).toBeNull();
    expect(l.tail).toBeNull();
  });

  it('adding Element and removing last should yield length of 0', () => {
    l.append(1);
    l.removeLast();
    expect(l.length).toBe(0);
    expect(l.head).toBeNull();
    expect(l.tail).toBeNull();
  });

  it('adding Element and removing first should yield length of 0', () => {
    l.append(1);
    l.removeFirst();
    expect(l.length).toBe(0);
    expect(l.head).toBeNull();
    expect(l.tail).toBeNull();
  });

  it('adding multiple Elements and removing last should yield length appropriate length and truthy', () => {
    l.append(1);
    l.append(2);
    l.append(3);
    expect(l.removeLast()).toBe(3);
    expect(l.head).toBeTruthy();
    expect(l.tail).toBeTruthy();
    expect(l.length).toBe(2);
  });

  it('adding multiple Element and removing some has right length and truthy', () => {
    l.append(1);
    l.append(2);
    l.append(3);
    l.remove(1);
    l.remove(3);
    expect(l.head).toBeTruthy();
    expect(l.tail).toBeTruthy();
    expect(l.length).toBe(1);
  });

  it('removing unknown elements does nothing', () => {
    l.append(1);
    expect(l.remove(-1)).toBeNull();
    expect(l.length).toBe(1);
  });

  it('removing first element from empty list should do nothing', () => {
    expect(l.removeFirst()).toBeNull();
    expect(l.head).toBeNull();
    expect(l.tail).toBeNull();
    expect(l.length).toBe(0);
  });

  it('removing last element from empty list should do nothing', () => {
    expect(l.removeLast()).toBeNull();
    expect(l.head).toBeNull();
    expect(l.tail).toBeNull();
    expect(l.length).toBe(0);
  });

  it('find existing element', () => {
    l.append(1);
    l.append(2);
    l.append(3);
    expect(l.has(2)).toBeTruthy();
  });

  it('do not find non-existing element', () => {
    l.append(1);
    l.append(3);
    expect(l.has(2)).toBeTruthy();
  });

  it('removing the last element should yield the previous inserted element', () => {
    l.append(1);
    l.append(2);
    l.append(3);
    expect(l.tail?.value).toBe(3);
    expect(l.removeLast()).toBe(3);
    expect(l.length).toBe(2);
  });

  it('removing the first element should yield the first inserted element', () => {
    l.append(1);
    l.append(2);
    l.append(3);
    expect(l.removeFirst()).toBe(1);
    expect(l.length).toBe(2);
  });

  it('prepending should put the new element at the first position', () => {
    l.append(2);
    l.append(3);
    l.prepend(1);
    expect(l.head?.value).toBe(1);
  });

  it('inserting element (like prepend) should put the new element at the correct position', () => {
    l.insert(2);
    l.insert(3);
    l.insert(1);
    expect(l.head?.value).toBe(1);
    expect(l.head?.next?.value).toBe(2);
    expect(l.head?.next?.next?.value).toBe(3);
    expect(l.length).toBe(3);
  });

  it('inserting element (center) should put the new element at the correct position', () => {
    l.insert(3);
    l.insert(1);
    l.insert(2);
    expect(l.head?.value).toBe(1);
    expect(l.head?.next?.value).toBe(2);
    expect(l.head?.next?.next?.value).toBe(3);
    expect(l.length).toBe(3);
  });

  it('inserting element (reverse order) should put the new element at the correct position', () => {
    l.insert(3);
    l.insert(2);
    l.insert(1);
    expect(l.head?.value).toBe(1);
    expect(l.head?.next?.value).toBe(2);
    expect(l.head?.next?.next?.value).toBe(3);
    expect(l.length).toBe(3);
  });

  it('inserting on empty list should add new element', () => {
    l.insert(2);
    expect(l.head?.value).toBe(2);
    expect(l.length).toBe(1);
  });

  it('inserting duplicate value in unique list should not be possible', () => {
    l = new DoubleLinkedList<number>(null, true);
    l.insert(1);
    l.insert(1);
    expect(l.length).toBe(1);
    expect(l.head?.next).toBeNull();
  });
});
