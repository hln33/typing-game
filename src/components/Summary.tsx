import { Component } from "solid-js";
import { InteractOutsideEvent } from "@kobalte/core/*";
import { Dialog } from "@kobalte/core/dialog";

const Summary: Component<{
  visible: boolean;
  onInteractOutside: (event: InteractOutsideEvent) => void;
  onCloseButtonClick: () => void;
  typedText: string;
  prompt: string;
  secondsTaken: number;
}> = (props) => {
  const accuracyPercentage = () => {
    const correctChars = props.prompt
      .split("")
      .filter((ch, index) => ch === props.typedText[index]);
    return (correctChars.length / props.typedText.length) * 100;
  };

  return (
    <Dialog
      open={props.visible}
      onOpenChange={() => props.onCloseButtonClick()}
    >
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black opacity-50" />
        <div class="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog.Content
            class="max-w-fit p-10 rounded-lg bg-slate-800 text-white"
            onInteractOutside={props.onInteractOutside}
          >
            <div class="flex justify-between mb-6">
              <Dialog.Title class="font-bold">Summary</Dialog.Title>
              <Dialog.CloseButton>X</Dialog.CloseButton>
            </div>
            <Dialog.Description>
              <div>
                <span class="font-bold">Time taken</span>: {props.secondsTaken}
              </div>
              <div>
                <span class="font-bold">Accuracy</span>: {accuracyPercentage()}%
              </div>
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
};

export default Summary;
