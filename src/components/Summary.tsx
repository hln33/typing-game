import { Component } from "solid-js";

const Summary: Component<{
  typedText: string;
  prompt: string;
  secondsTaken: number;
}> = (props) => {
  const accuracyPercentage = () => {
    const correctChars = props.prompt
      .split("")
      .filter((ch, index) => ch === props.typedText[index]);
    return (correctChars.length / props.typedText.length) * 100;
  };

  return (
    <section>
      <p>
        <span class="font-bold">Time taken</span>: {props.secondsTaken}
      </p>
      <p>
        <span class="font-bold">Accuracy</span>: {accuracyPercentage()}%
      </p>
    </section>
  );
};

export default Summary;
