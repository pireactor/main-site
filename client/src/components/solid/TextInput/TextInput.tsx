import styles from "./TextInput.module.scss"

interface ITextInputProps {
  label: string;
  name?: string;
}

export function TextInput(props: ITextInputProps) {
  return (
    <label class={styles.label}>
      {props.label}
      <input name={props.label} class={styles.input} type="text" />
    </label>
  )
}