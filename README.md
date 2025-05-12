# Prosper Health Take Home - Rajiv Ramaiah

## Overview

The `src/solution` folder contains my solution to tasks 1, 2, and 3.

- `task1.ts` is the simple solution to task 1, and doesn't use any code from task 2 or 3.
- `task2.ts` is the solution to task 2.
- `task3.ts` is the solution to task 3.
  - Multiple helper functions are defined in this file, and then used in the `findValidAvailableAssessmentSlotPairsForPatient` function, which can be thought of as my "final solution" that bundles task 1, 2, and 3 together.
- `mock-data.ts` contains an array of clinician objects, `MOCK_CLINICIANS_DATA` as mock data that I assumed was available to use to run my code on.
- `index.ts` is the "entrypoint."
  - This is a script that you can run to test each of the main functions from task 1, 2, and 3. It uses the mock patient data from the starter code, and the MOCK_CLINICIANS_DATA from `mock-data.ts` to run the functions.
  - Run this using `npx ts-node src/solution/index.ts`

---

The `src/tests` folder contains two tests I wrote for the functions I created for Task 1 and Task 2.

- `task1.test.ts` tests the `findAvailableAssessmentSlots_SlidingWindow` function from `task1.ts`.
- `task2.test.ts` tests the `maximizeAvailableAppointmentSlotsForDuration` function from `task2.ts`.

---

The `solution/task1-alternate` folder contains two alternate algorithms that work for Task 1 with comments on why I didn't use them for the final solution.

---

I outline my approach and logic using thorough comments in each file. I used the provided starter code folder.

## Data Schema Changes

I used the provided starter code schemas for Patient and Clinician. <br>

I made the following changes and additions to the schemas in `appointment.ts`:
<br>

- I simplified the `Appointment` interface and the `AvailableAppointmentSlot` interface to simplify creating the mock data that you see in `MOCK_CLINICIANS_DATA` of `mock-data.ts`.

        export interface Appointment {
            scheduledFor: string;
            status: AppointmentStatus;
        }


        export interface AvailableAppointmentSlot {
            date: string;
            length: number;
        }

- I created an `AvailableAssessmentSlotPair` interface to represent
  the pairs of assessment slots that are available for a patient to book.

         export interface AvailableAssessmentSlotPair {
             firstAssessmentSlot: Date;
             secondAssessmentSlot: Date;
         }

## Mock Data

In `mock-data.ts`, `MOCK_CLINCIANS_DATA` is an array of Clincian objects that I used to test task 1 and task 3.

> Note that the clinician objects in `MOCK_CLINCIANS_DATA` use the simplified Appointment and AvailableAppointmentSlot interfaces.

## Task 1: Calculating Valid Assessment Slot Pairs

`task1.ts` contains my answer to Task 1.

The main function is `findAvailableAssessmentSlotPairsForPatient`. This function takes a patient and returns a Map of `Clinician` -> `AvailableAssessmentSlotPair[]`. The function looks at each clinician in the `MOCK_CLINICIANS_DATA` json, and creates an array of valid assessment slot pairs for that clinician.

> Note: I do not use my code from task 2 to maximizeAvailableAppointmentSlotsForDuration before creating the AvailableAssessmentSlotPairs. I do this in `task3.ts`

My Approach:

- `findAvailableAssessmentSlotPairsForPatient` goes through each clinician in the `MOCK_CLINICIANS_DATA` array and checks if that clinician is a psychologist, takes the patient's insurance, and serves the patient's state.
  Then, the `findAvailableAssessmentSlots_SlidingWindow` function is called to find the available assessment slots for that clinician using a sliding window algorithm.

Assumptions:

- I assumed that I could use data similar to MOCK_CLINCIANS_DATA as a source of clinician data.
- I assumed that I could use the Clinician.availableSlots property to get the latest AvailableAppointmentSlot data for a clinician.

## Task 2: Maximizing Available Appointment Slots

`task2.ts` contains my answer to Task 2.

The function `maximizeAvailableAppointmentSlotsForDuration` is the main and only function. It takes in an array of dates and a duration, and returns the maximum number of possible appointment slots that can be booked for the provided dates as an array of Date objects.

For example, if the duration is 90 minutes and the passed in Dates array is:

    [
    "2024-08-19T12:00:00.000Z",
    "2024-08-19T12:15:00.000Z",
    "2024-08-19T12:30:00.000Z",
    "2024-08-19T12:45:00.000Z",
    "2024-08-19T13:00:00.000Z",
    "2024-08-19T13:15:00.000Z",
    "2024-08-19T13:30:00.000Z",
    ]

The returned output is

    [
    "2024-08-19T12:00:00.000Z",
    "2024-08-19T13:30:00.000Z",
    ]

My Approach:

- I used a greedy algorithm to maximize the available slots that could be booked.

Assumptions:

- I assume that we wanted to maximize clinician availability instead of optimize for patient optionality/booking success. Taking the example above, this would mean that even if a patient could only make the 12:15 on 08/19, that option wouldn't be shown to the patient because it would mean the clinician would only be able to offer one appointment on 08/19. This could be improved in production, so to speak.

## Task 3: Accounting for Max Daily and Weekly Appointments

`task3.ts` contains my solution to Task 3, bundling my work from each task together.

My Approach:

- `findValidAvailableAssessmentSlotPairsForPatient` is the main function that ties all the helper functions described below together to output an array of AvailableAssessmentSlotPair objects that maximizes the number of appointments that a clinician can be booked for and accounts for the clinicians max daily and weekly appointment thresholds.

- `countUpcomingAppointmentsForClinician` finds the number of valid upcoming appointments the clinician has for each day and week they have appointments scheduled for. The function takes a clinician and returns a tuple of two Maps.

  - The first Map contains a count of the number of appointments a clinician has for a day, where the day ("YYYY-MM-DD") is the key.
  - The second Map contains a count of the number of appointments a clinician has for a week, where a week starts on Sunday and the Sunday ("YYYY-MM-DD") is the key.

- `applyDayAndWeekMaximumsToClinicianAvailableAppointments` takes a clinician and the dayMap and weekMap from the function above, and it returns an array of dates that represents the available appointments that can be booked that honor the clinicians max daily and max weekly appointment thresholds.

  - This function goes through each available appointment slot and checks if booking the slot would exceed the max daily appointment count for the day, or the max weekly appointment count for the week.
  - Note: This function also uses the function from Task 2 to maximize the available appointment slots before checking the capacity constraints for day and week.

- `ensureAssessmentSlotPairsDontExceedWeekCapacity` takes a clinician, their weekMap of appointment counts by week, and an array of AvvailableAssessmentSlots. This function ensures that if an AvailableAssessmentSlotPair has a firstAssessmentSlot and secondAssessmentSlot on the same week, that booking those two appointments would still honor the weekly max appointment threshold for the clinician.

Assumptions:

- I assume psychologists never offer therapy and only offer 90 minute psychological assessment apointments. Therefore, we can call `maximizeAvailableAppointmentSlotsForDuration` with a 90 minute duration for psychologists.

<br>

# Thanks! I enjoyed this assignment.
