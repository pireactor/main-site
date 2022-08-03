import { createSignal } from "solid-js";
import { range } from "../../../../../helpers/range";
import "./TimeRange.scss"

function mounthValue(n: number, isMob?: boolean) {
  let text = n === 0 ? `${n + 1} month` : `${n + 1} months`;
  isMob ? text = `${n + 1} m` : text;
  return text;
}

interface ITimeRangeProps {
  duration?: number;
  ref?: any;
}

export function TimeRange({ duration = 24, ...props}: ITimeRangeProps) {
  const [checked, setChecked] = createSignal();
  function handleClick(n: number) {
    setChecked(n)
  }
  return (
    <div class="timerange" ref={props.ref}>
      <div class="timerange__scale">
        {
          Array.from(range(duration)).map((n) => {
            return (
              <div
                class="timerange__item"
                classList={{ timerange__item_every: (n + 1) % 6 === 0, timerange__item_checked: checked() > n }}
                onClick={() => handleClick(n)}
              >
                <div class="timerange__tooltip">
                  {mounthValue(n)}
                </div>
                <label>
                  <input type="radio" class="timerange__input" name="duration" value={n + 1} />
                  <svg class="timerange__box" viewBox="0 0 16 16" fill="none" >
                    <circle class="timerange__focus" cx="8" cy="8.00098" r="7.5" fill="white" />
                  </svg>
                </label>
              </div>
            )
          })
        }
      </div>
      <div class="timerange__legend">
        {
          Array.from(range(duration)).map(n => {
            const isNotEverySix = (n + 1) % 6;
            if (isNotEverySix && n !== 0) return
            let monthString: string;
            let monthStringMob: string;
            if (n === 0 || !isNotEverySix) {
              monthString = mounthValue(n)
              monthStringMob = mounthValue(n, true)
            }
            return (
              <>
                <span class="timerange__label">{monthString}</span>
                <span class="timerange__label timerange__label_mob">{monthStringMob}</span>
              </>
            )
          })
        }
      </div>
    </div>

  )
}