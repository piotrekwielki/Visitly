type PolicyInput = {
  appointmentStart: Date;
  now: Date;
  cancellationWindowHours: number;
};

export function canClientCancelBooking({
  appointmentStart,
  now,
  cancellationWindowHours
}: PolicyInput) {
  const hoursUntilAppointment =
    (appointmentStart.getTime() - now.getTime()) / (1000 * 60 * 60);

  return hoursUntilAppointment >= cancellationWindowHours;
}

export function canClientRescheduleBooking(input: PolicyInput) {
  return canClientCancelBooking(input);
}
