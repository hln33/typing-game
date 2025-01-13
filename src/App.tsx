import { createSignal, type Component } from "solid-js";

import TextPrompt from "./components/TextPrompt";
import Timer from "./components/Timer";
import Summary from "./components/Summary";
import SelectTime from "./components/SelectTime";
import SelectProgrammingLanguage from "./components/SelectProgrammingLanguage";
import { ProgrammingLanguage } from "./types/programmingLanguages";

const DEFAULT_TIME_LIMIT = 15;
const DUMMY_PROMPT = "p\nprint('hello world!')";

const App: Component = () => {
  const [programmingLanguage, setProgrammingLanguage] =
    createSignal<ProgrammingLanguage>(ProgrammingLanguage.Python);
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
    <div class="min-h-screen border-2 bg-slate-800 px-40 text-center text-white">
      <header>
        <h1 class="py-16 text-6xl">Code Type</h1>
      </header>

      <main class="flex flex-col items-center justify-center gap-4 py-16">
        <Summary
          visible={summaryVisible()}
          onInteractOutside={() => handleSummaryClose()}
          onCloseButtonClick={() => handleSummaryClose()}
          typedText={typedText()}
          prompt={DUMMY_PROMPT}
          secondsTaken={60}
        />

        <section
          id="settings"
          class="mb-10 space-y-4"
        >
          <SelectProgrammingLanguage
            selectedLanguage={programmingLanguage}
            setSelectedLanguage={setProgrammingLanguage}
          />
          <SelectTime
            selectedTimeLimit={timeLimit()}
            onTimeLimitChange={handleTimeLimitChange}
          />
        </section>

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
          isActive={active()}
          setActive={setActive}
        />
      </main>
    </div>
  );
};

export default App;
