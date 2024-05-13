import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";
import tailwindcss from '@tailwindcss/vite';
import react from "@astrojs/react";
import million from "million/compiler";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import robotsTxt from "astro-robots-txt";


// https://astro.build/config
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
    build: {
      minify: false,
    },
    plugins: [million.vite({
      mode: "react",
      server: true,
      auto: {
        threshold: 0.05,
        skip: ["useBadHook", /badVariable/g]
      }
    }), tailwindcss()]
  },
  integrations: [react(), sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: {
        en: 'en-GB',
        es: 'es-ES',
        fr: 'fr-FR',
        ru: 'ru-UA',
        uk: 'uk-UA',
        de: 'de-DE',
        pl: 'pl-PL',
      },
    },
    }), partytown(), icon(), robotsTxt({
    sitemap: 'https://www.dp-ltd.org/sitemap-0.xml',
    host: 'dp-ltd.org'
  })],
  output: "server",
  adapter: cloudflare({
    imageService: 'cloudflare'
 }),
});