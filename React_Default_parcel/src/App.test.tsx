import { render, screen } from "@testing-library/react";
import App from "./App";

describe("main test", () => {
  beforeEach(() => {

    console.log("테스트 전에 진행될 코드")

  })

  test("기본 테스트 예시", () => {

    expect(1 + 2).toBe(3)

  })

  afterEach(() => {

    console.log("테스트 후에 진행될 코드")

  })

})
test("app", () => {

  render(<App />);
  expect(screen.getByText("hello world!")).toBeVisible()

});