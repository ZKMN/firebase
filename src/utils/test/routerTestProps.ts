import { createBrowserHistory } from 'history';
import { match } from 'react-router';

export const routerTestProps = (path = '/route/:id', params = { id: "1" } ) => {
  const history = createBrowserHistory();
  const match: match<{ id: string }> = {
    isExact: false,
    path,
    url: path.replace(':id', '1'),
    params,
  };
  const location = {
    state: {},
    key: '1',
    pathname: '',
    search: '',
    hash: '',
  };

  return {
    history,
    location,
    match, 
  };
};