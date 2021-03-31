import { configureStore } from "./configureStore";
import { routerTestProps } from 'utils';

const { history } = routerTestProps();

describe("configureStore", () => {
  it("matches snapshot configureStore", () => {
    expect(configureStore(history)).toMatchSnapshot();
  });
});
