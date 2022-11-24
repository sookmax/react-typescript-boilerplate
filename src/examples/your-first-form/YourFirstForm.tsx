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
      <fieldset
        className={classNames(
          "h-2/3 w-2/3 rounded-md border border-gray-200 p-4"
        )}
      >
        <legend className="bg-white px-1 text-gray-600">Your First Form</legend>
        <form onSubmit={onSubmit} className="h-full w-full">
          <ul className="flex h-full w-full flex-col justify-between">
            <li className="space-y-4">
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
            </li>
            <li>
              <button
                type="submit"
                className="rounded-md bg-green-600 p-3 text-white"
              >
                Send your message
              </button>
            </li>
          </ul>
        </form>
      </fieldset>
    </div>
  );
}
