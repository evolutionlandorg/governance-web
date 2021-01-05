import Vue from "vue"
import VueI18n from "vue-i18n"

import getBrowserLocale from "@/helpers/i18n/get-browser-locale";
import { supportedLocalesInclude } from "@/helpers/i18n/supported-locales";

import enJSON from "@/locales/en";
import zhJSON from "@/locales/zh";

Vue.use(VueI18n);

function getStartingLocale() {
  const browserLocale = getBrowserLocale({ countryCodeOnly: true })

  if (supportedLocalesInclude(browserLocale)) {
    return browserLocale
  } else {
    return process.env.VUE_APP_I18N_LOCALE || "en"
  }
}

const startingLocale = getStartingLocale()

const i18n = new VueI18n({
  locale: startingLocale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "zh",
  messages: {
    'en': enJSON,
    'zh': zhJSON
  },
})

export default i18n;