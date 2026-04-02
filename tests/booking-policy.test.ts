import { describe, expect, it } from "vitest";

import {
  canClientCancelBooking,
  canClientRescheduleBooking
} from "@/lib/domain/booking-policy";

describe("booking policy", () => {
  it("allows cancellation outside the policy window", () => {
    expect(
      canClientCancelBooking({
        appointmentStart: new Date("2026-05-10T10:00:00.000Z"),
        now: new Date("2026-05-09T08:00:00.000Z"),
        cancellationWindowHours: 24
      })
    ).toBe(true);
  });

  it("blocks cancellation inside the policy window", () => {
    expect(
      canClientCancelBooking({
        appointmentStart: new Date("2026-05-10T10:00:00.000Z"),
        now: new Date("2026-05-10T03:00:00.000Z"),
        cancellationWindowHours: 12
      })
    ).toBe(false);
  });

  it("keeps reschedule rules aligned with cancellation window", () => {
    expect(
      canClientRescheduleBooking({
        appointmentStart: new Date("2026-05-10T18:00:00.000Z"),
        now: new Date("2026-05-09T12:00:00.000Z"),
        cancellationWindowHours: 24
      })
    ).toBe(true);
  });
});
