import { Component, createSignal, Index, Show } from "solid-js";

const HIDDEN_INPUT_ID = "hidden-input";

const TextPrompt: Component<{
  prompt: string;
  userTypedText: string;
  handleInput: (event: InputEvent) => void;
}> = (props) => {
  const [isFocused, setIsFocused] = createSignal<boolean>(
    document.activeElement === document?.getElementById(HIDDEN_INPUT_ID),
  );

  const getTextColor = (attempt: string | null, target: string) => {
    if (attempt === null) {
      return "text-gray-400";
    }

    console.assert(
      attempt.length === 1 && target.length === 1,
      `should only be comparing single characters -- attempt: ${attempt} target: ${target}`,
    );
    return attempt === target ? "text-yellow-400" : "text-rose-500";
  };

  return (
    <div class="relative">
      <div class="flex flex-wrap gap-1">
        <Index each={props.prompt.split("")}>
          {(char, index) => {
            const textColor = () =>
              getTextColor(props.userTypedText.at(index) ?? null, char());
            const isNextChar = () => index === props.userTypedText.length;

            return (
              <div class="relative text-5xl">
                <span class={`whitespace-pre ${textColor()}`}>{char()}</span>
                <Show when={isFocused() && isNextChar()}>
                  <span class="absolute right-full animate-blink text-yellow-400">
                    |
                  </span>
                </Show>
              </div>
            );
          }}
        </Index>
      </div>

      <input
        id={HIDDEN_INPUT_ID}
        class="absolute left-0 top-0 size-full opacity-0"
        type="text"
        autocomplete="off"
        value={props.userTypedText}
        onInput={(e: InputEvent) => props.handleInput(e)}
        onFocusIn={() => setIsFocused(true)}
        onFocusOut={() => setIsFocused(false)}
      />
    </div>
  );
};

export default TextPrompt;
