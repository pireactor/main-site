import { EmailInput } from "../../EmailInput";
import { NameInput } from "../../NameInput";
import { Textarea } from "../../Textarea";
import { TextInput } from "../../TextInput";
import styles from "./FormTabs.module.scss"

interface IDontKnowProps {
  ref: any;
  emailRefCallback: any;
}
export function DontKnow(props: IDontKnowProps) {
  return (
    <div class={styles.formSection}>
      <fieldset class={styles.fieldset_textInput}>
        <NameInput ref={props.ref}/>
        <EmailInput ref={props.emailRefCallback}/>
        <TextInput label="Phone number" />
        <TextInput label="Subject" />
      </fieldset>
      <Textarea label="Message (optional)" />
    </div>
  )
}