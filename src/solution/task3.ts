import { Clinician } from "../starter-code/clinician";
import { Patient } from "../starter-code/patient";
import { AvailableAssessmentSlotPair } from "../starter-code/appointment";
import { maximizeAppointmentSlotsForDuration } from "./task2";
import { MOCK_CLINICIANS_DATA } from "./mock-data";
import { findAvailableAssessmentSlots_SlidingWindow } from "./task1";
import {
  PSYCHOLOGIST_APPOINTMENT_LENGTH,
  THERAPIST_APPOINTMENT_LENGTH,
} from "../starter-code/appointment";
import { ClinicianTypeEnum } from "../starter-code/clinician";

/**
 * This is the "final solution." It combines my work from task1, 2, and 3 together.
 *
 * @param patient to find AvailableAssessmentSlots for
 * @returns all possible AvailableAssessmentSlots that the patient can book with each clinician psychologist.
 */
export function getValidAvailableAssessmentSlots(
  patient: Patient
): Map<string, AvailableAssessmentSlotPair[]> {
  // Initialize Map of clinician ID -> availalble assessment time pairs that will be returned as the final output.
  const availableSlotsByClinician = new Map<
    string,
    AvailableAssessmentSlotPair[]
  >();

  // Look at each Clinician. If they don't meet the patient's criteria, don't consider them.
  MOCK_CLINICIANS_DATA.forEach((clinician) => {
    if (
      !clinician.insurances.includes(patient.insurance) ||
      !clinician.states.includes(patient.state) ||
      clinician.clinicianType !== ClinicianTypeEnum.PSYCHOLOGIST
    ) {
      return;
    }
    // Get the count of appointments for this clinician by day and week, held in a map.
    const [dayMap, weekMap] = countUpcomingAppointmentsForClinician(clinician);

    // Calculate the actual appointment dates that work for this clinician based on their capacities, maximized using Task 2 solution.
    const validAvailableAppointments: Date[] =
      applyDayAndWeekMaximumsToClinicianAvailableAppointments(
        clinician,
        dayMap,
        weekMap
      );

    // get the possible assessment slots that this patient could schedule for this clinician.
    const availableAssessmentSlots: AvailableAssessmentSlotPair[] =
      findAvailableAssessmentSlots_SlidingWindow(validAvailableAppointments);

    // Ensure any assessment slot pairs fon't exceed the clinician's weekly capacity if the pair times fall on the same week!
    const validAssessmentSlots: AvailableAssessmentSlotPair[] =
      ensureAssessmentSlotPairsDontExceedWeekCapacity(
        clinician,
        weekMap,
        availableAssessmentSlots
      );

    // Only add this clinician to the map if they have validAssessmentSlots that this patient can book
    if (validAssessmentSlots.length !== 0) {
      availableSlotsByClinician.set(clinician.id, validAssessmentSlots);
    }
  });

  return availableSlotsByClinician;
}

// HELPER FUNCTIONS BELOW //

/**
 * This function works for a clinician of any type, therapist or psychologist.
 *
 * @param clinician that we want to count upcoming appointments for
 * @returns An array of two maps. The first map contains day -> # of appointments booked. The second contains week -> # of appointments booked.
 */
export function countUpcomingAppointmentsForClinician(
  clinician: Clinician
): [Map<string, number>, Map<string, number>] {
  const dayMap = new Map<string, number>();
  const weekMap = new Map<string, number>();
  const appointments = clinician.appointments;

  // Builds a map of day -> # appointments
  // Builds a map of week -> # appointments
  appointments.forEach((appointment) => {
    // Only look at upcoming appointments
    if (appointment.status === "UPCOMING") {
      //gets the YYYY-MM-DD string for the apointment to use as the key for the day map. Updats count.
      const apptDate = new Date(appointment.scheduledFor);
      const day = getDayString(apptDate);
      if (!dayMap.has(day)) {
        dayMap.set(day, 0);
      }
      const dayCount = dayMap.get(day);
      dayMap.set(day, dayCount! + 1);

      //gets the YYYY-MM-DD string for the start of the week for the appointment to use as the key for the week map. Updates count.
      const weekStarDate = getStartOfWeekDate(apptDate);
      const weekStartString = getDayString(weekStarDate);
      if (!weekMap.has(weekStartString)) {
        weekMap.set(weekStartString, 0);
      }
      const weekCount = weekMap.get(weekStartString);
      weekMap.set(weekStartString, weekCount! + 1);
    }
  });
  return [dayMap, weekMap];
}

/**
 * This function works for a clinician of any type, therapist or psychologist.
 *
 * @param clinician
 * @param dayMap A map representing the day -> number of appointments on that day for this clinician
 * @param weekMap A map representing the week -> number of appointments on that week for this clinician.
 * @returns An array of AvailableAppointmentSlots respecting the clinicians max daily and max weekly appointment thresholds.
 *
 */

