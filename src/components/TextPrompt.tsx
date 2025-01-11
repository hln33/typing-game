import { Component, createSignal, Index, Show } from "solid-js";
import PauseIcon from "~icons/solar/pause-bold";

import TextPromptCharacter from "./TextPromptCharacter";

const HIDDEN_INPUT_ID = "hidden-input";

const TextPrompt: Component<{
  prompt: string;
  userTypedText: string;
  handleInput: (event: InputEvent) => void;
}> = (props) => {
  const [isFocused, setIsFocused] = createSignal<boolean>(
    document.activeElement === document?.getElementById(HIDDEN_INPUT_ID),
  );

  return (
    <section class="relative w-full p-8 pb-40">
      <div class={`flex flex-wrap gap-1 ${!isFocused() && "blur-sm"}`}>
        <Index each={props.prompt.split("")}>
          {(char, index) => {
            const isNextChar = () => index === props.userTypedText.length;
            return (
              <TextPromptCharacter
                targetChar={char()}
                typedChar={props.userTypedText.at(index) ?? null}
                showCaret={isFocused() && isNextChar()}
              />
            );
          }}
        </Index>
      </div>

      <textarea
        id={HIDDEN_INPUT_ID}
        class="absolute inset-0 z-50 size-full opacity-0"
        autocomplete="off"
        value={props.userTypedText}
        onInput={(e: InputEvent) => props.handleInput(e)}
        onFocusIn={() => setIsFocused(true)}
        onFocusOut={() => setIsFocused(false)}
      />

      <Show when={!isFocused()}>
        <div class="absolute inset-0 z-0 flex flex-col items-center rounded-lg bg-slate-900/90 pt-10 text-gray-300">
          <PauseIcon class="size-1/4" />
          <span class="relative">
            <span class="text-center text-5xl">Paused</span>
            <span class="absolute bottom-0 left-full text-5xl">...</span>
          </span>
        </div>
      </Show>
    </section>
  );
};

export default TextPrompt;
