import { defineAsyncComponent } from "vue";
import { defu } from "defu";
import { hideAll } from "tippy.js";
export const tooltipOptionsInject = Symbol();
import type { App } from "vue";
import type { Props } from "tippy.js";

interface PluginsOptions extends Partial<Props> {}

export function createToolTipPlugin(options: PluginsOptions) {
  return (app: any) => {
    options = defu(options, {
      arrow: false,
    });

    app.config.globalProperties.$hideAllTooltips = hideAll;

    app.provide(tooltipOptionsInject, options);
    app.component(
      "ToolTip",
      defineAsyncComponent(() => import("./ToolTip.vue"))
    );
  };
}
