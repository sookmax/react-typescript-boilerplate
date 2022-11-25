// https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form

import React, { useCallback, useRef } from "react";
import { classNames } from "../../utils";
import StyledInput from "./StyledInput";
import StyledTextArea from "./StyledTextArea";

export default function YourFirstForm() {
  const formDataRef = useRef<{ [index: string]: string }>({});

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formDataRef.current[e.target.name] = e.target.value;
    },
    []
  );

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(formDataRef.current),
    });
  }, []);

  return (
    <div
      className={classNames("flex h-full w-full items-center justify-center")}
    >
      <form onSubmit={onSubmit} className="h-3/4 w-3/4">
        <fieldset className="flex h-full w-full flex-col justify-between rounded-md border px-3 py-5">
          <legend className="bg-white px-1 text-gray-600">
            Your First Form
          </legend>
          <div className="space-y-3">
            <StyledInput
              id="user-name"
              name="user-name"
              labelText="Name"
              onChange={onChange}
            />
            <StyledInput
              id="user-email"
              name="user-email"
              type="email"
              labelText="Email"
              onChange={onChange}
            />
            <StyledTextArea
              id="message"
              name="message"
              onChange={onChange}
              labelText="Message"
              height={150}
            />
          </div>
          <div>
            <button
              type="submit"
              className="rounded-md bg-green-600 p-3 text-white"
            >
              Send your message
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
