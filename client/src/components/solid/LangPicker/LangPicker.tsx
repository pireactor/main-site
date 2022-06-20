import { createSignal } from "solid-js";
import { ELangs } from "../../../enums/ELangs";
import { FlagES, FlagPL, FlagRU, FlagTR, FlagUA, FlagUS } from "./Flags";
import styles from "./LangPicker.module.scss"

export function LangPicker() {
  const [lang, setLang] = createSignal(ELangs.us)
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <div classList={{[styles.header__langPicker]: true, [styles.langPicker]: true}}>
      <button type="button" class={styles.langPicker__button} onClick={() => setIsOpen(!isOpen())}>
        {lang() === ELangs.es && <FlagES />}
        {lang() === ELangs.pl && <FlagPL />}
        {lang() === ELangs.ru && <FlagRU />}
        {lang() === ELangs.tr && <FlagTR />}
        {lang() === ELangs.ua && <FlagUA />}
        {lang() === ELangs.us && <FlagUS />}
      </button>
      <div class={styles.langPicker__picker} classList={{[styles.langPicker__picker_show]: isOpen()}}>
        <FlagES />
        <FlagPL />
        <FlagRU />
        <FlagTR />
        <FlagUA />
        <FlagUS />
      </div>
    </div>
  );
}