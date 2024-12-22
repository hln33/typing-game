import { createSignal, Show, type Component } from "solid-js";

import TextPrompt from "./components/TextPrompt";
import Timer from "./components/Timer";
import Summary from "./components/Summary";

const App: Component = () => {
  const [typedText, setTypedText] = createSignal<string>("");
  const [isStarted, setIsStarted] = createSignal(false);
  const [isDone, setIsDone] = createSignal(false);

  const prompt = "type this!";

  const handleInput = (event: InputEvent) => {
    if (isStarted() === false) {
      setIsStarted(true);
    }

    setTypedText((event.target as HTMLInputElement).value);
  };

  return (
    <div class="bg-slate-800  text-center text-white">
      <header class="bg-slate-800">
        <h1>Code Type</h1>
      </header>

      <main class="min-h-screen flex flex-col items-center justify-center">
        <Show when={isDone()}>
          <Summary
            typedText={typedText()}
            prompt={prompt}
            secondsTaken={60}
          />
        </Show>

        <Timer
          isActive={isStarted()}
          setIsActive={setIsStarted}
          setDone={() => setIsDone(true)}
        />
        <TextPrompt
          prompt={prompt}
          userTypedText={typedText()}
        />
        <input
          class="text-black"
          type="text"
          value={typedText()}
          onInput={handleInput}
        />
      </main>
    </div>
  );
};

export default App;
