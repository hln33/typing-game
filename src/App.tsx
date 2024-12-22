import { createSignal, Show, type Component } from "solid-js";

import TextPrompt from "./components/TextPrompt";
import Timer from "./components/Timer";
import Summary from "./components/Summary";

const INPUT_ID = "textInput";
const prompt = "type this!";

const App: Component = () => {
  const [typedText, setTypedText] = createSignal("");
  const [isFocused, setIsFocused] = createSignal<boolean>(
    document.activeElement === document?.getElementById(INPUT_ID),
  );
  const [isStarted, setIsStarted] = createSignal(false);
  const [isDone, setIsDone] = createSignal(false);

  const handleInput = (event: InputEvent) => {
    if (isStarted() === false) {
      setIsStarted(true);
    }
    setTypedText((event.target as HTMLInputElement).value);
  };

  return (
    <div
      class="bg-slate-800 border-2 text-center min-h-screen text-white"
      onClick={() => {
        console.log("here");
        document.getElementById(INPUT_ID)?.focus();
        setIsFocused(true);
      }}
    >
      <header>
        <h1 class="py-16 text-6xl">Code Type</h1>
      </header>

      <main class="py-16 flex flex-col gap-4 items-center justify-center">
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
          isFocused={isFocused()}
          prompt={prompt}
          userTypedText={typedText()}
        />
        <input
          id={INPUT_ID}
          class="opacity-0"
          type="text"
          value={typedText()}
          onInput={handleInput}
          onFocusOut={() => setIsFocused(false)}
        />
      </main>
    </div>
  );
};

export default App;
