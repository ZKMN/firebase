import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import { RouteChildrenProps } from 'react-router-dom';

import { MainRoutes } from './MainRoutes';
import { routerTestProps } from 'utils';

let wrapper: ShallowWrapper;

const { history, location, match } = routerTestProps();

const props: RouteChildrenProps = {
  location,
  history,
  match,
};

describe('MainRoutes', () => {
  beforeEach(() => {
    wrapper = shallow(<MainRoutes {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
