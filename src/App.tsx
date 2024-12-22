import { createSignal, type Component } from "solid-js";

import logo from "./logo.svg";
import TextPrompt from "./components/TextPrompt";
import Timer from "./components/Timer";

const App: Component = () => {
  const [typedText, setTypedText] = createSignal<string>("");
  const [isStarted, setIsStarted] = createSignal(false);

  const handleInput = (event: InputEvent) => {
    if (isStarted() === false) {
      setIsStarted(true);
    }

    setTypedText((event.target as HTMLInputElement).value);
  };

  return (
    <div class="text-center">
      <header class="bg-slate-800 min-h-screen flex flex-col items-center justify-center text-white">
        <img
          src={logo}
          class="h-80"
          alt="logo"
        />

        <Timer
          active={isStarted()}
          setActive={setIsStarted}
        />
        <TextPrompt userTypedText={typedText()} />
        <input
          class="text-black"
          type="text"
          value={typedText()}
          onInput={handleInput}
        />
      </header>
    </div>
  );
};

export default App;
