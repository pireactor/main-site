import { createEffect, createSignal } from "solid-js";
import { setStore, store } from "../Form/store";
import styles from "./EmailInput.module.scss"

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function handleBlur(e) {
  setStore("validation", "email", "touched", true);
}

function handleChange(e) {
  if(!e.target.value.toLowerCase().match(re)) {
    setStore("validation", "email", "errMsg", "This email is invalid")
  } else {
    setStore("validation", "email", "errMsg", "")
  }
}

interface IEmailInputProps {
  value?: string;
  ref?: any;
  name?: string;
}

export function EmailInput(props: IEmailInputProps) {
  const [isError, setIsError] = createSignal(false)
  
  createEffect(() => {
   if (store.validation.email.errMsg && store.validation.email.touched) {
    setIsError(true)
   } else {
    setIsError(false)
   }
  })
  return (
    <div class={styles.input__wrp}>
      <label class={styles.label}>
      <span>{props.name ?? "Email"}<span class={styles.input_req}>&nbsp;*</span></span>
        <input 
          ref={props.ref}
          name="Email"
          class={styles.input} classList={{[styles.error]: isError()}}
          type="email"
          onBlur={handleBlur}
          onChange={handleChange}
          />
      </label>
      {isError() && <span class={styles.errMsg}>{store.validation.email.errMsg}</span>}
    </div>
  )
}