import { AvailableAppointmentSlot } from "../starter-code/appointment";
import { Clinician } from "../starter-code/clinician";
import { Patient } from "../starter-code/patient";
import { MOCK_CLINICIANS_DATA } from "./mock-data";
import { maximizeAppointmentSlotsForDuration } from "./task2";
import { AvailableAssessmentSlotPair } from "../starter-code/appointment";

/**
 * Finds all available assessment slot pairs that a patient can book with a psychologist.
 *
 * @param patient
 * @returns A map of clinicianID -> an array of AvailableAssessmentSlotPairs which represents
 * all pairs of assessment slot times that this patient can schedule with the clinician
 *
 * This function looks at each clinician in MOCK_CLINICIANS_DATA,
 * checks that they are a psychologist and support the patients insurance/state,
 * and returns all possible assessment slot pairs that the patient can book with the clincian
 */
export function findAvailableAssessmentSlotsForPatient(
  patient: Patient
): Map<string, AvailableAssessmentSlotPair[]> {
  const availableSlotsByClinician = new Map<
    string,
    AvailableAssessmentSlotPair[]
  >();

  // Look at each Clinician.
  MOCK_CLINICIANS_DATA.forEach((clinician: Clinician) => {
    // If clinician isn't a psychologist or doesn't support the patient's insurance/state, don't consider them.
    if (
      !clinician.insurances.includes(patient.insurance) ||
      !clinician.states.includes(patient.state) ||
      clinician.clinicianType !== "PSYCHOLOGIST"
    ) {
      return;
    }

    // Get available dates from the clinician's available appointment slots
    const availableClinicianAppointmentDates: Date[] =
      clinician.availableSlots.map(
        (slot: AvailableAppointmentSlot) => new Date(slot.date)
      );

    // Find AvailableAssessmentSlotPairs for this patient and the clinician
    const availableAssessmentSlots = findAvailableAssessmentSlots_SlidingWindow(
      availableClinicianAppointmentDates
    );

    // Only add this clinician to the map if they have validAssessmentSlots that this patient can book
    if (availableAssessmentSlots.length !== 0) {
      availableSlotsByClinician.set(clinician.id, availableAssessmentSlots);
    }
  });

  // return map of clincian -> valid AssessmentSlotPairs for this patient
  return availableSlotsByClinician;
}

/**
 * @param dates An array of dates representing availalble appointment slots for a clinician (psychologist)
 * @returns An array of possible AvailableAssessmentSlotPairs that can be booked for the clinician, sorted by AvailableAssessmentSlotPair's firstAssessmentSlot time.
 * This code builds valid 7 day windows and then adds all pairs (from start, start+1, ..., to end-1, end)
 * within that window if they aren't on the same day.
 */
export function findAvailableAssessmentSlots_SlidingWindow(
  dates: Date[]
): AvailableAssessmentSlotPair[] {
  // First, sort the dates array.
  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
  const pairs: AvailableAssessmentSlotPair[] = [];

  //Define start and end pointer for sliding window approach
  let start = 0;
  let end = 1;

  // Loop through sorted dates while end isn't out of range.
  while (end < sortedDates.length) {
    // Get the date at the current end index because we will create pairs with this date later on if possible
    const secondAssessmentSlot = sortedDates[end];

    // If start and end times are within 7 calendar days of eachother, we have a valid 7 day window.
    if (calendarDaysApart(sortedDates[start], secondAssessmentSlot) <= 7) {
      // pair all dates from [start, end - 1] with end as long as they aren't on the same day .
      let s = start;
      while (s < end) {
        const firstAssessmentSlot = sortedDates[s];
        if (calendarDaysApart(firstAssessmentSlot, secondAssessmentSlot) > 0) {
          pairs.push({ firstAssessmentSlot, secondAssessmentSlot });
        }
        s++;
      }
      // increment end to see if we can make the window larger
      end++;
    } else {
      // start and end times are more than 7 days apart and the window is too large, so increment start to see if we can get back within range
      start++;

      // make sure we don't set start beyond end and break the window!
      if (start === end) {
        end++;
      }
    }
  }

  // sort by each AssessmentSlotPair's startTime before returning
  pairs.sort(
    (a, b) => a.firstAssessmentSlot.getTime() - b.firstAssessmentSlot.getTime()
  );

  return pairs;
}

/**
 * @param day1 first date
 * @param day2 second date
 * @returns The number of calendar days apart the two dates are
 */
export function calendarDaysApart(day1: Date, day2: Date): number {
  // Create new dates from day1 and day2 without hours, minutes, seconds, or milliseconds
  const d1 = new Date(day1.getFullYear(), day1.getMonth(), day1.getDate());
  const d2 = new Date(day2.getFullYear(), day2.getMonth(), day2.getDate());

  // Calculate time difference in ms, then convert to days
  const msDiff = Math.abs(d1.getTime() - d2.getTime());
  const dayDiff = msDiff / (24 * 60 * 60 * 1000);

  return dayDiff;
}
