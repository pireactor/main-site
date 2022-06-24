import { produce } from "solid-js/store";
import { TextInput } from "../../TextInput";
import { Counter } from "../Counter";
import Radio from "../Radio/Radio"
import { setStore, store } from "../store";
import { TimeRange } from "../TimeRange"
import styles from "./FormTabs.module.scss"

type TEl = { name: string, value: number, tooltip: string }

export function Team() {
  let range: Element;
  let industryEl: HTMLFieldSetElement;
  function clear(ref: Element) {
    ref.querySelectorAll("input").forEach(el => el.checked = false)
  }

  function clearCounter(groups) {
    setStore(groups, produce<TEl[]>(el => el.forEach(i => i.value = 0)))
  }
  function clearRange(ref: Element) {
    ref.querySelectorAll("input").forEach(el => el.checked = false);
    ref.querySelectorAll(".timerange__item_checked").forEach(el => el.classList.remove("timerange__item_checked"));
  }

  return (
    <div class={styles.formSection}>
      <div class={styles.formSection__header}>
        <h3>1. Specify the tech stack and the number of developers you need per each technology</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clearCounter(["frameworks", "db", "langs", "mobiles"])}>Clear all</button>
      </div>
      <fieldset class={styles.formSection__fieldset}>
        <div class={styles.formSection__itemsBlock}>
          {store.frameworks.map(i => <Counter label={i.name} tooltipInfo={i.tooltip} value={i.value} group="frameworks" />)}
        </div>
        <div class={styles.formSection__itemsBlock}>
          {store.langs.map(i => <Counter label={i.name} tooltipInfo={i.tooltip} value={i.value} group="langs" />)}
        </div>
        <div class={styles.formSection__itemsBlock}>
          {store.mobiles.map(i => <Counter label={i.name} tooltipInfo={i.tooltip} value={i.value} group="mobiles" />)}
        </div>
        <div class={styles.formSection__itemsBlock}>
          {store.db.map(i => <Counter label={i.name} tooltipInfo={i.tooltip} value={i.value} group="db" />)}
        </div>
      </fieldset>
      <div class={styles.formSection__header}>
        <h3>2. Extra specialists you need to add to the team</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clearCounter("specs")}>Clear all</button>
      </div>
      <fieldset class={`${styles.formSection__fieldset} ${styles.formSection__fieldsetGrid}`}>
        {store.specs.map(i => <Counter label={i.name} value={i.value} group="specs" />)}
      </fieldset>
      <div class={styles.formSection__header}>
        <h3>3. Please, specify your business industry</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clear(industryEl)}>Clear all</button>
      </div>
      <fieldset ref={industryEl} id="industry" class={styles.formSection__fieldset}>
        <div class={styles.formSection__itemsBlock}>
          <Radio name="industry" label="Financial Services" />
          <Radio name="industry" label="Media & Entertainment" />
          <Radio name="industry" label="iGaming" />
          <Radio name="industry" label="Automotive" />
        </div>
        <div class={styles.formSection__itemsBlock}>
          <Radio name="industry" label="eCommerce" />
          <Radio name="industry" label="Enterprise" />
          <Radio name="industry" label="Logistics" />
          <Radio name="industry" label="Manufacturing" />
        </div>
        <div class={styles.formSection__itemsBlock}>
          <Radio name="industry" label="Travel & Hospitality" />
          <Radio name="industry" label="Real Estate" />
          <Radio name="industry" label="eLearning" />
          <Radio name="industry" label="Aviation" />
        </div>
        <div class={styles.formSection__itemsBlock}>
          <Radio name="industry" label="Telecom" />
          <Radio name="industry" label="Healthcare" />
          <Radio name="industry" label="Retail" />
          <Radio name="industry" label="Other" />
        </div>
      </fieldset>
      <div class={styles.formSection__header}>
        <h3>4. What is the expected duration of your project?</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clearRange(range)}>Clear all</button>
      </div>
      <div class={styles.formSection__duration}>
        <TimeRange ref={range} />
      </div>
      <div class={styles.formSection__header}>
        <h3>5. Contacts</h3>
      </div>
      <fieldset class={styles.formSection__contacts}>
        <TextInput label="Name" />
        <TextInput label="Email" />
        <TextInput label="Phone number" />
      </fieldset>
    </div>
  )
}