import apiClient from "./apiClient";

describe("apiClient", () => {
  it("apiClient", () => {
    expect(apiClient.get("")).toMatchSnapshot();
  });
});
