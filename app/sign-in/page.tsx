"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "../../Providers/ThemeToggle";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("auth");
    router.replace(isAuthenticated ? "/dashboard" : "/sign-in");
  }, [router]);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    const {email,password} = formData || {};

    if (!email || !password) return;

    localStorage.setItem("auth", JSON.stringify({
      email,
      password,
    }));

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-dark-blue">
      {/* LEFT SIDE – FORM */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="lg:text-start text-center">
            <Image
              src="/maglo.svg"
              alt="Passbook Logo"
              width={50}
              height={40}
              className="bg-white rounded-2xl mx-auto lg:mx-0"
            />
            <h2 className="mt-8 text-2xl font-bold tracking-tight text">
              Welcome back
            </h2>
            <p className="text mt-2 text-sm opacity-70">
              Welcome back! Please enter your details
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="Enter the email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            {/* Password */}
            <div className="space-y-3">
           

            <div className="mt-2">
             <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter the password"
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
                </div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                <Input id="remember" name="remember" type="checkbox" />
                <span className="block text-sm font-medium text">
                  Remember me
                </span>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Button */}
            <Button
              buttonType="submit"
              title="Sign In"
            />
          </form>
        </div>
      </div>

      {/* RIGHT SIDE – IMAGE */}
      <div className="relative hidden lg:block h-[calc(100vh)] w-full">
        <Image
          src="/auth-bg.png"
          alt="Hero Image"
          fill
          className="object-cover"
        />
      </div>

      <ThemeToggle />
    </div>
  );
}
