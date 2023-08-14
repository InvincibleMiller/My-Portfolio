"use client";

import { useForm } from "react-hook-form";
import { useRef } from "react";

function InputField({ id, title, errors, form }) {
  const ref = useRef();

  if (errors[id]) {
    ref.current?.classList.add("error");
  } else {
    ref.current?.classList.remove("error");
  }

  return (
    <div className="input" ref={ref}>
      <label htmlFor={id}>{title}</label>
      <input
        type="text"
        autoComplete="off"
        id={id}
        {...form.register(id, { required: "*" })}
      />
    </div>
  );
}
function TextAreaField({ id, rows, title, errors, form }) {
  const ref = useRef();

  if (errors[id]) {
    ref.current?.classList.add("error");
  } else {
    ref.current?.classList.remove("error");
  }

  return (
    <div className="input" ref={ref}>
      <label htmlFor={id}>{title}</label>
      <textarea
        rows={rows}
        autoComplete="off"
        id={id}
        {...form.register(id, { required: "*" })}
      />
    </div>
  );
}

export default function App() {
  const formState = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = formState;

  const onSubmit = async (data) => {
    const from = `${data["name-field"]} @ ${data["organization-field"]}`;

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

      //
      // Show some success confirmation
      //
    } catch (error) {
      console.error(error);
    }
  };

  const nameElement = useRef();
  const organizationElement = useRef();
  const subjectElement = useRef();
  const contentElement = useRef();

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
          />
          <InputField
            id="organization-field"
            errors={formErrors}
            title="Organization"
            form={formState}
          />
        </span>
        <InputField
          id="subject-field"
          errors={formErrors}
          title="Subject"
          form={formState}
        />
        <TextAreaField
          id={"content-field"}
          rows={6}
          title={"Content"}
          form={formState}
          errors={formErrors}
        />

        <input className="input btn" type="submit" />
      </div>
    </form>
  );
}
