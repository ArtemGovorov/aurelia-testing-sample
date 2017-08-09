import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('MyComponent', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(
        // PLATFORM.moduleName('resources/elements/another.html') &&
        // PLATFORM.moduleName('resources/elements/another') &&
        PLATFORM.moduleName('resources/elements/my-component.html') &&
        PLATFORM.moduleName('resources/elements/my-component')
      )
      .inView('<my-component name.bind="someProperty"></my-component>')
      .boundTo({ someProperty: 'Foo' });

    component.bootstrap(aurelia => {
      return aurelia.use
        .standardConfiguration()
        .defaultResources();
        // .feature('resources');
    });
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
