import { createSignal, onCleanup, onMount, Show } from "solid-js";
import styles from "./Counter.module.scss"

interface ICounterProps {
  title: string;
  countTo: number;
}

export function Counter(props: ICounterProps) {
  let elem;
  const [number, setNumber] = createSignal(0);

  function start() {
    const int = setInterval(() => {
      if ((number() < props.countTo)) {
        setNumber(number() + 1)
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
      <span class={styles.counter__count}>{number()}</span>
    </div>
  )
}