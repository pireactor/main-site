import { FileInput } from "../../FileInput";
import { Textarea } from "../../Textarea";
import { TextInput } from "../../TextInput";
import styles from "./FormTabs.module.scss"


export function DontKnow() {
  return (
    <div class={styles.dontKnow}>
      <fieldset class={styles.fieldset_textInput}>
        <TextInput label="Name" />
        <TextInput label="Email" />
        <TextInput label="Phone number" />
        <TextInput label="Subject" />
      </fieldset>
      <Textarea label="Message (optional)" />
      <FileInput />
    </div>
  )
}