import { createSignal, type Component } from "solid-js";

import TextPrompt from "./components/TextPrompt";
import Timer from "./components/Timer";
import Summary from "./components/Summary";
import TimeSelect from "./components/TimeSelect";

const DEFAULT_TIME_LIMIT = 15;
const DUMMY_PROMPT = "p\nprint('hello world!')";

const App: Component = () => {
  const [typedText, setTypedText] = createSignal("");
  const [active, setActive] = createSignal(false);
  const [timeLimit, setTimeLimit] = createSignal(DEFAULT_TIME_LIMIT);
  const [summaryVisible, setSummaryVisible] = createSignal(false);

  const handleTextInput = (event: InputEvent) => {
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

  const handleSummaryClose = () => {
    setSummaryVisible(false);
    setTypedText("");
    setActive(false);
    setTimeLimit(DEFAULT_TIME_LIMIT);
  };

  return (
    <div class="bg-slate-800 px-40 border-2 text-center min-h-screen text-white">
      <header>
        <h1 class="py-16 text-6xl">Code Type</h1>
      </header>

      <main class="py-16 flex flex-col gap-4 items-center justify-center">
        <Summary
          visible={summaryVisible()}
          onInteractOutside={() => handleSummaryClose()}
          onCloseButtonClick={() => handleSummaryClose()}
          typedText={typedText()}
          prompt={DUMMY_PROMPT}
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
          prompt={DUMMY_PROMPT}
          userTypedText={typedText()}
          handleInput={handleTextInput}
        />
      </main>
    </div>
  );
};

export default App;
