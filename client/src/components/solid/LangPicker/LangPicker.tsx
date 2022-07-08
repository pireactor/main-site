import { createSignal, onMount } from "solid-js";
import { ELangs } from "../../../enums/ELangs";
import { FlagES, FlagPL, FlagRU, FlagTR, FlagUA, FlagUS } from "./Flags";
import styles from "./LangPicker.module.scss"

export function LangPicker() {
  const [lang, setLang] = createSignal(ELangs.us)
  const [isOpen, setIsOpen] = createSignal(false);
  onMount(() => setLang(window.location.pathname as ELangs))

  return (
    <div class={styles.langPicker}>
      <button type="button" class={styles.langPicker__button} onClick={() => setIsOpen(!isOpen())}>
        {lang() === ELangs.es && <FlagES />}
        {lang() === ELangs.pl && <FlagPL />}
        {lang() === ELangs.ru && <FlagRU />}
        {lang() === ELangs.tr && <FlagTR />}
        {lang() === ELangs.ua && <FlagUA />}
        {lang() === ELangs.us && <FlagUS />}
      </button>
      <div class={styles.langPicker__picker} classList={{ [styles.langPicker__picker_show]: isOpen() }}>
        <a classList={{ [styles.langPicker__pickerflag_active]: lang() === ELangs.es }}
          href={ELangs.es}
        >
          <FlagES />
        </a>
        <a href={ELangs.es}>
          <FlagPL />
        </a>
        <a href={ELangs.es}>
          <FlagRU />
        </a>
        <a href={ELangs.es}>
          <FlagTR />

        </a>
        <a href={ELangs.es}>
          <FlagUA />
        </a>
        <a href={ELangs.us} classList={{ [styles.langPicker__pickerflag_active]: lang() === ELangs.us }}>
          <FlagUS />
        </a>
      </div>
    </div>
  );
}