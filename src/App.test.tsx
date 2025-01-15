import { test, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";

import App from "./App";

const user = userEvent.setup();

test("does not pause when input is focused", async () => {
  render(() => <App />);

  await user.click(screen.getByTestId("prompt-input"));
  expect(screen.queryByText("Paused")).toBe(null);
});
