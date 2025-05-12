import { AvailableAssessmentSlotPair, PSYCHOLOGIST_APPOINTMENT_LENGTH } from "../starter-code/appointment";
import { Patient } from "../starter-code/patient";
import { Clinician } from "../starter-code/clinician";
import { AvailableAppointmentSlot } from "../starter-code/appointment";
import { MOCK_CLINICIANS_DATA } from "./mock-data";
import { findAvailableAssessmentSlots_SlidingWindow } from "./task1";

/**
 * Maximizes the number of appointments that can be scheduled for a given duration.
 *
 * @param dates An array of Dates representing available appointment slots
 * @param duration The duration for the appointment, and therfore the duration to maximize the number of available apointment slots for
 * @returns An ascendingly ordered array of dates that represents the maximum number of non-overlapping appointments of the specified duration that can be scheduled.
 *
 * This function uses a greedy algorithm to find the maximum number of non-overlapping
 * appointments. It sorts the input dates, selects the earliest available slot, then
 * excludes all slots that would overlap with it based on the specified duration. Then it moves to the next slot and
 * repeats until all slots have been considered.
 */
export function maximizeAppointmentSlotsForDuration(
  dates: Date[],
  duration: number
): Date[] {
  // Sort the slots array ascendingly by time.
  const sortedSlots = dates.sort((a, b) => a.getTime() - b.getTime());
  const optimizedSlots: Date[] = [];

  // set to null to start so that we always include the first slot since it will always works!
  let currentEndTime: Date | null = null;
  for (const slot of sortedSlots) {
    // Calcluate [duration] minutes from current slot time
    const nextEndTime = new Date(slot.getTime() + duration * 60 * 1000);

    // If the current slot is the first one OR it is outside the window (i.e. not within the next end time), it works!
    if (!currentEndTime || slot >= currentEndTime) {
      optimizedSlots.push(slot);
      currentEndTime = nextEndTime;
    }
  }
  return optimizedSlots;
}

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

    // Get available dates from the clinician's available appointment slots and maximize them using Task 2 solution above!
    const availableClinicianAppointmentDates: Date[] = maximizeAppointmentSlotsForDuration(
      clinician.availableSlots.map(
        (slot: AvailableAppointmentSlot) => new Date(slot.date)
      ), PSYCHOLOGIST_APPOINTMENT_LENGTH);

    // set all possible AvailableAssessmentSlot pairs that the patient can book for this clinician
    availableSlotsByClinician.set(
      clinician.id,
      findAvailableAssessmentSlots_SlidingWindow(
        availableClinicianAppointmentDates
      )
    );
  });

  // return map of clincian -> valid AssessmentSlotPairs for this patient
  return availableSlotsByClinician;
}
