import { createEffect, createSignal, onMount } from "solid-js";
import { ELangs } from "../../../enums/ELangs";
import { FlagES, FlagPL, FlagRU, FlagTR, FlagUA, FlagUS } from "./Flags";
import styles from "./LangPicker.module.scss"

export function LangPicker() {
  const [lang, setLang] = createSignal(ELangs.en)
  const [restPath, setrestPath] = createSignal("")
  const [isOpen, setIsOpen] = createSignal(false);
  createEffect(() => {
    const langPath = window.location.pathname.split("/");
    const restPath = window.location.pathname.split(langPath[1])[1]
    setLang("/" + langPath[1] as ELangs);
    setrestPath(restPath)
    console.log("restPath()",restPath);
    
    
  })

  return (
    <div class={styles.langPicker}>
      <button 
        type="button" 
        class={styles.langPicker__button} 
        onClick={() => setIsOpen(!isOpen())}
        aria-label="open lang picker"
      >
        {lang() === ELangs.es && <FlagES />}
        {lang() === ELangs.pl && <FlagPL />}
        {lang() === ELangs.ru && <FlagRU />}
        {lang() === ELangs.tr && <FlagTR />}
        {lang() === ELangs.ua && <FlagUA />}
        {lang() === ELangs.en && <FlagUS />}
      </button>
      <div class={styles.langPicker__picker} classList={{ [styles.langPicker__picker_show]: isOpen() }}>
        <a aria-label="choose Spanish" classList={{ [styles.langPicker__pickerflag_active]: lang() === ELangs.es }}
          href={ELangs.es + restPath()}
        >
          <FlagES />
        </a>
        <a aria-label="choose Polish" classList={{ [styles.langPicker__pickerflag_active]: lang() === ELangs.pl }}
          href={ELangs.pl + restPath()}
        >
          <FlagPL />
        </a>
        <a aria-label="choose Russian" classList={{ [styles.langPicker__pickerflag_active]: lang() === ELangs.ru }}
          href={ELangs.ru + restPath()}
        >
          <FlagRU />
        </a>
        <a aria-label="choose Turkish" classList={{ [styles.langPicker__pickerflag_active]: lang() === ELangs.tr }}
          href={ELangs.tr + restPath()}
        >
          <FlagTR />
        </a>
        <a aria-label="choose Ukranian" classList={{ [styles.langPicker__pickerflag_active]: lang() === ELangs.ua }}
          href={ELangs.ua + restPath()}
        >
          <FlagUA />
        </a>
        <a aria-label="choose English" href={ELangs.en + restPath()} classList={{ [styles.langPicker__pickerflag_active]: lang() === ELangs.en }}>
          <FlagUS />
        </a>
      </div>
    </div>
  );
}