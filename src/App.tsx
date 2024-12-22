import { createSignal, type Component } from "solid-js";

import TextPrompt from "./components/TextPrompt";
import Timer from "./components/Timer";
import Summary from "./components/Summary";
import TimeSelect from "./components/TimeSelect";

const prompt =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const App: Component = () => {
  const [typedText, setTypedText] = createSignal("");
  const [active, setActive] = createSignal(false);
  const [timeLimit, setTimeLimit] = createSignal(15);
  const [summaryVisible, setSummaryVisible] = createSignal(false);

  const handleInput = (event: InputEvent) => {
    if (!active()) {
      setActive(true);
    }
    setTypedText((event.target as HTMLInputElement).value);
  };

  const handleTimeLimitChange = (newTimeLimit: number) => {
    setTimeLimit(newTimeLimit);
    setTypedText("");
    setActive(false);
  };

  const handleGameDone = () => {
    setActive(false);
    setSummaryVisible(true);
  };

  return (
    <div class="bg-slate-800 px-40 border-2 text-center min-h-screen text-white">
      <header>
        <h1 class="py-16 text-6xl">Code Type</h1>
      </header>

      <main class="py-16 flex flex-col gap-4 items-center justify-center">
        <Summary
          visible={summaryVisible()}
          onInteractOutside={() => setSummaryVisible(false)}
          onCloseButtonClick={() => setSummaryVisible(false)}
          typedText={typedText()}
          prompt={prompt}
          secondsTaken={60}
        />

        <TimeSelect
          class="mb-8"
          selectedTimeLimit={timeLimit()}
          onTimeLimitChange={handleTimeLimitChange}
        />

        <Timer
          secondsLeft={timeLimit()}
          setSecondsLeft={setTimeLimit}
          isActive={active()}
          setDone={handleGameDone}
        />
        <TextPrompt
          prompt={prompt}
          userTypedText={typedText()}
          handleInput={handleInput}
        />
      </main>
    </div>
  );
};

export default App;
