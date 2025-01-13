import { Accessor, Component, Setter } from "solid-js";
import { Select } from "@kobalte/core/select";

import { ProgrammingLanguage } from "../types/programmingLanguages";

interface Option {
  value: ProgrammingLanguage;
  label: string;
  disabled: boolean;
}

const Labels = {
  [ProgrammingLanguage.Python]: "Python",
  [ProgrammingLanguage.JavaScript]: "JavaScript",
  [ProgrammingLanguage.Ruby]: "Ruby",
} as const;

const options: Option[] = [
  {
    value: ProgrammingLanguage.Python,
    label: Labels[ProgrammingLanguage.Python],
    disabled: false,
  },
  {
    value: ProgrammingLanguage.JavaScript,
    label: Labels[ProgrammingLanguage.JavaScript],
    disabled: false,
  },
  {
    value: ProgrammingLanguage.Ruby,
    label: Labels[ProgrammingLanguage.Ruby],
    disabled: false,
  },
];

const SelectProgrammingLanguage: Component<{
  selectedLanguage: Accessor<ProgrammingLanguage>;
  setSelectedLanguage: Setter<ProgrammingLanguage>;
}> = (props) => {
  const value = () => ({
    value: props.selectedLanguage(),
    label: Labels[props.selectedLanguage()],
    disabled: false,
  });

  return (
    <div>
      <h2 class="text-xl">Current Language</h2>

      <Select
        class="p-4"
        value={value()}
        onChange={(value) => props.setSelectedLanguage(value!.value)}
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
        <Select.Trigger class="w-80 rounded-md border border-slate-600 bg-slate-900 p-3 transition-colors hover:border-slate-400">
          <Select.Value<Option>>
            {(state) => state.selectedOption().label}
          </Select.Value>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content class="animate-content-show -top-1 border border-slate-600 bg-slate-900">
            <Select.Listbox class="p-2" />
          </Select.Content>
        </Select.Portal>
      </Select>
    </div>
  );
};

export default SelectProgrammingLanguage;
