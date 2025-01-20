import { test, expect, describe, afterEach } from "vitest";
import { cleanup, render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal } from "solid-js";

import TextPrompt from "./TextPrompt";

describe("<TextPrompt />", () => {
  const user = userEvent.setup();

  const createTestSignals = () => {
    const [prompt] = createSignal("test prompt");
    const [typedText] = createSignal("test");
    const [active, setActive] = createSignal(true);

    return { prompt, typedText, active, setActive };
  };

  afterEach(() => {
    cleanup();
  });

  test("does not pause when input is active", () => {
    const { prompt, typedText, active, setActive } = createTestSignals();
    setActive(true);

    const { queryByText } = render(() => (
      <TextPrompt
        prompt={prompt()}
        userTypedText={typedText()}
        handleInput={() => {}}
        handlePromptComplete={() => {}}
        isActive={active()}
        setActive={setActive}
      />
    ));

    expect(queryByText("Paused")).toBe(null);
  });

  test("pauses when input is not active", () => {
    const { prompt, typedText, active, setActive } = createTestSignals();
    setActive(false);

    const { queryByText } = render(() => (
      <TextPrompt
        prompt={prompt()}
        userTypedText={typedText()}
        handleInput={() => {}}
        handlePromptComplete={() => {}}
        isActive={active()}
        setActive={setActive}
      />
    ));

    expect(queryByText("Paused")).not.toBeNull();
  });

  test("clicking on the component causes the game to become active", async () => {
    const { prompt, typedText, active, setActive } = createTestSignals();
    setActive(false);

    const { getByTestId } = render(() => (
      <TextPrompt
        prompt={prompt()}
        userTypedText={typedText()}
        handleInput={() => {}}
        handlePromptComplete={() => {}}
        isActive={active()}
        setActive={setActive}
      />
    ));

    await user.click(getByTestId("prompt-input"));
    expect(active()).toBe(true);
  });

  test("clicking off of the element causes the game to become inactive", async () => {
    const { prompt, typedText, active, setActive } = createTestSignals();
    setActive(false);

    const { container, getByTestId } = render(() => (
      <TextPrompt
        prompt={prompt()}
        userTypedText={typedText()}
        handleInput={() => {}}
        handlePromptComplete={() => {}}
        isActive={active()}
        setActive={setActive}
      />
    ));

    await user.click(getByTestId("prompt-input"));
    expect(active()).toBe(true);

    await user.click(container);
    expect(active()).toBe(false);
  });
});
