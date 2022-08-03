import { createEffect, createSignal, onMount } from "solid-js";
import { produce } from "solid-js/store";
import { setStore, store } from "../store";
import styles from "./Counter.module.scss"

interface ICounterProps {
  label: string;
  tooltipInfo?: string;
  value: number;
  group: "frameworks" | "langs" | "mobiles" | "db" | "specs";
}

export function Counter(props: ICounterProps) {
  const name = props.label;
  if(!Array.isArray(store[props.group])) return <div>no data</div>
  
  const [curEl] = store[props.group].filter(i => i.name === name) ?? [];
  type TEl = {
    name: string;
    value: number;
    tooltip: string;
  }
  function incr(name: string) {
    setStore(props.group, el => el.name === name, produce<TEl>((el) => (el.value++)));
    if (curEl.value < 0) {
      setStore(props.group, el => el.name === name, produce<TEl>((el) => (el.value = 0)));
      ;
    }
  }
  function decr(name: string) {
    if (curEl.value <= 0) {
      setStore(props.group, el => el.name === name, produce<TEl>((el) => (el.value = 0)));
    } else {
      setStore(props.group, el => el.name === name, produce<TEl>((el) => (el.value = el.value - 1)));
    };
  }

  function changeHandler(e, name: string) {
    if (parseInt(e.currentTarget.value, 10) <= 0) {
      setStore(props.group, el => el.name === name, produce<TEl>(el => el.value = 0));
    } else {
      setStore(props.group, el => el.name === name, produce<TEl>(el => el.value = parseInt(e.currentTarget.value, 10)));
    };
  }
  return (
    <div class={styles.counter}>
      <div class={styles.counter__label}>
        <span class={styles.counter__labelText}>{props.label}</span>
        {props.tooltipInfo && (
          <div class={styles.label__tooltip}>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.99974 14.5027C11.3149 14.5027 14.0024 11.8152 14.0024 8.50001C14.0024 5.18483 11.3149 2.49734 7.99974 2.49734C4.68456 2.49734 1.99707 5.18483 1.99707 8.50001C1.99707 11.8152 4.68456 14.5027 7.99974 14.5027Z" stroke="#FF79DA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7.33301 10.834H8.87301" stroke="#FF79DA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8.1062 10.8347V8H7.33887" stroke="#FF79DA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8.06673 5.99668C8.06673 6.02965 8.05696 6.06187 8.03864 6.08928C8.02033 6.11669 7.9943 6.13805 7.96385 6.15066C7.93339 6.16328 7.89988 6.16658 7.86755 6.16015C7.83522 6.15372 7.80552 6.13784 7.78221 6.11454C7.75891 6.09123 7.74303 6.06153 7.7366 6.0292C7.73017 5.99687 7.73347 5.96336 7.74609 5.9329C7.7587 5.90245 7.78006 5.87642 7.80747 5.85811C7.83488 5.83979 7.8671 5.83002 7.90007 5.83002" stroke="#FF79DA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7.89941 5.83002C7.94362 5.83002 7.98601 5.84758 8.01726 5.87883C8.04852 5.91009 8.06608 5.95248 8.06608 5.99668" stroke="#FF79DA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class={styles.label__tooltipInfo}>
              {props.tooltipInfo}
            </div>
          </div>
        )}
      </div>
      <div class={styles.counter__counter}>
        <button class={styles.counter__btn} type="button" onClick={[decr, name]} disabled={!curEl?.value}>
          <svg width="12" height="3" viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5H11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <input size={2} class={styles.counter__input} type="number" name={props.label} value={curEl?.value} onChange={(e) => changeHandler(e, name)} />
        <button class={styles.counter__btn} type="button" onClick={[incr, name]}>
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1.5V11.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 6.5H11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

      </div>
    </div>
  )
}