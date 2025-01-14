import { createSignal, type Component } from "solid-js";

import TextPrompt from "./components/TextPrompt";
import Timer from "./components/Timer";
import Summary from "./components/Summary";
import SelectTime from "./components/SelectTime";
import SelectProgrammingLanguage from "./components/SelectProgrammingLanguage";
import { ProgrammingLanguage } from "./types/programmingLanguages";

const DEFAULT_TIME_LIMIT = 15;
const PYTHON_PROMPT_LIST = [
  "a\na\na\na\na\na\na\na",
  "hello",
  "dict_example = {'a': 1, 'b': 2}\nprint(dict_example.get('a'))",
  's = "hello world"\nprint(s[::-1])',
  "print([i for i in range(10) if i % 2 == 0])",
];

const App: Component = () => {
  const [programmingLanguage, setProgrammingLanguage] =
    createSignal<ProgrammingLanguage>(ProgrammingLanguage.Python);
  const [typedText, setTypedText] = createSignal("");
  const [active, setActive] = createSignal(false);
  const [timeLimit, setTimeLimit] = createSignal(DEFAULT_TIME_LIMIT);
  const [summaryVisible, setSummaryVisible] = createSignal(false);
  const [prompt, setPrompt] = createSignal(PYTHON_PROMPT_LIST[0]);

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
    setPrompt(PYTHON_PROMPT_LIST[0]);
    setTypedText("");
    setTimeLimit(DEFAULT_TIME_LIMIT);
  };

  const handlePromptComplete = () => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    const randomIndex = Math.floor(
      Math.random() * Math.floor(PYTHON_PROMPT_LIST.length - 1),
    );

    setPrompt((prev) => prev + "\n" + PYTHON_PROMPT_LIST[randomIndex]);
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
          prompt={prompt()}
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
          prompt={prompt}
          isActive={active}
          setActive={setActive}
          userTypedText={typedText}
          handleInput={handleTextInput}
          handlePromptComplete={handlePromptComplete}
        />
      </main>
    </div>
  );
};

export default App;
