import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";
import tailwindcss from '@tailwindcss/vite';
import react from "@astrojs/react";
import million from "million/compiler";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

export default defineConfig({
    site: 'https://dp-ltd.org',
    i18n: {
        defaultLocale: "uk",
        locales: ["en", "pl", "ru", "uk", "de", "es", "fr"],
        routing: {
          prefixDefaultLocale: true
        }
      },
    prefetch: {
      prefetchAll: true
    },
    vite: {
      plugins: [million.vite({
        mode: "react",
        server: true,
        auto: {
          threshold: 0.05,
          skip: ["useBadHook", /badVariable/g]
        }
      }), tailwindcss()]
  },
  integrations: [react(), sitemap(), partytown(), icon()],
  output: "server",
  adapter: cloudflare()
});