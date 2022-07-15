import { createEffect, createSignal, onMount } from "solid-js";
import { EForms } from "../../../enums/EForms";
import styles from "./Form.module.scss"
import { Custom, DontKnow, Team } from "./FormTabs";
import { setStore, store } from "./store";

export function Form() {
  const [tab, setTab] = createSignal(EForms.custom);
  const [isLoading, setIsLoading] = createSignal(false);
  const [err, setErr] = createSignal("");
  const [location, setLocation] = createSignal({});
  const [isFormSended, setIsFormSended] = createSignal(false);

  let name;
  let email;
  let form;

  createEffect(() => {
    setLocation(window.location.origin)
    console.log("location", location())
  })

  const emailRefCallback = (el) => {
    email = el
  }
  // onMount(() => {
  //   console.log("name=>", name)
  //   console.log("email=>", email)
  // })
  
  function handleClick(tab: EForms) {
    setTab(tab)
    setIsFormSended(false)
  }
  function handleSubmit(e: { preventDefault: () => void; currentTarget: HTMLFormElement; }) {
    e.preventDefault();
    if (store.validation.name.errMsg || !store.validation.name.touched) {
      name.focus();
    } else if (store.validation.email.errMsg || !store.validation.email.touched) {
      email.focus();
    } else {
      console.log("OK")
      setIsLoading(true);
      fetch(`${location()}/.netlify/functions/send-email`, {
        body: new FormData(e.currentTarget),
        method: "POST",
      })
      .then((res) => {
        setIsLoading(false);
        if (res.status < 300) {
          setIsFormSended(true)
        } else {
          setErr("Something wrong! Please reload the page and try again")
          console.log
        }
      })
      .catch(e => console.log(e))
      .finally(() => {
        form.reset();
        setIsLoading(false);
        setStore("validation", "email", "errMsg", "Was sended");
        setStore("validation", "email", "touched", false);
        setStore("validation", "name", "errMsg", "Was sended");
        setStore("validation", "name", "touched", false);
      })
    }
  }
  return (
    <div class={styles.form}>
      <div class={styles.form__header}>
        <div class={styles.form__headerWrp}>
          <h2 class={styles.form__headerTitle}>Request an IT project cost estimate</h2>
          <div class={styles.form__selectors}>
            <button
              onClick={() => handleClick(EForms.custom)}
              class={styles.form__selectBtn} 
              classList={{[styles.form__selectBtn_active]: tab() === EForms.custom}}
            >
              custom software development
            </button>
            <button
              onClick={() => handleClick(EForms.team)}
              class={styles.form__selectBtn} 
              classList={{[styles.form__selectBtn_active]: tab() === EForms.team}}
            >
              team augmentation
            </button>
            <button
              onClick={() => handleClick(EForms.dontKnow)}
              class={styles.form__selectBtn} 
              classList={{[styles.form__selectBtn_active]: tab() === EForms.dontKnow}}
            >
              i don't know what I need
            </button>
          </div>
        </div>
      </div>
      <form ref={form} class={styles.form__form} enctype="multipart/form-data" method="post" onsubmit={(e) => handleSubmit(e)}>
        {tab() === EForms.custom && <Custom ref={name} emailRefCallback={emailRefCallback}/>}
        {tab() === EForms.team && <Team ref={name} emailRefCallback={emailRefCallback}/>}
        {tab() === EForms.dontKnow && <DontKnow ref={name} emailRefCallback={emailRefCallback}/>}
        <button class={styles.form__SubmitBtn} type="submit" >
        {!isLoading() && "Get price"}
        {isLoading() && "Sending..."}
        </button>
      {err() && <div class={styles.error}>{err()}</div>}
      {isFormSended() && <div class={styles.success}>The form was sent successfully</div>}
      </form>
    </div>
  )
}