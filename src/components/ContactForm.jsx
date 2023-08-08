"use client";

import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Full Name"
        {...register("Full Name", { required: true })}
      />
      <input
        type="text"
        placeholder="Organization"
        {...register("Organization", { required: true })}
      />
      <input
        type="text"
        placeholder="Subject"
        {...register("Subject", { required: true })}
      />
      <textarea {...register("Content", { required: true })} />

      <input type="submit" />
    </form>
  );
}
