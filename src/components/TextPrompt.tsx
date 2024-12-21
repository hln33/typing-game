import { Component, Index } from "solid-js";

const TextPrompt: Component<{ userTypedText: string }> = (props) => {
  const prompt = "Type this text!";

  return (
    <div>
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

          return <span class={`text-5xl ${textColor()}`}>{char()}</span>;
        }}
      </Index>
    </div>
  );
};

export default TextPrompt;
