import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import AppMenuTrigger from "./AppMenuTrigger";
import AppMenuContent from "./AppMenu";

const SelectSnippetCategory = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <AppMenuTrigger label="Snippet Types" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content as={AppMenuContent}>
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
