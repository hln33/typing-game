import { Component, createSignal, For, Index, Show } from "solid-js";

const HIDDEN_INPUT_ID = "textInput";

const TextPrompt: Component<{
  prompt: string;
  userTypedText: string;
  handleInput: (event: InputEvent) => void;
}> = (props) => {
  const [isFocused, setIsFocused] = createSignal<boolean>(
    document.activeElement === document?.getElementById(HIDDEN_INPUT_ID),
  );

  const userProgress = () => props.prompt.slice(0, props.userTypedText.length);

  const getTextColor = (attempt: string | null, target: string) => {
    if (attempt === null) {
      return "text-gray-400";
    }
    return attempt === target ? "text-yellow-400" : "text-rose-500";
  };

  return (
    <div class="relative">
      <Show when={isFocused()}>
        <div
          id="caret"
          class="absolute flex gap-1 text-5xl"
        >
          <For each={userProgress().split("")}>
            {(char, _index) => (
              <span class="invisible whitespace-pre">{char}</span>
            )}
          </For>
          <span class="absolute animate-blink text-yellow-400 left-full">
            |
          </span>
        </div>
      </Show>

      <div class="flex flex-wrap gap-1">
        <Index each={props.prompt.split("")}>
          {(char, index) => {
            const textColor = () =>
              getTextColor(props.userTypedText.at(index) ?? null, char());

            return (
              <span class={`text-5xl whitespace-pre ${textColor()}`}>
                {char()}
              </span>
            );
          }}
        </Index>
      </div>

      <input
        id={HIDDEN_INPUT_ID}
        class="absolute left-0 top-0 size-full opacity-0"
        type="text"
        value={props.userTypedText}
        onInput={(e: InputEvent) => props.handleInput(e)}
        onFocusIn={() => setIsFocused(true)}
        onFocusOut={() => setIsFocused(false)}
      />
    </div>
  );
};

export default TextPrompt;
