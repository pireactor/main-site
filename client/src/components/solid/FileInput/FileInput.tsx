import styles from "./FileInput.module.scss"

export function FileInput() {
  let fileInput;
  let label

  function handleChange() {
    // label.innerText = fileInput?.files[0].name ?? "Attach file";
  }
  return (
    <label class={styles.label} ref={label}>
      <input class={styles.input} type="file" ref={fileInput} onChange={handleChange}/>
      <button type="button" classList={{[styles.label]: fileInput.files[0].name}}> Clear</button>
      Attach file
    </label>
  )
}