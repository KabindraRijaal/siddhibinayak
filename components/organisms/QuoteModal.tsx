"use client";

import { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Btn } from "@/components/atoms/Btn";
import { toast } from "sonner";

const SERVICES = [
  "Residential Construction",
  "Commercial Construction",
  "Interior Design",
  "Renovation & Retrofit",
  "Hospitality Construction",
  "Civil Works",
  "Project Management",
  "Structural Consulting",
];

interface QuoteCtx {
  open: (service?: string) => void;
}

const QuoteContext = createContext<QuoteCtx>({ open: () => {} });
export const useQuote = () => useContext(QuoteContext);

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [service, setService] = useState<string | null>(null);

  return (
    <QuoteContext.Provider value={{ open: (s = "") => setService(s) }}>
      {children}
      <Dialog open={service !== null} onOpenChange={(v) => !v && setService(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-head text-xl font-bold text-primary">
              Request a Quote
            </DialogTitle>
          </DialogHeader>
          <QuoteForm
            defaultService={service ?? ""}
            onDone={() => setService(null)}
          />
        </DialogContent>
      </Dialog>
    </QuoteContext.Provider>
  );
}

function QuoteForm({
  defaultService,
  onDone,
}: {
  defaultService: string;
  onDone: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Quote request sent! We'll contact you within 24 hours.");
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
      <div className="grid grid-cols-2 gap-4">
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
        <Label>Service Type *</Label>
        <Select defaultValue={defaultService || undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Project Description</Label>
        <Textarea
          placeholder="Tell us about your project — location, size, timeline, budget..."
          rows={4}
        />
      </div>
      <Btn type="submit" className="w-full justify-center" disabled={loading}>
        {loading ? "Sending..." : "Submit Request →"}
      </Btn>
    </form>
  );
}
