import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('MyComponent', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('my-component.html') && PLATFORM.moduleName('my-component'))
      .inView('<my-component name.bind="someProperty"></my-component>')
      .boundTo({ someProperty: 'Foo' });
  });

  afterEach(() => {
    component.dispose();
  });

  it('can render', done => {
    component.create(bootstrap)
      .then(() => {
        const nameElement = document.querySelector('.mycomponent');
        expect(nameElement.innerHTML).toBe('Foo');
      })
      .then(done);
  });
});
