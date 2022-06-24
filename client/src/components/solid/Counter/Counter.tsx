import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { TFormat } from "../../../models/ProjectModel";
import styles from "./Counter.module.scss"

interface ICounterProps {
  title: string;
  countTo: number;
  format?: TFormat;
}

export function Counter(props: ICounterProps) {
  let elem;
  const [number, setNumber] = createSignal(0);
  const step = props.countTo > 1000 ? 100 : props.countTo > 100 ? 10 : 1;

  function start() {
    const int = setInterval(() => {
      if ((number() < props.countTo)) {
        setNumber(number() + step)
      } else clearInterval(int)
    }, 50)
  }

  onMount(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > elem.getBoundingClientRect().y) {
        start()
      } else setNumber(0)
    })
  })


  return (
    <div class={styles.counter} ref={elem}>
      <span class={styles.counter__title}>{props.title}</span>
      <span class={styles.counter__count}>{props.format && props.format + ' '}{number()}</span>
    </div>
  )
}