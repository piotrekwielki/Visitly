"use client";

import { startTransition, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { BusinessProfile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const bookingSchema = z.object({
  clientName: z.string().min(2, "Enter your name"),
  clientEmail: z.string().email("Enter a valid email"),
  serviceId: z.string().min(1, "Select a service"),
  notes: z.string().max(500).optional()
});

type BookingValues = z.infer<typeof bookingSchema>;

export function BookingForm({ business }: { business: BusinessProfile }) {
  const [submissionState, setSubmissionState] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: business.services[0]?.id ?? ""
    }
  });

  const onSubmit = async (values: BookingValues) => {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...values,
        businessId: business.id
      })
    });

    const payload = (await response.json()) as { booking?: { id: string } };

    startTransition(() => {
      setSubmissionState(
        response.ok
          ? `Reservation placeholder created: ${payload.booking?.id ?? "unknown"}`
          : "Could not create booking placeholder"
      );
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="clientName">
            Full name
          </label>
          <Input id="clientName" {...register("clientName")} />
          {errors.clientName ? (
            <p className="text-sm text-destructive">{errors.clientName.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="clientEmail">
            Email
          </label>
          <Input id="clientEmail" type="email" {...register("clientEmail")} />
          {errors.clientEmail ? (
            <p className="text-sm text-destructive">{errors.clientEmail.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="serviceId">
          Service
        </label>
        <select
          className="flex h-11 w-full rounded-2xl border border-input bg-background px-4 text-sm"
          id="serviceId"
          {...register("serviceId")}
        >
          {business.services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - {service.priceLabel}
            </option>
          ))}
        </select>
        {errors.serviceId ? (
          <p className="text-sm text-destructive">{errors.serviceId.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="notes">
          Notes
        </label>
        <Textarea
          id="notes"
          placeholder="Any preferences, allergies, or extra details"
          {...register("notes")}
        />
      </div>

      <div className="rounded-3xl bg-secondary p-4 text-sm text-secondary-foreground">
        Payment integration is intentionally deferred for MVP, but the flow is
        designed to support deposits and cancellation fees later.
      </div>

      <Button disabled={isSubmitting} type="submit">
        Reserve appointment
      </Button>
      {submissionState ? (
        <p className="text-sm text-muted-foreground">{submissionState}</p>
      ) : null}
    </form>
  );
}
