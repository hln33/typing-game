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
    <div>
      <p>What you typed: {props.typedText.slice(0, props.prompt.length)}</p>
      <p>What was given: {props.prompt}</p>
      <p>Time taken: {props.secondsTaken}</p>
      <p>Accuracy: {accuracyPercentage()}%</p>
    </div>
  );
};

export default Summary;
