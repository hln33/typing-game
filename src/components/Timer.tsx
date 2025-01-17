import { Component, createEffect, onCleanup } from "solid-js";

const Timer: Component<{
  secondsLeft: number;
  isActive: boolean;
  setSecondsLeft: (value: number) => void;
  setDone: () => void;
}> = (props) => {
  let timer: number | undefined;

  createEffect(() => {
    if (props.isActive && timer === undefined) {
      timer = setInterval(() => {
        props.setSecondsLeft(props.secondsLeft - 1);
      }, 1000);
    }

    if (props.secondsLeft === 0) {
      props.setDone();
      clearInterval(timer);
      timer = undefined;
    }

    if (!props.isActive) {
      clearInterval(timer);
      timer = undefined;
    }
  });

  onCleanup(() => clearInterval(timer));

  const formattedTime = () => {
    if (props.secondsLeft <= 0) {
      return "0:00";
    }

    const minutes = Math.floor(props.secondsLeft / 60);
    const seconds = props.secondsLeft % 60;
    const leadingZero = seconds < 10 ? "0" : "";

    return `${minutes}:${leadingZero}${seconds}`;
  };

  return <p class="text-2xl">{formattedTime()}</p>;
};

export default Timer;
