import { Component, Match, Show, Switch } from "solid-js";
import NewLineIcon from "~icons/codicon/newline";

const TextColor = {
  inactive: "text-gray-400",
  correct: "text-yellow-400",
  incorrect: "text-rose-500",
} as const;

const getTextColor = (attempt: string | null, target: string) => {
  if (attempt === null) {
    return TextColor["inactive"];
  }
  console.assert(
    attempt.length === 1 && target.length === 1,
    `should only be comparing single characters -- attempt: ${attempt} target: ${target}`,
  );
  return attempt === target ? TextColor["correct"] : TextColor["incorrect"];
};

const TextPromptCharacter: Component<{
  typedChar: string | null;
  targetChar: string;
  showCaret: boolean;
}> = (props) => {
  const textColor = () => getTextColor(props.typedChar, props.targetChar);

  return (
    <>
      <div class={`relative text-3xl ${textColor()}`}>
        <Switch fallback={<span>{props.targetChar}</span>}>
          <Match when={props.targetChar === "\n"}>
            <NewLineIcon />
          </Match>
          <Match when={props.targetChar === " "}>
            <span class="invisible">_</span>
          </Match>
        </Switch>

        <Show when={props.showCaret}>
          <span
            id="caret"
            class="absolute bottom-0 right-full animate-blink text-yellow-400"
          >
            |
          </span>
        </Show>
      </div>

      {/* force a new line in the flexbox */}
      <Show when={props.targetChar === "\n"}>
        <span class="invisible w-full" />
      </Show>
    </>
  );
};

export default TextPromptCharacter;
