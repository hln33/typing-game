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
    return (correctChars.length / props.prompt.length) * 100;
  };

  return (
    <section>
      <p>
        <span class="font-bold">What you typed</span>:{" "}
        {props.typedText.slice(0, props.prompt.length)}
      </p>
      <p>
        <span class="font-bold">What was given</span>: {props.prompt}
      </p>
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
