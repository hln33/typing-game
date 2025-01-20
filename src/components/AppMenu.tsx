import { ComponentProps, ParentComponent, splitProps } from "solid-js";

const AppMenuContent: ParentComponent<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["children", "class"]);

  return (
    <div
      class={`${local.class} w-80 animate-content-hide border border-slate-600 bg-slate-900 p-2 text-white ui-expanded:animate-content-show`}
      {...others}
    >
      {local.children}
    </div>
  );
};

export default AppMenuContent;
