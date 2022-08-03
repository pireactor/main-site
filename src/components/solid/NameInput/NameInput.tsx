import { createEffect, createSignal } from "solid-js";
import { ELangs } from "../../../enums/ELangs";
import { setStore, store } from "../Form/store";
import styles from "./NameInput.module.scss"


function handleBlur(e) {
  setStore("validation", "name", "touched", true);
}

function handleChange(e) {
  if(e.target.value.trim().length < 2) {
    setStore("validation", "name", "errMsg", "Must be more than 2 chars")
  } else {
    setStore("validation", "name", "errMsg", "")
    console.log(store.validation.name.errMsg)
  }
}

interface INameInputProps {
  value?: string;
  ref?: any;
  name?: string;
}

export function NameInput(props: INameInputProps) {
  const [isError, setIsError] = createSignal(false)
  
  createEffect(() => {
   if (store.validation.name.errMsg && store.validation.name.touched) {
    setIsError(true)
   } else {
    setIsError(false)
   }
  })
  return (
    <div class={styles.input__wrp}>
      <label class={styles.label}>
        <span>{props.name ?? "Name"}<span class={styles.input_req}>&nbsp;*</span></span>
        <input 
          ref={props.ref}
          name="Name"
          class={styles.input} classList={{[styles.error]: isError()}}
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          />
      </label>
      {isError() && <span class={styles.errMsg}>{store.validation.name.errMsg}</span>}
    </div>
  )
}