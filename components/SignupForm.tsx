"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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

const SignupForm = ({
  formAction,
  sendVerificationMail,
}: {
  formAction: (formData: any) => any;
  sendVerificationMail: (id: string) => any;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    uid: "",
  });

  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const [user, setUser] = useUser();
  const { setUserId } = useSocket();

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

    const emailVerificationRes = await sendVerificationMail(response.user.id);

    if (emailVerificationRes.error) {
      toast.error(emailVerificationRes.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success("Signup successful and Email sent");
    localStorage.setItem("user", JSON.stringify(response.user));
    setUser(response.user);
    // setUserId(response.user.id);
    route.push("/");
    return;
  };

  useEffect(() => {
    if (user) {
      route.push("/");
    }
  }, [user]);

  return (
    <form action={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <InputWrapper
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          handleChange={handleChange}
        />

        <InputWrapper
          name="uid"
          label="Collge UID"
          type="text"
          placeholder="Enter your uid"
          value={formData.uid}
          handleChange={handleChange}
        />

        <InputWrapper
          name="email"
          label="Email"
          type="text"
          placeholder="Enter your email"
          value={formData.email}
          handleChange={handleChange}
        />

        <InputWrapper
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={formData.password}
          handleChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 mt-4"
        onClick={() => {
          if (
            !formData.email ||
            !formData.name ||
            !formData.password ||
            !formData.uid
          ) {
            return;
          } else {
            setLoading(true);
          }
        }}
      >
        {loading && <Loader2 className="animate-spin" size={20} />}
        {!loading && "Signup"}
      </Button>
    </form>
  );
};

export default SignupForm;
