import { Component, For, Index } from "solid-js";

const TextPrompt: Component<{ prompt: string; userTypedText: string }> = (
  props,
) => {
  const userProgress = () => props.prompt.slice(0, props.userTypedText.length);

  const getTextColor = (attempt: string | null, target: string) => {
    if (attempt === null) {
      return "text-gray-400";
    }
    return attempt === target ? "text-yellow-400" : "text-rose-500";
  };

  return (
    <div>
      <div
        id="caret"
        class="absolute flex gap-1 text-5xl"
      >
        <For each={userProgress().split("")}>
          {(char, _index) => (
            <span class="invisible whitespace-pre">{char}</span>
          )}
        </For>
        <span class="absolute animate-blink text-yellow-400 left-full">|</span>
      </div>

      <div class="flex gap-1">
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
    </div>
  );
};

export default TextPrompt;
