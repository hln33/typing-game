import { Component, Index } from 'solid-js';

const TextPrompt: Component<{ userTypedText: string }> = (props) => {
  const prompt = 'Type this text!';

  return (
    <div>
      <Index each={prompt.split('')}>
        {(char, index) => {
          const className = () => {
            const isTyped = props.userTypedText.at(index) !== undefined;

            if (isTyped) {
              const isCorrect = props.userTypedText.at(index) === char();
              return isCorrect ? 'correct' : 'incorrect';
            } else {
              return '';
            }
          };

          return <span class={className()}>{char()}</span>;
        }}
      </Index>
    </div>
  );
};

export default TextPrompt;
