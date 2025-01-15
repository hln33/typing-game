import {
  Accessor,
  Component,
  createEffect,
  Index,
  Setter,
  Show,
} from "solid-js";
import PauseIcon from "~icons/solar/pause-bold";

import TextPromptCharacter from "./TextPromptCharacter";

const HIDDEN_INPUT_ID = "hidden-input";

const TextPrompt: Component<{
  prompt: Accessor<string>;
  userTypedText: Accessor<string>;
  handleInput: (event: InputEvent) => void;
  handlePromptComplete: () => void;
  isActive: Accessor<boolean>;
  setActive: Setter<boolean>;
}> = (props) => {
  createEffect(() => {
    if (props.userTypedText().length === props.prompt().length) {
      props.handlePromptComplete();
    }
  });

  return (
    <section
      class="relative w-full p-8 pb-40"
      data-testid="prompt-input"
      tabIndex="1"
      onFocusIn={() => {
        props.setActive(true);
        document.getElementById(HIDDEN_INPUT_ID)?.focus();
      }}
      onFocusOut={() => {
        props.setActive(false);
        document.getElementById(HIDDEN_INPUT_ID)?.blur();
      }}
    >
      <div class={`flex flex-wrap gap-1 ${!props.isActive() && "blur-sm"}`}>
        <Index each={props.prompt().split("")}>
          {(char, index) => {
            const isNextChar = () => index === props.userTypedText().length;
            return (
              <TextPromptCharacter
                targetChar={char()}
                typedChar={props.userTypedText().at(index) ?? null}
                showCaret={props.isActive() && isNextChar()}
              />
            );
          }}
        </Index>
      </div>

      <textarea
        id={HIDDEN_INPUT_ID}
        class="opacity-0"
        autocomplete="off"
        value={props.userTypedText()}
        onInput={(e: InputEvent) => props.handleInput(e)}
      />

      <Show when={!props.isActive()}>
        <div class="absolute inset-0 z-0 flex flex-col items-center rounded-lg bg-slate-900/90 pt-10 text-gray-300">
          <PauseIcon class="size-1/4" />
          <label class="relative">
            <span class="text-center text-5xl">Paused</span>
            <span class="absolute bottom-0 left-full text-5xl">...</span>
          </label>
        </div>
      </Show>
    </section>
  );
};

export default TextPrompt;
