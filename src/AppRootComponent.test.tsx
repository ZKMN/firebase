import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import { configureStore } from './redux-base/configureStore';
import { AppRootComponent, IAppRootComponent } from './AppRootComponent';
import { routerTestProps } from 'utils';

const { history } = routerTestProps();

let wrapper: ShallowWrapper;

const props: IAppRootComponent = {
  history,
  store: {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn(),
  } as unknown as ReturnType<typeof configureStore>,
};

describe('AppRootComponent', () => {
  beforeEach(() => {
    wrapper = shallow(<AppRootComponent {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
