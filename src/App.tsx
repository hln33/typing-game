import { createSignal, type Component } from "solid-js";

import TextPrompt from "./components/TextPrompt";
import Timer from "./components/Timer";
import Summary from "./components/Summary";
import SelectTime from "./components/SelectTime";
import SelectProgrammingLanguage from "./components/SelectProgrammingLanguage";
import { ProgrammingLanguage } from "./types/programmingLanguages";
import RestartButton from "./components/RestartButton";

const DEFAULT_TIME_LIMIT = 15;
const PYTHON_PROMPT_LIST = [
  "hello",
  "dict_example = {'a': 1, 'b': 2}\nprint(dict_example.get('a'))",
  's = "hello world"\nprint(s[::-1])',
  "print([i for i in range(10) if i % 2 == 0])",
];
const JAVASCRIPT_PROMPT_LIST = [
  "console.log('hello world!');",
  "const add = (a, b) => a + b;",
  "const arr = [1, 2, 3, 4, 5];",
  "const factorial = n => n === 0 ? 1 : n * factorial(n - 1);",
  "const nums = [1, 2, 3, 4];\nconst squared = nums.map(x => x * x);",
  "const person = {name: 'Alice', age: 30};",
  "const str = 'hello';",
  "const isEven = num => num % 2 === 0;",
  "const numbers = [10, 20, 30];\nnumbers.forEach(num => console.log(num * 2));",
  "const obj = {x: 10, y: 20};.keys(obj));",
  "const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(x => x % 2 === 0);",
  "const nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(x => x * 2);",
  "const nums = [1, 2, 3, 4, 5];\nconst sum = nums.reduce((acc, curr) => acc + curr, 0);",
  "const str = 'hello world';\nconst reversed = str.split('').reverse().join('');",
  "const arr = [1, 2, 3, 4];ludes(3));",
  "const numbers = [10, 20, 30];\nconst total = numbers.reduce((acc, num) => acc + num, 0);",
  "const x = 5;\nconst y = 10;g(x * y);",
  "const greet = name => `Hello, ${name}!`;greet('Alice'));",
  "const numbers = [10, 20, 30];\nconst product = numbers.reduce((acc, num) => acc * num, 1);",
  "const nums = [1, 2, 3, 4, 5];\nconst squared = nums.map(x => x ** 2);",
  "const numbers = [1, 2, 3, 4, 5];th.max(...numbers));",
];

const App: Component = () => {
  const [programmingLanguage, setProgrammingLanguage] =
    createSignal<ProgrammingLanguage>(ProgrammingLanguage.Python);
  const [prompt, setPrompt] = createSignal(PYTHON_PROMPT_LIST[0]);
  const [typedText, setTypedText] = createSignal("");
  const [active, setActive] = createSignal(false);
  const [timeLimit, setTimeLimit] = createSignal(DEFAULT_TIME_LIMIT);
  const [summaryVisible, setSummaryVisible] = createSignal(false);

  const resetPrompt = (): void => {
    switch (programmingLanguage()) {
      case ProgrammingLanguage.Python:
        setPrompt(PYTHON_PROMPT_LIST[0]);
        break;
      case ProgrammingLanguage.JavaScript:
        setPrompt(JAVASCRIPT_PROMPT_LIST[0]);
        break;
      default:
        console.error("Unknown Language Selected:", programmingLanguage());
    }
  };

  const restartGame = () => {
    resetPrompt();

    setActive(false);
    setSummaryVisible(false);
    setTypedText("");
    setTimeLimit(DEFAULT_TIME_LIMIT);
  };

  const handleTimeLimitChange = (newTimeLimit: number) => {
    restartGame();
    setTimeLimit(newTimeLimit);
  };

  const handleLanguageChange = (newLanguage: ProgrammingLanguage) => {
    setProgrammingLanguage(newLanguage);
    setTimeLimit(DEFAULT_TIME_LIMIT);

    restartGame();
  };

  const handleTextInput = (event: InputEvent) => {
    if (!active()) {
      setActive(true);
    }
    setTypedText((event.target as HTMLInputElement).value);
  };

  const handlePromptComplete = () => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    const randomIndex = Math.floor(
      Math.random() * Math.floor(PYTHON_PROMPT_LIST.length - 1),
    );
    setPrompt((prev) => prev + "\n" + PYTHON_PROMPT_LIST[randomIndex]);
  };

  const handleGameDone = () => {
    setActive(false);
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
            handleLanguageChange={handleLanguageChange}
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
        <RestartButton onRestart={restartGame} />
      </main>
    </div>
  );
};

export default App;
