import { FileInput } from "../FileInput";
import { Textarea } from "../Textarea";
import { TextInput } from "../TextInput";

function handleSubmit(e: { preventDefault: () => void; currentTarget: HTMLFormElement; }) {
  e.preventDefault();
  fetch("http://localhost:8888/.netlify/functions/send-email", {
    body: new FormData(e.currentTarget),
    method: "POST",
  }).then((res) => console.log(res))
}

export function FormSubmit() {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <TextInput label="Name" />
        <TextInput label="Email" />
        <TextInput label="Phone number" />
        <TextInput label="Subject" />
      </fieldset>
      <Textarea label="Message (optional)" />
      <FileInput />
      <button>Get a free consultation</button>
    </form>
  )
}