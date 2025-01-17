import { Component } from "solid-js";

const AppMenuTriggerLabel: Component<{ label: string }> = (props) => {
  return (
    <div class="w-80 rounded-md border border-slate-600 bg-slate-900 p-3 transition-colors hover:border-slate-400">
      {props.label}
    </div>
  );
};

export default AppMenuTriggerLabel;
