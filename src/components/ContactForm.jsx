"use client";

import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const from = `${data["fullName"]} @ ${data["organization"]}`;

    await fetch("/api/sendMail", {
      method: "POST",
      body: JSON.stringify({
        from: from,
        subject: data["subject"],
        content: data["content"],
      }),
    });
  };

  // console.log(errors);
  for (const key in errors) {
    console.log(errors[key].ref.parentElement.classList);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-header">
        <h2>Contact</h2>
      </div>
      <div className="input">
        <label htmlFor="name-field">Full Name</label>
        <input
          type="text"
          autoComplete="off"
          id="name-field"
          {...register("fullName", { required: "*" })}
        />
      </div>
      <div className="input">
        <label htmlFor="organization-field">Organization</label>
        <input
          type="text"
          autoComplete="off"
          id="organization-field"
          {...register("organization", { required: "*" })}
        />
      </div>
      <div className="input">
        <label htmlFor="subject-field">Subject</label>
        <input
          autoComplete="off"
          type="text"
          id="subject-field"
          {...register("subject", { required: "*" })}
        />
      </div>
      <div className="input">
        <label htmlFor="content-field">Content</label>
        <textarea
          rows={6}
          id="content-field"
          autoComplete="off"
          {...register("content", { required: "*" })}
        />
      </div>

      <input className="input btn" type="submit" />
    </form>
  );
}