export function applyDayAndWeekMaximumsToClinicianAvailableAppointments(
  clinician: Clinician,
  dayMap: Map<string, number>,
  weekMap: Map<string, number>
): Date[] {
  // Get the available appointment slots for the clinician
  const availableSlots = clinician.availableSlots;

  // Turn the availableSots into an array of dates sorted increasingly by time.
  let dates: Date[] = availableSlots
    .map((slot) => new Date(slot.date))
    .sort((a, b) => a.getTime() - b.getTime());

  // Maximize the # of available appointment slots this clinician can offer using our work from Task 2.
  if (clinician.clinicianType === ClinicianTypeEnum.PSYCHOLOGIST) {
    dates = maximizeAppointmentSlotsForDuration(
      dates,
      PSYCHOLOGIST_APPOINTMENT_LENGTH
    );
  } else {
    dates = maximizeAppointmentSlotsForDuration(
      dates,
      THERAPIST_APPOINTMENT_LENGTH
    );
  }

  // Create a new array to hold the optimized slots, which represent the dates the clinician can offer for booking that won't exceed their day and week capacity constraints.
  let optimizedSlots: Date[] = [];

  // Look at each available appointment date and don't include appts for any day or week that has reached it's max.
  dates.forEach((date) => {
    // Create the day and week key to look up in the day and week appointment maps.
    const dayString = getDayString(date);

    const weekStartDate = getStartOfWeekDate(date);
    const weekString = getDayString(weekStartDate);

    // Get current day and week counts for this clinician.
    // Set them to 0 if they don't exist since that means the clinician has no appointments for that day or week
    const dayCount = dayMap.get(dayString) ?? 0;
    const weekCount = weekMap.get(weekString) ?? 0;

    // If there is room in this day and week, we can keep the slot!
    if (
      dayCount < clinician.maxDailyAppointments &&
      weekCount < clinician.maxWeeklyAppointments
    ) {
      optimizedSlots.push(date);
    }
  });

  return optimizedSlots;
}

/**
 *
 * This function ensures that booking an assessment slot pair where the first and second assessment
 *    slot fall on the same week does not exceed the clinicians weekly max appointment threshold.
 *
 * @param clinician The clinician we are optimizing for
 * @param weekMap The week map representing the week -> number of appointments in that week for the clinician
 * @param slots An array of AvailableAssessmentSlotPairs.
 * @returns An array of AvailableAssessmentSlotPairs where any pair will not exceed the clinician's weekly appointment maximum.
 *
 * This function assumes that the slots array was built using a clinicians available appointments slots
 *    that were optimized for day and week appointment maximums.
 */
export function ensureAssessmentSlotPairsDontExceedWeekCapacity(
  clinician: Clinician,
  weekMap: Map<string, number>,
  assessmentSlotPairs: AvailableAssessmentSlotPair[]
): AvailableAssessmentSlotPair[] {
  const validAssessmentSlots: AvailableAssessmentSlotPair[] = [];

  // Look at the firstAppointmentSlot and secondAssessmentSlot time for each pair and ensure that booking the two slots don't exceed weekly appointment limits.
  assessmentSlotPairs.forEach((pair) => {
    // We need to look up the number of appointments for the week for each assessment slot.
    //    Get the key for the start of the week for each assessment slot for this pair.
    const startTimeWeekKey = getDayString(
      getStartOfWeekDate(pair.firstAssessmentSlot)
    );
    const endTimeWeekKey = getDayString(
      getStartOfWeekDate(pair.secondAssessmentSlot)
    );

    // get the current count of appts the clinician has for the week first Assessment Slot
    const weekCount = weekMap.get(startTimeWeekKey) || 0;

    // If the slots are on the same week, we need to check that the week has capacity for 2 appointments!
    // If the sots are on different weeks, scheduling each slot is OKAY because we already checked for day and week capacity. See assumption.
    if (
      startTimeWeekKey === endTimeWeekKey &&
      weekCount <= clinician.maxWeeklyAppointments - 2
    ) {
      validAssessmentSlots.push(pair);
    } else if (startTimeWeekKey !== endTimeWeekKey) {
      validAssessmentSlots.push(pair);
    }
  });
  return validAssessmentSlots;
}

/**
 * Returns the date of the start of the week for a given date
 *
 * @param date
 * @returns A date representing the start of the week for the given date. Weeks start on Sunday!
 */
function getStartOfWeekDate(date: Date): Date {
  let numDaysFromSunday = date.getUTCDay(); // Weeks start on sunday
  let sunday = new Date(
    date.getTime() - numDaysFromSunday * 24 * 60 * 60 * 1000
  );
  sunday.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, ms to start of the day
  return sunday;
}

/**
 * @param date
 * @returns a string representing the day for the day in "YYYY-MM-DD" format.
 */
function getDayString(date: Date): string {
  return date.toISOString().split("T")[0];
}
