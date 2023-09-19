import { VueQueryPlugin } from "@tanstack/vue-query"
import { boot } from "quasar/wrappers"

export default boot(({ app }) => {
  VueQueryPlugin.install(app, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 1000 * 60 * 60 * 24,
        },
      },
    },
  })
})
