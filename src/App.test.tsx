import { test, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";

import App from "./App";

const user = userEvent.setup();

test("pauses when input is not focused", async () => {
  render(() => <App />);

  await user.click(screen.getByTestId("prompt-input"));
  expect(screen.queryByText("Paused")).toBe(null);
});
