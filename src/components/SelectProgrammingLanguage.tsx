import { Accessor, Component } from "solid-js";
import { Select } from "@kobalte/core/select";

import {
  ProgrammingLanguage,
  ProgrammingLanguageLabels,
} from "../types/programmingLanguages";
import AppMenuTrigger from "./AppMenuTrigger";
import AppMenuContent from "./AppMenuContent";

interface Option {
  value: ProgrammingLanguage;
  label: string;
  disabled: boolean;
}

const options: Option[] = [
  {
    value: ProgrammingLanguage.Python,
    label: ProgrammingLanguageLabels[ProgrammingLanguage.Python],
    disabled: false,
  },
  {
    value: ProgrammingLanguage.JavaScript,
    label: ProgrammingLanguageLabels[ProgrammingLanguage.JavaScript],
    disabled: false,
  },
  {
    value: ProgrammingLanguage.Ruby,
    label: ProgrammingLanguageLabels[ProgrammingLanguage.Ruby],
    disabled: false,
  },
];

const SelectProgrammingLanguage: Component<{
  selectedLanguage: Accessor<ProgrammingLanguage>;
  handleLanguageChange: (newLanguage: ProgrammingLanguage) => void;
}> = (props) => {
  const value = () => ({
    value: props.selectedLanguage(),
    label: ProgrammingLanguageLabels[props.selectedLanguage()],
    disabled: false,
  });

  return (
    <div>
      <h2 class="text-xl">Current Language</h2>

      <Select
        class="p-4"
        value={value()}
        onChange={(value) => props.handleLanguageChange(value!.value)}
        options={options}
        optionValue="value"
        optionTextValue="label"
        optionDisabled="disabled"
        itemComponent={(props) => (
          <Select.Item
            class="flex h-8 items-center rounded-md px-2 text-white outline-none ui-highlighted:bg-yellow-600"
            item={props.item}
          >
            <Select.ItemLabel>{props.item.rawValue.label}</Select.ItemLabel>
          </Select.Item>
        )}
      >
        <Select.Trigger>
          <Select.Value<Option>>
            {(state) => (
              <AppMenuTrigger>{state.selectedOption().label}</AppMenuTrigger>
            )}
          </Select.Value>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            class="-top-2"
            as={AppMenuContent}
          >
            <Select.Listbox />
          </Select.Content>
        </Select.Portal>
      </Select>
    </div>
  );
};

export default SelectProgrammingLanguage;
