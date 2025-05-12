import { Clinician } from "../starter-code/clinician";

// For testing the solutions for task1 and task3
export const MOCK_CLINICIANS_DATA: Clinician[] = [
  {
    id: "9c516382-c5b2-4677-a7ac-4e100fa35bdd",
    firstName: "Jane",
    lastName: "Doe",
    states: ["NY", "CA"],
    insurances: ["AETNA", "CIGNA"],
    clinicianType: "PSYCHOLOGIST",
    appointments: [
      {
        scheduledFor: "2024-08-20T12:00:00.000Z",
        status: "UPCOMING",
      },
      {
        scheduledFor: "2024-08-21T16:00:00.000Z",
        status: "UPCOMING",
      },
      {
        scheduledFor: "2024-08-15T15:00:00.000Z",
        status: "OCCURRED",
      },
    ],
    availableSlots: [
      {
        length: 90,
        date: "2024-08-19T12:00:00.000Z",
      },
      {
        length: 90,
        date: "2024-08-19T12:15:00.000Z",
      },
      {
        length: 90,
        date: "2024-08-21T12:00:00.000Z",
      },
      {
        length: 90,
        date: "2024-08-22T15:00:00.000Z",
      },
      {
        length: 90,
        date: "2024-08-28T12:15:00.000Z",
      },
      {
        length: 90,
        date: "2024-09-01T12:15:00.000Z",
      },    
      {
        length: 90,
        date: "2024-09-04T12:15:00.000Z",
      },
    ],
    maxDailyAppointments: 5,
    maxWeeklyAppointments: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "1c516382-c5b2-4677-a7ac-4e100fa35bdd",
    firstName: "Rajiv",
    lastName: "Ramaiah",
    states: ["CA"],
    insurances: ["BCBS", "CIGNA"],
    clinicianType: "PSYCHOLOGIST",
    appointments: [
      {
        scheduledFor: "2024-08-20T12:00:00.000Z",
        status: "UPCOMING",
      },
      {
        scheduledFor: "2024-08-15T15:00:00.000Z",
        status: "OCCURRED",
      },
    ],
    availableSlots: [
      {
        length: 90,
        date: "2024-08-19T12:00:00.000Z",
      },
      {
        length: 90,
        date: "2024-08-19T12:15:00.000Z",
      },
      {
        length: 90,
        date: "2024-08-19T12:30:00.000Z",
      },
      {
        length: 90,
        date: "2024-08-19T12:45:00.000Z",
      },
      {
        length: 90,
        date: "2024-08-19T13:00:00.000Z",
      },
      {
        length: 90,
        date: "2024-08-19T13:15:00.000Z",
      },
      {
        length: 90,
        date: "2024-08-19T13:30:00.000Z",
      },
      {
        length: 90,
        date: "2024-08-21T13:30:00.000Z",
      },
    ],
    maxDailyAppointments: 1,
    maxWeeklyAppointments: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
