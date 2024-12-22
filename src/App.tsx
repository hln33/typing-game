import { createSignal, Show, type Component } from "solid-js";

import TextPrompt from "./components/TextPrompt";
import Timer from "./components/Timer";
import Summary from "./components/Summary";
import TimeSelect from "./components/TimeSelect";

const INPUT_ID = "textInput";
const prompt =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const App: Component = () => {
  const [typedText, setTypedText] = createSignal("");
  const [isFocused, setIsFocused] = createSignal<boolean>(
    document.activeElement === document?.getElementById(INPUT_ID),
  );
  const [isStarted, setIsStarted] = createSignal(false);
  const [isDone, setIsDone] = createSignal(false);
  const [timeLimit, setTimeLimit] = createSignal(15);

  const handleInput = (event: InputEvent) => {
    if (!isStarted()) {
      setIsStarted(true);
    }

    console.log(isStarted());

    setTypedText((event.target as HTMLInputElement).value);
  };

  const handleTimeLimitChange = (newTimeLimit: number) => {
    setTimeLimit(newTimeLimit);
    setTypedText("");
    setIsStarted(false);
    setIsDone(false);
  };

  const handleGameDone = () => {
    setIsStarted(false);
    setIsDone(true);
  };

  return (
    <div class="bg-slate-800 px-40 border-2 text-center min-h-screen text-white">
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

        <TimeSelect
          selectedTimeLimit={timeLimit()}
          onTimeLimitChange={handleTimeLimitChange}
        />

        <Timer
          secondsLeft={timeLimit()}
          setSecondsLeft={setTimeLimit}
          isActive={isStarted()}
          setDone={handleGameDone}
        />
        <div class="relative">
          <TextPrompt
            displayCaret={isFocused()}
            prompt={prompt}
            userTypedText={typedText()}
          />
          <input
            id={INPUT_ID}
            class="absolute left-0 top-0 size-full opacity-0"
            type="text"
            value={typedText()}
            onInput={handleInput}
            onFocusIn={() => setIsFocused(true)}
            onFocusOut={() => setIsFocused(false)}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
