import styles from "./Radio.module.scss"

interface IRadioProps {
  label: string;
  name: string;
}


export default function Radio(props: IRadioProps) {
  return (
    <label class={styles.radio__label}>
      <input type="radio" class={styles.radio__input} name={props.name} value={props.label}/>
      <svg class={styles.radio__box} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class={styles.radio__focus} cx="10" cy="10" r="9.5" fill="#1D1F1F" stroke="#F100AE" />
        <circle class={styles.radio__mark} cx="10" cy="10" r="8" fill="#F100AE" />
      </svg>
      {props.label}
    </label>
  )
}