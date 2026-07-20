import { arTr } from "@/locale/ar";
import { enTr } from "@/locale/en";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
export const useLangStore = create()(
  immer(() => {
    return {
      lang: "en",
    };
  }),
);

export function changeLang() {
  useLangStore.setState((s) => {
    s.lang = s.lang === "en" ? "ar" : "en";
  });
}
export function tt(enLang, arLang) {
  const { lang } = useLangStore.getState();
  return lang == "en" ? enLang : arLang;
}
export function getTrans(title) {
  const { lang } = useLangStore.getState();
  return lang == "en" ? enTr[title] : arTr[title];
}
