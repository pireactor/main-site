import styles from "./Textarea.module.scss"

interface ITextareaProps {
  label: string
}

export function Textarea(props: ITextareaProps) {
  return (
    <label class={styles.label}>
      {props.label}
      <textarea
        class={styles.input}
        placeholder="Describe your project"
        rows={10}
      />
    </label>
  )
}