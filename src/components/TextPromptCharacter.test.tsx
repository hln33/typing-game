import { cleanup, render } from "@solidjs/testing-library";
import { afterEach, describe, expect, test } from "vitest";
import TextPromptCharacter from "./TextPromptCharacter";

const TEST_ID = "prompt-character";

describe("<TextPromptCharacter />", () => {
  afterEach(() => {
    cleanup();
  });

  test("it has a gray color when nothing has been inputted", () => {
    const { getByTestId } = render(() => (
      <TextPromptCharacter
        typedChar={null}
        targetChar="T"
        showCaret={false}
      />
    ));

    expect(getByTestId(TEST_ID)).toHaveClass("text-gray-400");
  });

  test("it has a red color when the wrong character has been inputted", () => {
    const { getByTestId } = render(() => (
      <TextPromptCharacter
        typedChar="Z"
        targetChar="T"
        showCaret={false}
      />
    ));

    expect(getByTestId(TEST_ID)).toHaveClass("text-rose-500");
  });

  test("it has a yellow color when the correct character has been inputted", () => {
    const { getByTestId } = render(() => (
      <TextPromptCharacter
        typedChar="T"
        targetChar="T"
        showCaret={false}
      />
    ));

    expect(getByTestId(TEST_ID)).toHaveClass("text-yellow-400");
  });
});
