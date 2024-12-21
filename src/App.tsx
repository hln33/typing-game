import { createEffect, createSignal, type Component } from "solid-js";

import logo from "./logo.svg";
import TextPrompt from "./components/TextPrompt";

const App: Component = () => {
  const [typedText, setTypedText] = createSignal("");
  createEffect(() => console.log(typedText()));

  const handleInput = (event: InputEvent) => {
    setTypedText((event.target as HTMLInputElement).value);
  };

  return (
    <div class="text-center">
      <header class="bg-slate-800 min-h-screen flex flex-col items-center justify-center text-white">
        <img
          src={logo}
          class="logo-spin h-80"
          alt="logo"
        />

        <TextPrompt userTypedText={typedText()} />
        <input
          type="text"
          value={typedText()}
          onInput={handleInput}
        />
      </header>
    </div>
  );
};

export default App;
