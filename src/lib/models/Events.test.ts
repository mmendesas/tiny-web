import { Events } from './Events';

describe('Events', () => {
  const fn1 = jest.fn();
  const fn2 = jest.fn();

  const hub = new Events();
  it('should register some listeners', () => {
    hub.on('change1', fn1);
    hub.on('change2', fn2);

    expect(hub.events['change1']).toBeDefined();
    expect(hub.events['change2']).toBeDefined();
  });

  it('should execute callback', () => {
    hub.trigger('change1');
    expect(fn1).toBeCalledTimes(1);
    hub.trigger('change2');
    hub.trigger('change2');
    expect(fn2).toBeCalledTimes(2);
  });

  it('should not throw error when call unknown event', () => {
    expect(() => {
      hub.trigger('some-name');
    }).not.toThrow();
  });
});
