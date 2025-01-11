import { Select } from "@kobalte/core/select";

const SelectProgrammingLanguage = () => {
  return (
    <Select
      placeholder="Select a programming language..."
      options={["Python", "JavaScript", "Ruby"]}
      itemComponent={(props) => (
        <Select.Item
          class="h-8 px-2 text-white"
          item={props.item}
        >
          <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
        </Select.Item>
      )}
    >
      <Select.Trigger class="w-80 rounded-md border border-slate-600 bg-slate-900 p-3 transition-colors hover:border-slate-400">
        <Select.Value<string>>{(state) => state.selectedOption()}</Select.Value>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content class="animate-content-show bg-slate-900">
          <Select.Listbox />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
};

export default SelectProgrammingLanguage;
