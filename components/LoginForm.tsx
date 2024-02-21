"use client";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useUser } from "./contexts/UserContext";
import { useRouter } from "next/navigation";
import { useSocket } from "./contexts/SocketContext";

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

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useUser();
  const { setUserId } = useSocket();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const response = await formAction(formData);
    if (response.error) {
      toast.error(response.error);
      setLoading(false);
      return;
    }

    if (response.user) {
      toast.success("Login successful");
      localStorage.setItem("user", JSON.stringify(response.user));
      setLoading(false);
      setUser({
        name: response.user.name,
        email: response.user.email,
        id: response.user.id,
        username: response.user.username,
        avatar: response.user.avatar,
      });
      setUserId(response.user.id);
      router.push("/");
      return;
    }
  };

  return (
    <form action={handleSubmit}>
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
        onClick={() => {
          if (!formData.email || !formData.password) {
            return;
          }
          setLoading(true);
        }}
      >
        {loading && <Loader2 className="w-6 h-6 animate-spin" />}
        {!loading && "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
