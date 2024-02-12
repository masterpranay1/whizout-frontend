"use client";
import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

const InputWrapper = ({
  name,
  label,
  type,
  placeholder,
  message,
  warning,
  value: inputValue,
  handleChange: onChange,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  message?: string;
  warning?: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="my-3">
      <Label htmlFor={name} className="text-slate-400 text-sm">
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        className="my-2"
        value={inputValue}
        onChange={onChange}
      />
      {message && <span>{message}</span>}
      {warning && <span className="text-red-600">{warning}</span>}
    </div>
  );
};

const LoginForm = ({ formAction }: { formAction: (formData: any) => any }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      action={async () => {
        const response = await formAction(formData);
        if (response.error) {
          toast.error(response.error);
          return;
        }

        if (response.user) {
          toast.success("Login successful");
          localStorage.setItem("user", JSON.stringify(response.user));
          return;
        }
      }}
    >
      <InputWrapper
        name="email"
        label="Email"
        type="text"
        placeholder="Enter your email"
        warning=""
        value={formData.email}
        handleChange={handleChange}
      />
      <InputWrapper
        name="password"
        label="Password"
        type="password"
        placeholder="Password"
        warning=""
        value={formData.password}
        handleChange={handleChange}
      />
      <Button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 mt-4"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
