"use client";

import { useForm } from "react-hook-form";
import { useRef } from "react";

function InputField({
  id,
  title,
  errors,
  form,
  type = "text",
  placeHolder = "",
  options = {},
}) {
  const ref = useRef();

  if (errors[id]) {
    ref.current?.classList.add("error");
  } else {
    ref.current?.classList.remove("error");
  }

  return (
    <div className="input" ref={ref}>
      <label htmlFor={id}>
        {title}
        {errors[id] && <> — {errors[id]?.message}</>}
      </label>
      <input
        type={type}
        autoComplete="off"
        id={id}
        placeholder={placeHolder}
        {...form.register(id, { required: "Required", ...options })}
      />
    </div>
  );
}
function TextAreaField({
  id,
  rows,
  title,
  errors,
  form,
  placeHolder = "",
  options = {},
}) {
  const ref = useRef();

  if (errors[id]) {
    ref.current?.classList.add("error");
  } else {
    ref.current?.classList.remove("error");
  }

  return (
    <div className="input" ref={ref}>
      <label htmlFor={id}>
        {title}
        {errors[id] && <> — {errors[id]?.message}</>}
      </label>
      <textarea
        rows={rows}
        autoComplete="off"
        id={id}
        placeholder={placeHolder}
        {...form.register(id, { required: "Required", ...options })}
      />
    </div>
  );
}

export default function App() {
  const formState = useForm();
  const submitButton = useRef();

  const {
    reset,
    handleSubmit,
    formState: { errors: formErrors },
  } = formState;

  const onSubmit = async (data) => {
    const from = `${data["name-field"]} — ${data["email-field"]}`;

    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        body: JSON.stringify({
          from: from,
          subject: data["subject-field"],
          content: data["content-field"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      reset();

      (async () => {
        submitButton.current.innerText = "Success!";
        setTimeout(() => {
          submitButton.current.innerText = "Submit";
        }, 2000);
      })();
    } catch (error) {
      console.error(error);
    }
  };

  const emailRex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-header">
        <h2 className="section-header">Contact</h2>
        <p>
          Interested in working with me? Reach out, and let's schedule a
          meeting.
        </p>
      </div>
      <div className="fields">
        <span className="row">
          <InputField
            id="name-field"
            errors={formErrors}
            title="Full Name"
            form={formState}
            placeHolder="John Doe"
          />
          <InputField
            id="email-field"
            errors={formErrors}
            title="Email"
            form={formState}
            placeHolder="johndoe@email.com"
            options={{
              validate: (v) => {
                if (!emailRex.exec(v)) {
                  return "Invalid Email";
                }

                return true;
              },
            }}
          />
        </span>
        <InputField
          id="subject-field"
          errors={formErrors}
          title="Subject"
          placeHolder="Contracted Service Request"
          form={formState}
        />
        <TextAreaField
          id={"content-field"}
          rows={6}
          title={"Content"}
          form={formState}
          placeHolder={
            "{COMPANY NAME} is interested in employing you to do a job..."
          }
          errors={formErrors}
          options={{
            validate: (v) => v.length > 60 || "at least 60 characters",
          }}
        />

        <button ref={submitButton} className="input btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
