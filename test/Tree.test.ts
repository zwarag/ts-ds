import { Tree } from '../src';

describe('test Tree', () => {
  let a: Tree<number>;
  beforeEach(() => {
    a = new Tree<number>(0);
  });

  it('new Tree has no leaves', () => {
    expect(a.children.length).toBe(0);
  });

  it('new Tree has no parent', () => {
    expect(a.parent).toBe(null);
  });

  it('adding child', () => {
    a.children.push(new Tree<number>(1));
    a.children.push(new Tree<number>(2));

    expect(a.children.length).toBe(2);
  });

  it('removing child', () => {
    a.children.push(new Tree<number>(1, a));
    a.children.push(new Tree<number>(2, a));

    expect(a.children.length).toBe(2);
    expect(a.children[0].parent).toBeTruthy();
    expect(a.children[1].parent).toBeTruthy();
  });
});
