import { createEffect, createSignal } from "solid-js";
import { EmailInput } from "../EmailInput";
import { setStore, store } from "../Form/store";
import { NameInput } from "../NameInput";
import { Textarea } from "../Textarea";
import { TextInput } from "../TextInput";
import styles from "./FormSubmit.module.scss"



export function FormSubmit() {
  const [location, setLocation] = createSignal({});
  const [isLoading, setIsLoading] = createSignal(false);
  const [isFormSended, setIsFormSended] = createSignal(false);
  const [err, setErr] = createSignal("");
  let form;
  let name;
  let email;
  createEffect(() => {
    setLocation(window.location.origin)
    console.log("location", location())
  })
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
    <form class={styles.form} onSubmit={handleSubmit} ref={form}>
      <div class={styles.form__wrp}>
        <NameInput ref={name} />
        <EmailInput ref={email} />
        <TextInput label="Phone number" />
        <TextInput label="Subject" />
      </div>
      <Textarea label="Message (optional)" />
      <input tabindex={-1} class={styles.hiddenInput} name="form-link"type="text" value={location().toString()} />
      <button
        class={styles.form__SubmitBtn}
      >
        {!isLoading() && "Get a free consultation"}
        {isLoading() && "Sending..."}
      </button>
      {isFormSended() && <div class={styles.success}>The form was sent successfully</div>}
      {err() && <div class={styles.error}>{err()}</div>}
    </form>
  )
}