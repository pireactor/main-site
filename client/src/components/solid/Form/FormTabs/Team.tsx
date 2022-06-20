import { Counter } from "../Counter";
import Radio from "../Radio/Radio"
import { TimeRange } from "../TimeRange"
import { db, frameworks, langs, mobiles } from "./data";
import styles from "./FormTabs.module.scss"

export function Team() {

  let tech: HTMLFieldSetElement;
  let spec: HTMLFieldSetElement;
  let industryEl: HTMLFieldSetElement;
  let range: Element;
  function clear(ref: Element) {
    ref.querySelectorAll("input").forEach(el => el.checked = false)
  }
  function clearCounter(ref: Element) {
    ref.querySelectorAll("input").forEach(el => el.value = "0")
  }
  function clearRange(ref: Element) {
    ref.querySelectorAll("input").forEach(el => el.checked = false);
    ref.querySelectorAll(".timerange__item_checked").forEach(el => el.classList.remove("timerange__item_checked"));
  }

  return (
    <div class={styles.formSection}>
      <div class={styles.formSection__header}>
        <h3>1. Specify the tech stack and the number of developers you need per each technology</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clearCounter(tech)}>Clear all</button>
      </div>
      <fieldset ref={tech} class={styles.formSection__fieldset}>
        <div class={styles.formSection__itemsBlock}>
          {
            frameworks.map(i => <Counter label={i} tooltipInfo={i} />)
          }
        </div>
        <div class={styles.formSection__itemsBlock}>
          {
            langs.map(i => <Counter label={i} tooltipInfo={i} />)
          }
        </div>
        <div class={styles.formSection__itemsBlock}>
          {
            mobiles.map(i => <Counter label={i} tooltipInfo={i} />)
          }
        </div>
        <div class={styles.formSection__itemsBlock}>
          {
            db.map(i => <Counter label={i} tooltipInfo={i} />)
          }
        </div>
      </fieldset>
      <div class={styles.formSection__header}>
        <h3>2. Extra specialists you need to add to the team</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clearCounter(spec)}>Clear all</button>
      </div>
      <fieldset ref={spec} class={styles.formSection__fieldset}>
        <div class={styles.formSection__itemsBlock}>
          {
            frameworks.map(i => <Counter label={i} tooltipInfo={i} />)
          }
        </div>
        <div class={styles.formSection__itemsBlock}>
          {
            langs.map(i => <Counter label={i} tooltipInfo={i} />)
          }
        </div>
        <div class={styles.formSection__itemsBlock}>
          {
            mobiles.map(i => <Counter label={i} tooltipInfo={i} />)
          }
        </div>
        <div class={styles.formSection__itemsBlock}>
          {
            db.map(i => <Counter label={i} tooltipInfo={i} />)
          }
        </div>
      </fieldset>
      <div class={styles.formSection__header}>
        <h3>3. Please, specify your business industry</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clear(industryEl)}>Clear all</button>
      </div>
      <fieldset ref={industryEl} id="industry" class={`${styles.formSection__fieldset} ${styles.formSection__fieldsetGrid}`}>
          <Counter label="Project Manager" />
          <Counter label="UI/UX Designer" />
          <Counter label="Business Analyst" />
          <Counter label="DevOps Specialist" />
          <Counter label="QA/QA Automation Engineer" />
          <Counter label="Support Specialist" />
          <Counter label="IT Security Specialist" />
          <Counter label="Solution Architects" />
      </fieldset>
      <div class={styles.formSection__header}>
        <h3>4. What is the expected duration of your project?</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clearRange(range)}>Clear all</button>
      </div>
      <div class={styles.formSection__duration}>
        <TimeRange ref={range} />
      </div>
    </div>
  )
}