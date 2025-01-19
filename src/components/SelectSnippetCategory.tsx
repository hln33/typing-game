import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import AppMenuTrigger from "./AppMenuTrigger";

const SelectSnippetCategory = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <AppMenuTrigger label="Snippet Types" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          id="here"
          class="ui-expanded:animate-content-show animate-content-hide w-80 space-y-0 rounded-md bg-slate-900 p-2 text-white"
        >
          <DropdownMenu.CheckboxItem class="flex gap-2 px-2 leading-8">
            Basic Syntax
            <DropdownMenu.ItemIndicator>Y</DropdownMenu.ItemIndicator>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem class="flex gap-2 px-2 leading-8">
            Control Flow
            <DropdownMenu.ItemIndicator>Y</DropdownMenu.ItemIndicator>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem class="flex gap-2 px-2 leading-8">
            Functions<DropdownMenu.ItemIndicator>Y</DropdownMenu.ItemIndicator>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem class="flex gap-2 px-2 leading-8">
            Data Structures
            <DropdownMenu.ItemIndicator>Y</DropdownMenu.ItemIndicator>
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
};

export default SelectSnippetCategory;
