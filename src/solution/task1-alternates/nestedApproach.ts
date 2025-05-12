import { AvailableAssessmentSlotPair } from "../../starter-code/appointment";
import { calendarDaysApart } from "../task1";

/**
 * @param dates An array of dates representing availalble appointment slots for a clinician (psychologist)
 * @returns An array of possible AvailableAssessmentSlotPairs that can be booked for the clinician, sorted by AvailableAssessmentSlotPair's firstAssessmentSlot time.
 * This code uses a nested loop to go through the dates array and pair up dates that are on different days but within 7 days of each other.
 * It early terminates the inner loop if the two compared dates are not in the 7 day window
 *
 * I did not use this function as it is not as efficient as the SlidingWindow approach.
 */
export function findAvailableAssessmentSlots_NestedWithEarlyTermination(
  dates: Date[]
): AvailableAssessmentSlotPair[] {
  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
  const pairs: AvailableAssessmentSlotPair[] = [];

  for (let i = 0; i < sortedDates.length; i++) {
    for (let j = i + 1; j < sortedDates.length; j++) {
      let day1 = sortedDates[i];
      let day2 = sortedDates[j];

      // Early terminate if the days are not within 7 days of each other
      if (calendarDaysApart(day1, day2) > 7) {
        break;
      } else if (day1.toDateString() !== day2.toDateString()) {
        // The two days are on different days and within 7 days of each other. It's a valid pair.
        pairs.push({ firstAssessmentSlot: day1, secondAssessmentSlot: day2 });
      }
    }
  }
  return pairs;
}
