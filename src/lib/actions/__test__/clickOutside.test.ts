// @ts-nocheck
import { render } from '@testing-library/svelte';
import { clickOutside } from '../clickOutside';
import Test from './Test.svelte';

describe('clickOutside testing', () => {
  test('should dispatch outclick event when clicked outside the node', () => {
    const node = document.createElement('div');
    const handleClick = jest.fn();
    node.addEventListener('outclick', handleClick);

    render(Test, { attachTo: node });
    const outsideNode = document.createElement('div');
    document.body.appendChild(outsideNode);

    clickOutside(node);

    outsideNode.click();

    expect(handleClick).toHaveBeenCalledTimes(1);

    document.body.removeChild(outsideNode);
  });

  test('should not dispatch outclick event when clicked inside the node', () => {
    const node = document.createElement('div');
    const handleClick = jest.fn();
    node.addEventListener('outclick', handleClick);

    render(Test, { attachTo: node });

    clickOutside(node);

    node.click();

    expect(handleClick).not.toHaveBeenCalled();
  });
});
