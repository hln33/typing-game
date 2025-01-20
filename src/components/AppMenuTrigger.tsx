import { ComponentProps, ParentComponent, splitProps } from "solid-js";

const AppMenuTrigger: ParentComponent<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["children", "class"]);

  return (
    <div
      class={`${local.class} w-80 rounded-md border border-slate-600 bg-slate-900 p-3 transition-colors hover:border-slate-400`}
      {...others}
    >
      {local.children}
    </div>
  );
};

export default AppMenuTrigger;
