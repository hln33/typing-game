import { Component, For, Index } from "solid-js";

const TextPrompt: Component<{ userTypedText: string }> = (props) => {
  const prompt = "Type this text!";
  const userProgress = () => prompt.substring(0, props.userTypedText.length);

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
        <Index each={prompt.split("")}>
          {(char, index) => {
            const textColor = () => {
              const isTyped = props.userTypedText.at(index) !== undefined;

              if (isTyped) {
                const isCorrect = props.userTypedText.at(index) === char();
                return isCorrect ? "text-yellow-400" : "text-rose-500";
              } else {
                return "text-gray-400";
              }
            };

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
