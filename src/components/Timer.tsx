import { Component, createEffect, createSignal, onCleanup } from "solid-js";

const Timer: Component<{
  isActive: boolean;
  setIsActive: (state: boolean) => void;
  setDone: () => void;
}> = (props) => {
  const [secondsLeft, setSecondsLeft] = createSignal(5);
  let timer: number | null = null;

  createEffect(() => {
    if (props.isActive && timer === null) {
      timer = setInterval(() => {
        setSecondsLeft(secondsLeft() - 1);
      }, 1000);
    }

    if (secondsLeft() === 0 && timer !== null) {
      props.setIsActive(false);
      props.setDone();
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
      {formattedTime()} -- {props.isActive.toString()}
    </p>
  );
};

export default Timer;
