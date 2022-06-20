import styles from "./TextInput.module.scss"

interface ITextInputProps {
  label: string;
}

export function TextInput(props: ITextInputProps) {
  return (
    <label class={styles.label}>
      {props.label}
      <input class={styles.input} type="text" />
    </label>
  )
}