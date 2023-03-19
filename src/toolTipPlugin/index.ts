import { defineAsyncComponent } from "vue";
import { defu } from "defu";
import { hideAll } from "tippy.js";
export const tooltipOptionsInject = Symbol();
import type { App } from "vue";
import type { PluginsOptions } from "./types";

export function createToolTipPlugin(options: PluginsOptions = {}) {
  return (app: App) => {
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
