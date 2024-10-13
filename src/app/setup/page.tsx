"use client";

import { useUser } from "@clerk/nextjs";
import { createUser } from "~/actions/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SetupPage() {
  const { user } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessName: "",
    name: "",
    phoneNumber: "",
    businessDescription: "",
    welcomeMessage: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const createdUser = await createUser({
      ...formData,
      email: user?.emailAddresses[0]?.emailAddress ?? "",
    });
    if (!createdUser) {
      toast.error("Unable to create user");
      return;
    }

    router.push(`/connect/${createdUser.id}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-screen w-1/3 flex-col items-center justify-center gap-y-6 text-white"
    >
      <div className="flex w-full flex-col gap-y-2">
        <label htmlFor="businessName" className="text-base font-medium">
          Business Name*
        </label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          placeholder="Enter your business name."
          value={formData.businessName}
          onChange={handleChange}
          className="w-full rounded-lg border border-white bg-transparent px-4 py-3 placeholder:text-sm placeholder:text-gray-500"
          required
        />
      </div>

      <div className="flex w-full flex-col gap-y-2">
        <label htmlFor="name" className="text-base font-medium">
          Name*
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name."
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-white bg-transparent px-4 py-3 placeholder:text-sm placeholder:text-gray-500"
          required
        />
      </div>

      <div className="flex w-full flex-col gap-y-2">
        <label htmlFor="phoneNumber" className="text-base font-medium">
          Phone Number*
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full rounded-lg border border-white bg-transparent px-4 py-3 placeholder:text-sm placeholder:text-gray-500"
          required
        />
      </div>

      <div className="flex w-full flex-col gap-y-2">
        <label htmlFor="businessDescription" className="text-base font-medium">
          Business Description*
        </label>
        <textarea
          id="businessDescription"
          name="businessDescription"
          placeholder="Describe your business in 1-2 sentences"
          value={formData.businessDescription}
          onChange={handleChange}
          className="w-full rounded-lg border border-white bg-transparent px-4 py-3 placeholder:text-sm placeholder:text-gray-500"
          rows={3}
          required
        ></textarea>
      </div>

      <div className="flex w-full flex-col gap-y-2">
        <label htmlFor="welcomeMessage" className="text-base font-medium">
          Welcome Message*
        </label>
        <textarea
          id="welcomeMessage"
          name="welcomeMessage"
          placeholder="This welcome message will greet all new users"
          value={formData.welcomeMessage}
          onChange={handleChange}
          className="w-full rounded-lg border border-white bg-transparent px-4 py-3 placeholder:text-sm placeholder:text-gray-500"
          rows={2}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-primary px-4 py-2 text-black hover:brightness-125"
      >
        Submit
      </button>
    </form>
  );
}
