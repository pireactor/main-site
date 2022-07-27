import { createEffect, createSignal } from "solid-js";
import { EmailInput } from "../EmailInput";
import { setStore, store } from "../Form/store";
import { NameInput } from "../NameInput";
import { Textarea } from "../Textarea";
import { TextInput } from "../TextInput";
import styles from "./FormSubmit.module.scss";

export interface IFormSubmitProps {
  fields: {
    name: string;
    email: string;
    phone: string;
    subj: string;
    textArea: string;
    fetchErr: string;
    sucMsg: string;
    loading: string;
    btnText: string;
  }
} 


export function FormSubmit(props: IFormSubmitProps) {
  const [location, setLocation] = createSignal({});
  const [isLoading, setIsLoading] = createSignal(false);
  const [isFormSended, setIsFormSended] = createSignal(false);
  const [err, setErr] = createSignal("");
  let form;
  let name;
  let email;
  createEffect(() => {
    setLocation(window.location.origin)
  })

  function handleSubmit(e: { preventDefault: () => void; currentTarget: HTMLFormElement; }) {
    e.preventDefault();
    if (store.validation.name.errMsg || !store.validation.name.touched) {
      name.focus();
    } else if (store.validation.email.errMsg || !store.validation.email.touched) {
      email.focus();
    } else {
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
        <NameInput ref={name} name={props.fields.name}/>
        <EmailInput ref={email} name={props.fields.email}/>
        <TextInput label={props.fields.phone} />
        <TextInput label={props.fields.subj} />
      </div>
      <Textarea label={props.fields.textArea} />
      <input tabindex={-1} class={styles.hiddenInput} name="form-link"type="text" value={location().toString()} />
      <button
        class={styles.form__SubmitBtn}
      >
        {!isLoading() && props.fields.btnText}
        {isLoading() && props.fields.loading}
      </button>
      {isFormSended() && <div class={styles.success}>{props.fields.sucMsg}</div>}
      {err() && <div class={styles.error}>{props.fields.fetchErr}</div>}
    </form>
  )
}