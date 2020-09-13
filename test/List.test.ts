import { LinkedList } from '../src';

describe('test', () => {
  let a: LinkedList<number>;
  beforeEach(() => {
    a = new LinkedList<number>();
  });

  it('new List is empty', () => {
    expect(a.length).toBe(0);
  });

  it('adding Element increases length', () => {
    a.add(1);
    expect(a.length).toBe(1);
  });

  it('adding multiple Element increases length further', () => {
    a.add(1);
    a.add(2);
    a.add(3);
    expect(a.length).toBe(3);
  });

  it('adding Element and removing it should yield length of 0', () => {
    a.add(1);
    a.remove(1);
    expect(a.length).toBe(0);
  });

  it('adding multiple Element and removing some has right length', () => {
    a.add(1);
    a.add(2);
    a.add(3);
    a.remove(1);
    a.remove(3);
    expect(a.length).toBe(1);
  });

  it('removing unknown elements does nothing', () => {
    a.add(1);
    a.remove(-1);
    expect(a.length).toBe(1);
  });

  it('find existing element', () => {
    a.add(1);
    a.add(2);
    a.add(3);
    expect(a.find(2)).toBe(2);
  });

  it('do not find non-existing element', () => {
    expect(a.find(2)).toBe(null);
  });
});
