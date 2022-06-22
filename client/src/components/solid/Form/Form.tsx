import { createSignal } from "solid-js";
import { EForms } from "../../../enums/EForms";
import styles from "./Form.module.scss"
import { Custom, DontKnow, Team } from "./FormTabs";

export default function Form() {
  const [tab, setTab] = createSignal(EForms.custom)
  function handleSubmit(e: { preventDefault: () => void; currentTarget: HTMLFormElement; }) {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    console.log(Array.from(data.entries()).forEach(el => console.log(el)))
    fetch("http://localhost:8081/project", {
      body: data,
      method: "POST",
      mode: "no-cors"
    }).then((res) => console.log(res))
  }
  return (
    <div class={styles.form}>
      {tab()}
      <div class={styles.form__header}>
        <div class={styles.form__headerWrp}>
          <h2 class={styles.form__headerTitle}>Request an IT project cost estimate</h2>
          <div class={styles.form__selectors}>
            <button
              onClick={() => {setTab(EForms.custom)}}
              class={styles.form__selectBtn} 
              classList={{[styles.form__selectBtn_active]: tab() === EForms.custom}}
            >
              custom software development
            </button>
            <button
              onClick={() => {setTab(EForms.team)}}
              class={styles.form__selectBtn} 
              classList={{[styles.form__selectBtn_active]: tab() === EForms.team}}
            >
              team augmentation
            </button>
            <button
              onClick={() => {setTab(EForms.dontKnow)}}
              class={styles.form__selectBtn} 
              classList={{[styles.form__selectBtn_active]: tab() === EForms.dontKnow}}
            >
              i don't know what I need
            </button>
          </div>
        </div>
      </div>
      <form class={styles.form__form} onsubmit={handleSubmit} data-netlify="true">
        {tab() === EForms.custom && <Custom />}
        {tab() === EForms.team && <Team />}
        {tab() === EForms.dontKnow && <DontKnow />}
        <button class={styles.form__SubmitBtn} type="submit" >Get Price</button>
      </form>
    </div>
  )
}