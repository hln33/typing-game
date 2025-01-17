import { Button } from "@kobalte/core/button";
import { Tooltip } from "@kobalte/core/tooltip";
import RestartIcon from "~icons/solar/restart-bold?width=24px&height=24px";

const RestartButton = () => {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Button class="animate-content-show">
          <RestartIcon />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content class="ui-expanded:animate-content-show animate-content-hide rounded-md bg-slate-950 p-2 text-white">
          <Tooltip.Arrow />
          <p>Restart</p>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip>
  );
};

export default RestartButton;
