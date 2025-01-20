import { createSignal, type Component } from "solid-js";
import { createStore, produce } from "solid-js/store";

import TextPrompt from "./components/TextPrompt";
import Timer from "./components/Timer";
import Summary from "./components/Summary";
import SelectTime from "./components/SelectTime";
import RestartButton from "./components/RestartButton";
import SelectProgrammingLanguage from "./components/SelectProgrammingLanguage";
import SelectSnippetCategory from "./components/SelectSnippetCategory";
import { ProgrammingLanguage } from "./types/programmingLanguages";
import { JAVASCRIPT_PROMPT_LIST, PYTHON_PROMPT_LIST } from "./utils/prompts";

const DEFAULT_TIME_LIMIT = 15;

const App: Component = () => {
  const [programmingLanguage, setProgrammingLanguage] =
    createSignal<ProgrammingLanguage>(ProgrammingLanguage.Python);
  const [summaryVisible, setSummaryVisible] = createSignal(false);
  const [gameState, setGameState] = createStore({
    active: false,
    timeLimit: DEFAULT_TIME_LIMIT,
    prompt: PYTHON_PROMPT_LIST[0],
    typedText: "",
  });

  const resetPrompt = (): void => {
    switch (programmingLanguage()) {
      case ProgrammingLanguage.Python:
        setGameState("prompt", PYTHON_PROMPT_LIST[0]);
        break;
      case ProgrammingLanguage.JavaScript:
        setGameState("prompt", JAVASCRIPT_PROMPT_LIST[0]);
        break;
      default:
        console.error("Unknown Language Selected:", programmingLanguage());
    }
  };

  const restartGame = () => {
    resetPrompt();

    setSummaryVisible(false);
    setGameState(
      produce((state) => {
        state.active = false;
        state.typedText = "";
        state.timeLimit = DEFAULT_TIME_LIMIT;
      }),
    );
  };

  const handleTimeLimitChange = (newTimeLimit: number) => {
    restartGame();
    setGameState("timeLimit", newTimeLimit);
  };

  const handleLanguageChange = (newLanguage: ProgrammingLanguage) => {
    setProgrammingLanguage(newLanguage);
    restartGame();
  };

  const handleTextInput = (event: InputEvent) => {
    if (!gameState.active) {
      setGameState("active", true);
    }
    setGameState("typedText", (event.target as HTMLInputElement).value);
  };

  const handlePromptComplete = () => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    const randomIndex = Math.floor(
      Math.random() * Math.floor(PYTHON_PROMPT_LIST.length - 1),
    );
    setGameState(
      "prompt",
      (prev) => prev + "\n" + PYTHON_PROMPT_LIST[randomIndex],
    );
  };

  const handleGameDone = () => {
    setGameState("active", false);
    setSummaryVisible(true);
  };

  return (
    <div class="min-h-screen border-2 bg-slate-800 px-40 text-center text-white">
      <header>
        <h1 class="py-16 text-6xl">Code Type</h1>
      </header>

      <main class="flex flex-col items-center justify-center gap-4 py-16">
        <Summary
          visible={summaryVisible()}
          onInteractOutside={(_event) => restartGame()}
          onCloseButtonClick={restartGame}
          typedText={gameState.typedText}
          prompt={gameState.prompt}
          secondsTaken={60}
        />

        <section
          id="settings"
          class="mb-10 flex flex-col items-center gap-2"
        >
          <SelectProgrammingLanguage
            selectedLanguage={programmingLanguage}
            handleLanguageChange={handleLanguageChange}
          />
          <SelectSnippetCategory />
          <SelectTime
            class="mt-6"
            selectedTimeLimit={gameState.timeLimit}
            onTimeLimitChange={handleTimeLimitChange}
          />
        </section>

        <Timer
          secondsLeft={gameState.timeLimit}
          setSecondsLeft={(secondsLeft) =>
            setGameState("timeLimit", secondsLeft)
          }
          isActive={gameState.active}
          setDone={handleGameDone}
        />
        <TextPrompt
          prompt={gameState.prompt}
          isActive={gameState.active}
          setActive={(isActive) => setGameState("active", isActive)}
          userTypedText={gameState.typedText}
          handleInput={handleTextInput}
          handlePromptComplete={handlePromptComplete}
        />
        <RestartButton onRestart={restartGame} />
      </main>
    </div>
  );
};

export default App;
