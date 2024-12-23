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
    <div class="relative p-8 pb-40 w-full">
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
