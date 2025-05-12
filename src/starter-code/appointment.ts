export const AppointmentStatuses = [
  "UPCOMING",
  "OCCURRED",
  "NO_SHOW",
  "RE_SCHEDULED",
  "CANCELLED",
  "LATE_CANCELLATION",
] as const;
export type AppointmentStatus = (typeof AppointmentStatuses)[number];

export const AppointmentTypes = [
  "ASSESSMENT_SESSION_1",
  "ASSESSMENT_SESSION_2",
  "THERAPY_INTAKE",
  "THERAPY_SIXTY_MINS",
] as const;
export type AppointmentType = (typeof AppointmentTypes)[number];

// Original Appointment interface
// export interface Appointment {
//   id: string;
//   patientId: string;
//   clinicianId: string;
//   scheduledFor: Date;
//   appointmentType: AppointmentType;
//   status: AppointmentStatus;
//   createdAt: Date;
//   updatedAt: Date;
// }

// Simplified Appointment interface for mock data
export interface Appointment {
  scheduledFor: string;
  status: AppointmentStatus;
}

// Original AvailableAppointmentSlot interface
// export interface AvailableAppointmentSlot {
//   id: string;
//   clinicianId: string;
//   date: Date;
//   length: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// Simplified AvailableAppointmentSlot interface for mock data
export interface AvailableAppointmentSlot {
    date: string;
    length: number;
}

// Defines an AvailalbeAssessmentSlotPair as two dates representing
// the first assessment appointment slot and the second assessment appointment slot.
export interface AvailableAssessmentSlotPair {
  firstAssessmentSlot: Date;
  secondAssessmentSlot: Date;
}

// Constants for Psychologist and Therapist Appointment Length
export const PSYCHOLOGIST_APPOINTMENT_LENGTH = 90;
export const THERAPIST_APPOINTMENT_LENGTH = 60;