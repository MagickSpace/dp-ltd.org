import locales from 'astro:i18n'
import { ui, languages } from "./ui";

export const LANGUAGES = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  ru: 'Русский',
  uk: 'Українська',
  de: 'German',
  pl: 'Poland',
};


export const LOCALES = {
  en: "en-GB",
  es: "es-ES",
  fr: "fr-FR",
  ru: 'ru-UA',
  uk: 'uk-UA',
  de: 'de-DE',
  pl: 'pl-PL',
}


export const DEFAULT_LANG = "uk";
export const DEFAULT_LANGUAGE = DEFAULT_LANG
export type languages = keyof typeof LANGUAGES;
export type LOCALES = keyof typeof locales;
export type LANGUAGES = keyof typeof locales;
export type UiType = keyof typeof ui;
export const LANGUAGES_ARRAY = Object.keys(LANGUAGES)

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as UiType;
  return DEFAULT_LANG;
}

export function useTranslations(lang?: UiType) {
  return function t(
    key: keyof (typeof ui)[typeof DEFAULT_LANG],
    ...args: any[]
  ) {
    let translation = ui[lang ?? DEFAULT_LANG][key] || ui[DEFAULT_LANG][key];
    if (args.length > 0) {
      for (let i = 0; i < args.length; i++) {
        translation = translation.replace(`{${i}}`, args[i]);
      }
    }
    return translation;
  };
}

export function pathNameIsInLanguage(pathname: string, lang: UiType) {
  return pathname.startsWith(`/${lang}`) || (lang === DEFAULT_LANG && !pathNameStartsWithLanguage(pathname));
}

function pathNameStartsWithLanguage(pathname: string) {
  let startsWithLanguage = false;
  const languages = Object.keys(LANGUAGES);

  for (let i = 0; i < languages.length; i++) {
    const lang = languages[i];
    if (pathname.startsWith(`/${lang}`)) {
      startsWithLanguage = true;
      break;
    }
  }

  return startsWithLanguage;
}

export function getLocalizedPathname(pathname: string, lang: UiType) {
  if (pathNameStartsWithLanguage(pathname)) {
    const availableLanguages = Object.keys(LANGUAGES).join('|');
    const regex = new RegExp(`^\/(${availableLanguages})`);
    return pathname.replace(regex, `/${lang}`);
  }
  return `/${lang}${pathname}`;
}

export function changeLangFromUrl(url: URL, lang: string) {
  const newLang = lang === 'uk' ? 'en' : 'uk'
  const splitUrl = url.pathname.split('/');
  splitUrl[1] = newLang
  return splitUrl.join('/').substring(1)
}