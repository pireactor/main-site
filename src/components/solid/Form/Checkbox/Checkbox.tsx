import styles from "./Checkbox.module.scss"

interface ICheckboxProps {
  label: string;
  category: string;
}


export default function Checkbox(props: ICheckboxProps) {
  return (
    <label class={styles.checkbox__label}>
      <input type="checkbox" class={styles.checkbox__input} name={props.category} value={props.label}/>
      <svg class={styles.checkbox__box} width="20" height="20" viewBox="0 0 20 20">
        <rect class={styles.checkbox__focus} width="20" height="20" rx="4" />
        <path class={styles.checkbox__mark} d="M15.3337 6.33331L8.00033 13.6666L4.66699 10.3333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      {props.label}
    </label>
  )
}