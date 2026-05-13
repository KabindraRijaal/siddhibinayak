"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Btn } from "@/components/atoms/Btn";
import { toast } from "sonner";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Message sent! We'll get back to you within 24 hours.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Full Name *</Label>
          <Input placeholder="Your name" required />
        </div>
        <div className="space-y-1.5">
          <Label>Phone *</Label>
          <Input placeholder="+977 98XXXXXXXX" required />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Email</Label>
        <Input type="email" placeholder="you@example.com" />
      </div>
      <div className="space-y-1.5">
        <Label>Subject</Label>
        <Input placeholder="How can we help you?" />
      </div>
      <div className="space-y-1.5">
        <Label>Message *</Label>
        <Textarea
          placeholder="Tell us about your project or inquiry..."
          rows={5}
          required
        />
      </div>
      <Btn type="submit" className="self-start" disabled={loading}>
        {loading ? "Sending..." : "Send Message →"}
      </Btn>
    </form>
  );
}
