import { createSignal, type Component } from "solid-js";

import logo from "./logo.svg";
import TextPrompt from "./components/TextPrompt";

const App: Component = () => {
  const [typedText, setTypedText] = createSignal("");

  const handleInput = (event: InputEvent) => {
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
