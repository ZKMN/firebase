import {
  XHRMethod,
  createActionType,
  createRequestAction, 
} from "utils";

describe("createRequestAction", () => {
  it("should return function", () => {
    const TEST_GET = createActionType("TEST", XHRMethod.Get);
    const requestAction = createRequestAction(TEST_GET, "/test");

    expect(typeof requestAction).toEqual("function");
  });

  it("should return action with payload", () => {
    const TEST_GET = createActionType("TEST_GET", XHRMethod.Get);
    const requestActionCreator = createRequestAction(TEST_GET, "/test");
    const { successCallback, payload, type } = requestActionCreator({ payload: { id: 1 } });

    expect(type).toEqual(TEST_GET.REQUEST);
    expect(payload).toEqual({ id: 1 });

    const success = successCallback({ test: "test" });

    expect(success).toEqual({
      type: TEST_GET.SUCCESS,
      data: { test: "test" },
    });
  });
});
