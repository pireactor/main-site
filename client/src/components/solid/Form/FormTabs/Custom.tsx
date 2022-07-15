import { onMount } from "solid-js";
import { EmailInput } from "../../EmailInput";
import { NameInput } from "../../NameInput";
import { TextInput } from "../../TextInput";
import Checkbox from "../Checkbox/Checkbox"
import Radio from "../Radio/Radio"
import { TimeRange } from "../TimeRange"
import styles from "./FormTabs.module.scss"


interface ICustomProps {
  ref: any;
  emailRefCallback: any;
}
export function Custom(props: ICustomProps) {
  let devEl: HTMLFieldSetElement;
  let stageEl: HTMLFieldSetElement;
  let specEl: HTMLFieldSetElement;
  let industryEl: HTMLFieldSetElement;
  let range: Element;

  function clear(ref: Element) {
    ref.querySelectorAll("input").forEach(el => el.checked = false)
  }
  function clearRange(ref: Element) {
    ref.querySelectorAll("input").forEach(el => el.checked = false);
    ref.querySelectorAll(".timerange__item_checked").forEach(el => el.classList.remove("timerange__item_checked"));

  }
  return (
    <div class={styles.formSection}>
      <div class={styles.formSection__header}>
        <h3 class={styles.formSection__caption}>1. What type of software solution would you like to develop with Andersen?</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clear(devEl)}>Clear all</button>
      </div>
      <fieldset ref={devEl} class={styles.formSection__fieldset}>
        <Checkbox category="develop-solution" label="Desktop" />
        <Checkbox category="develop-solution" label="Mobile" />
        <Checkbox category="develop-solution" label="Web" />
        <Checkbox category="develop-solution" label="Consultancy needed" />
      </fieldset>
      <div class={styles.formSection__header}>
        <h3 class={styles.formSection__caption}>2. What is the current stage of your software development process?</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clear(stageEl)}>Clear all</button>
      </div>
      <fieldset ref={stageEl} id="stage" class={styles.formSection__fieldset}>
        <Radio name="stage" label="Idea" />
        <Radio name="stage" label="Prototype/Specification" />
        <Radio name="stage" label="Designed solution" />
        <Radio name="stage" label="MVP" />
      </fieldset>
      <div class={styles.formSection__header}>
        <h3 class={styles.formSection__caption}>3. Do you need a professional consultation from any of the specialists below?</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clear(specEl)}>Clear all</button>
      </div>
      <fieldset ref={specEl} class={styles.formSection__fieldset}>
        <Checkbox category="specialist" label="Project Manager" />
        <Checkbox category="specialist" label="Business Analyst" />
        <Checkbox category="specialist" label="UI/UX Designer" />
        <Checkbox category="specialist" label="Architect" />
      </fieldset>
      <div class={styles.formSection__header}>
        <h3 class={styles.formSection__caption}>4. Please, specify your business industry</h3>
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
        <h3 class={styles.formSection__caption}>5. What is the expected duration of your project?</h3>
        <button type="button" class={styles.formSection__clear} onClick={() => clearRange(range)}>Clear all</button>
      </div>
      <div class={styles.formSection__duration}>
        <TimeRange ref={range} />
      </div>
      <div class={styles.formSection__header}>
        <h3>6. Contacts</h3>
      </div>
      <fieldset class={styles.formSection__contacts}>
        <NameInput ref={props.ref}/>
        <EmailInput ref={props.emailRefCallback}/>
        <TextInput label="Phone number" />
      </fieldset>
    </div>
  )
}