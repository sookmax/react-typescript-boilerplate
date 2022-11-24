// https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form

import React, { useCallback, useRef } from "react";
import { classNames } from "../../utils";
import { Input, TextArea } from "./Input";
import StyledInput from "./StyledInput";

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
      <div className={classNames("h-2/3 w-2/3 border border-gray-200 p-4")}>
        <form onSubmit={onSubmit}>
          <ul className="space-y-4">
            <li>
              <StyledInput
                id="user-name"
                name="user-name"
                labelText="name"
                onChange={onChange}
              />
            </li>
            <li>
              <StyledInput
                id="user-email"
                name="user-email"
                type="email"
                labelText="email"
                onChange={onChange}
              />
            </li>
            <li>
              <div className="relative h-36">
                <TextArea
                  id="message"
                  name="message"
                  onChange={onChange}
                  className={classNames(
                    "h-full w-full resize-none p-2 outline-none",
                    "rounded-md border",
                    "focus:border-2 focus:border-green-600",
                    "transition-all duration-100"
                  )}
                />
                <label
                  htmlFor="message"
                  className={classNames(
                    "absolute top-[0.5rem] left-[0.5rem]",
                    "px-1",
                    "pointer-events-none",
                    "bg-white",
                    "text-sm text-gray-500 md:text-base",
                    "[textarea:focus~&]:-translate-y-[1.2rem]",
                    "[textarea:focus~&]:-translate-x-[0.3rem]",
                    "[textarea:focus~&]:scale-75",
                    "transition-transform duration-100"
                  )}
                >
                  Message
                </label>
              </div>
            </li>
            <li>
              <button type="submit">Send your message</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
