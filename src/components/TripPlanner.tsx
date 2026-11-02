import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Mail, Phone, RotateCcw, Send } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { BUSINESS, DESTINATION_GROUPS, IMAGES, MAIL_LINK, PLANNING_STEPS, TEL_LINK, mailLink, px, pxSet, waLink } from "@/data/site";

export interface PlanPreset {
  destination?: string;
  message?: string;
  key: number;
}

interface TripPlannerProps {
  preset: PlanPreset;
}

interface FormState {
  name: string;
  phone: string;
  destination: string;
  date: string;
  travellers: string;
  days: string;
  budget: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  phone: "",
  destination: "",
  date: "",
  travellers: "",
  days: "",
  budget: "",
  message: "",
};

function todayISO(): string {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.name.trim().length < 2) errors.name = "Please tell us your name.";
  const digits = form.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) errors.phone = "Please enter a valid phone number.";
  if (!form.destination) errors.destination = "Please choose a destination.";
  if (form.travellers && Number(form.travellers) < 1) errors.travellers = "At least one traveller.";
  if (form.days && Number(form.days) < 1) errors.days = "At least one day.";
  return errors;
}

function buildSummary(form: FormState): string {
  const lines = [
    "Hello Journey of Dev Bhumi! I'd like to plan a trip.",
    "",
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Destination: ${form.destination}`,
  ];
  if (form.date) lines.push(`Travel date: ${formatDate(form.date)}`);
  if (form.travellers) lines.push(`Travellers: ${form.travellers}`);
  if (form.days) lines.push(`Days: ${form.days}`);
  if (form.budget.trim()) {
    const budget = form.budget.trim();
    lines.push(`Approx. budget: ${/^(₹|rs\.?|inr)/i.test(budget) ? budget : `₹${budget}`}`);
  }
  if (form.message.trim()) lines.push("", `Requirements: ${form.message.trim()}`);
  return lines.join("\n");
}

export function TripPlanner({ preset }: TripPlannerProps) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const minDate = useMemo(todayISO, []);

  /* Apply presets coming from destination / journey CTAs */
  useEffect(() => {
    if (preset.key === 0) return;
    setSubmitted(false);
    setForm((f) => ({
      ...f,
      destination: preset.destination ?? f.destination,
      message: preset.message && !f.message ? preset.message : f.message,
    }));
    const t = window.setTimeout(() => {
      if (!nameRef.current?.value) nameRef.current?.focus({ preventScroll: true });
    }, 700);
    return () => window.clearTimeout(t);
  }, [preset]);

  const update = (field: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const summary = useMemo(() => buildSummary(form), [form]);
  const whatsappUrl = waLink(summary);
  const emailUrl = mailLink(`Trip enquiry – ${form.destination || "Journey of Dev Bhumi"}`, summary);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`plan-${first}`)?.focus();
      return;
    }
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setSubmitted(false);
  };

  const firstName = form.name.trim().split(/\s+/)[0] || "traveller";

  return (
    <section id="plan" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={px(IMAGES.plannerBackground, 1920, 1280)}
          srcSet={pxSet(IMAGES.plannerBackground, [960, 1440, 1920, 2400], 3 / 2)}
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-forest-950/70" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-transparent to-forest-950/80" />
      </div>

      <div className="shell relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="light" className="justify-center">
              Custom Trip Planner
            </Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] text-snow sm:text-5xl lg:text-[3.5rem]">
              Tell Us Where You Want to Go. <span className="italic text-gold-300">We'll Help Plan the Journey.</span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-sand-200/85 sm:text-lg">
              Share a few details and we'll come back to you with a personalised plan — no obligation, just a friendly
              conversation about your trip.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-14 grid max-w-6xl overflow-hidden rounded-[2rem] bg-snow shadow-lift lg:grid-cols-5">
            {/* Info panel */}
            <aside className="relative bg-forest-900 p-7 text-snow sm:p-9 lg:col-span-2 lg:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_100%_0%,rgba(205,166,89,0.2),transparent_60%)]"
              />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-300">How it works</p>
                <h3 className="mt-3 font-display text-3xl font-light leading-tight tracking-tight">
                  A few details is all we need to begin.
                </h3>

                <ol className="mt-8 space-y-6">
                  {PLANNING_STEPS.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-400/50 font-display text-base text-gold-300">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-snow">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-sand-200/75">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 border-t border-white/10 pt-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-300">Prefer to talk?</p>
                  <ul className="mt-4 space-y-3 text-sm">
                    <li>
                      <a href={TEL_LINK} className="group inline-flex items-center gap-3 text-snow/90 transition-colors hover:text-gold-300">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-gold-500/20">
                          <Phone className="h-4 w-4" aria-hidden="true" />
                        </span>
                        {BUSINESS.phoneDisplay}
                      </a>
                    </li>
                    <li>
                      <a
                        href={waLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 text-snow/90 transition-colors hover:text-gold-300"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-gold-500/20">
                          <WhatsAppIcon className="h-4 w-4" />
                        </span>
                        Chat on WhatsApp
                      </a>
                    </li>
                    <li>
                      <a href={MAIL_LINK} className="group inline-flex items-center gap-3 text-snow/90 transition-colors hover:text-gold-300">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-gold-500/20">
                          <Mail className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="break-all">{BUSINESS.email}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Form / confirmation */}
            <div className="p-6 sm:p-9 lg:col-span-3 lg:p-10">
              {submitted ? (
                <div className="flex h-full flex-col justify-center animate-fade-up [animation-duration:700ms]" role="status" aria-live="polite">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 ring-1 ring-gold-400/40">
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-light tracking-tight text-forest-950 sm:text-4xl">
                    Thank you, <span className="italic">{firstName}</span>!
                  </h3>
                  <p className="mt-4 text-pretty leading-relaxed text-earth-700">
                    Your trip details for <strong className="font-semibold text-forest-900">{form.destination}</strong> are
                    ready. We've opened WhatsApp with your enquiry — just tap send and we'll get back to you with a
                    personalised plan. If WhatsApp didn't open, use one of the options below.
                  </p>

                  <div className="mt-6 rounded-2xl border border-sand-200 bg-sand-50 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-earth-500">Your enquiry</p>
                    <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-earth-700">
                      {summary.split("\n").slice(2).join("\n")}
                    </pre>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button href={whatsappUrl} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" icon={<WhatsAppIcon />} className="flex-1">
                      Send on WhatsApp
                    </Button>
                    <Button href={emailUrl} variant="outline" size="lg" icon={<Mail />} className="flex-1">
                      Send by Email
                    </Button>
                  </div>

                  <button
                    type="button"
                    onClick={reset}
                    className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-earth-500 transition-colors hover:text-forest-900"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Plan another trip
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="plan-name" label="Full Name" error={errors.name} required>
                      <input
                        ref={nameRef}
                        id="plan-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => update("name")(e.target.value)}
                        className={cn("field-input", errors.name && "field-input-error")}
                        aria-invalid={Boolean(errors.name)}
                        required
                      />
                    </Field>
                    <Field id="plan-phone" label="Phone Number" error={errors.phone} required>
                      <input
                        id="plan-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => update("phone")(e.target.value)}
                        className={cn("field-input", errors.phone && "field-input-error")}
                        aria-invalid={Boolean(errors.phone)}
                        required
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="plan-destination" label="Destination" error={errors.destination} required>
                      <div className="relative">
                        <select
                          id="plan-destination"
                          name="destination"
                          value={form.destination}
                          onChange={(e) => update("destination")(e.target.value)}
                          className={cn("field-input appearance-none pr-10", !form.destination && "text-earth-300", errors.destination && "field-input-error")}
                          aria-invalid={Boolean(errors.destination)}
                          required
                        >
                          <option value="" disabled>
                            Choose a destination
                          </option>
                          {DESTINATION_GROUPS.map((group) => (
                            <optgroup key={group.label} label={group.label} className="text-earth-900">
                              {group.options.map((opt) => (
                                <option key={opt} value={opt} className="text-earth-900">
                                  {opt}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-earth-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </Field>
                    <Field id="plan-date" label="Travel Date">
                      <input
                        id="plan-date"
                        name="date"
                        type="date"
                        min={minDate}
                        value={form.date}
                        onChange={(e) => update("date")(e.target.value)}
                        className={cn("field-input", !form.date && "text-earth-500")}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <Field id="plan-travellers" label="Number of Travellers" error={errors.travellers}>
                      <input
                        id="plan-travellers"
                        name="travellers"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={60}
                        placeholder="e.g. 4"
                        value={form.travellers}
                        onChange={(e) => update("travellers")(e.target.value)}
                        className={cn("field-input", errors.travellers && "field-input-error")}
                      />
                    </Field>
                    <Field id="plan-days" label="Number of Days" error={errors.days}>
                      <input
                        id="plan-days"
                        name="days"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={60}
                        placeholder="e.g. 6"
                        value={form.days}
                        onChange={(e) => update("days")(e.target.value)}
                        className={cn("field-input", errors.days && "field-input-error")}
                      />
                    </Field>
                    <Field id="plan-budget" label="Approximate Budget">
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-earth-500">₹</span>
                        <input
                          id="plan-budget"
                          name="budget"
                          type="text"
                          inputMode="numeric"
                          placeholder="e.g. 50,000"
                          value={form.budget}
                          onChange={(e) => update("budget")(e.target.value)}
                          className="field-input pl-8"
                        />
                      </div>
                    </Field>
                  </div>

                  <Field id="plan-message" label="Message / Special Requirements">
                    <textarea
                      id="plan-message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your ideal trip — travel style, must-see places, celebrations, anything that helps us plan better."
                      value={form.message}
                      onChange={(e) => update("message")(e.target.value)}
                      className="field-input resize-y"
                    />
                  </Field>

                  <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="submit" variant="gold" size="lg" icon={<Send />} className="w-full sm:w-auto">
                      Plan My Trip
                    </Button>
                    <p className="text-sm text-earth-500">
                      Your details open in WhatsApp so you can send them to us in one tap.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="ml-1 text-gold-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-[#c0553a]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
