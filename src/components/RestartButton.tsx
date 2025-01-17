import { Component } from "solid-js";
import { Tooltip } from "@kobalte/core/tooltip";
import RestartIcon from "~icons/solar/restart-bold?width=24px&height=24px";

const RestartButton: Component<{ onRestart: () => void }> = (props) => {
  return (
    <Tooltip>
      <Tooltip.Trigger onClick={() => props.onRestart()}>
        <RestartIcon />
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content class="animate-content-hide ui-expanded:animate-content-show rounded-md bg-slate-950 p-2 text-white">
          <Tooltip.Arrow />
          <p>Restart</p>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip>
  );
};

export default RestartButton;
