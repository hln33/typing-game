import { Component, createSignal, Index, Show } from "solid-js";
import PauseIcon from "~icons/solar/pause-bold";

const HIDDEN_INPUT_ID = "hidden-input";

const TextColor = {
  inactive: "text-gray-400",
  correct: "text-yellow-400",
  incorrect: "text-rose-500",
} as const;

const getTextColor = (attempt: string | null, target: string) => {
  if (attempt === null) {
    return "text-gray-400";
  }

  console.assert(
    attempt.length === 1 && target.length === 1,
    `should only be comparing single characters -- attempt: ${attempt} target: ${target}`,
  );
  return attempt === target ? TextColor["correct"] : TextColor["incorrect"];
};

const TextPrompt: Component<{
  prompt: string;
  userTypedText: string;
  handleInput: (event: InputEvent) => void;
}> = (props) => {
  const [isFocused, setIsFocused] = createSignal<boolean>(
    document.activeElement === document?.getElementById(HIDDEN_INPUT_ID),
  );

  // createEffect(() => {
  //   console.log(props.userTypedText);
  //   console.log(props.prompt.split(""));
  // });

  return (
    <div class="relative p-8 pb-40 w-full">
      <div class={`flex flex-wrap gap-1 ${!isFocused() && "blur-sm"}`}>
        <Index each={props.prompt.split("")}>
          {(char, index) => {
            const textColor = () =>
              getTextColor(props.userTypedText.at(index) ?? null, char());

            const isIncorrectNewLine = () =>
              char() === "\n" && textColor() === TextColor["incorrect"];

            const isNextChar = () => index === props.userTypedText.length;

            return (
              <>
                <div class={`relative text-3xl`}>
                  <span class={`whitespace-nowrap ${textColor()}`}>
                    {isIncorrectNewLine() ? <>\n</> : char()}
                  </span>
                  <Show when={isFocused() && isNextChar()}>
                    <span class="absolute right-full animate-blink text-yellow-400">
                      |
                    </span>
                  </Show>
                </div>

                {/* force a new line in the flexbox */}
                <Show when={char() === "\n"}>
                  <span class="invisible w-full" />
                </Show>
              </>
            );
          }}
        </Index>
      </div>

      <textarea
        id={HIDDEN_INPUT_ID}
        class="absolute z-50 inset-0 size-full opacity-0"
        autocomplete="off"
        value={props.userTypedText}
        onInput={(e: InputEvent) => props.handleInput(e)}
        onFocusIn={() => setIsFocused(true)}
        onFocusOut={() => setIsFocused(false)}
      />

      <Show when={!isFocused()}>
        <div class="absolute z-0 inset-0 pt-10 rounded-lg flex flex-col items-center text-gray-300 bg-slate-900/90">
          <PauseIcon class="size-1/4" />
          <span class="relative">
            <span class="text-5xl text-center">Paused</span>
            <span class="absolute bottom-0 left-full text-5xl">...</span>
          </span>
        </div>
      </Show>
    </div>
  );
};

export default TextPrompt;
