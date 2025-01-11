import { Component, For } from "solid-js";
import { ToggleGroup } from "@kobalte/core/toggle-group";

const DEFAULT_TIME_LIMIT = 30;

const SelectTime: Component<{
  class?: string;
  selectedTimeLimit: number;
  onTimeLimitChange: (timeLimit: number) => void;
}> = (props) => {
  return (
    <section
      id="time-settings"
      class={props.class}
    >
      <h2 class="text-xl">Time Limit:</h2>

      <ToggleGroup
        class="flex gap-2 p-4"
        value={props.selectedTimeLimit.toString()}
        onChange={(value) =>
          props.onTimeLimitChange(
            Number.parseInt(value ?? DEFAULT_TIME_LIMIT.toString()),
          )
        }
      >
        <For each={[15, 30, 45, 60]}>
          {(timeLimit, _index) => (
            <ToggleGroup.Item
              class="size-8 rounded hover:bg-yellow-600/50 ui-pressed:bg-yellow-600"
              value={timeLimit.toString()}
            >
              {timeLimit}
            </ToggleGroup.Item>
          )}
        </For>
      </ToggleGroup>
    </section>
  );
};

export default SelectTime;
