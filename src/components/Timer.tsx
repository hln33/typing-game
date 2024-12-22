import { Component, createEffect, createSignal, onCleanup } from "solid-js";

const Timer: Component<{
  active: boolean;
  setActive: (state: boolean) => void;
}> = (props) => {
  const [secondsLeft, setSecondsLeft] = createSignal(5);
  let timer: number | null = null;

  createEffect(() => {
    if (props.active && timer === null) {
      timer = setInterval(() => {
        setSecondsLeft(secondsLeft() - 1);
      }, 1000);
    }

    if (secondsLeft() === 0 && timer !== null) {
      props.setActive(false);
      clearInterval(timer);
    }
  });

  onCleanup(() => {
    if (timer === null) return;

    clearInterval(timer);
  });

  const formattedTime = () => {
    if (secondsLeft() <= 0) {
      return "0:00";
    }

    const minutes = Math.floor(secondsLeft() / 60);
    const seconds = secondsLeft() % 60;
    const leadingZero = seconds < 10 ? "0" : "";

    return `${minutes}:${leadingZero}${seconds}`;
  };

  return (
    <p>
      {formattedTime()} -- {props.active.toString()}
    </p>
  );
};

export default Timer;
