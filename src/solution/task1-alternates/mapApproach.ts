import { AvailableAssessmentSlotPair } from "../../starter-code/appointment";
import { calendarDaysApart } from "../task1";

/**
 * @param dates An array of dates representing availalble appointment slots for a clinician (psychologist)
 * @returns An array of possible AvailableAssessmentSlotPairs that can be booked for the clinician, sorted by AvailableAssessmentSlotPair's firstAssessmentSlot time.
 * This code builds a map of day -> a list of dates on that day. It then compares the days of the map to check that they are within 7 days and then pairs up all the dates on each day.
 *
 * This function was not as clear to read as the sliding window approach and required additional data structures so I didn't include it.
 * This function does run more efficiently if there are many dates clustered on different days, like Monday, Wednesday, Friday.
 */
export function findAvailableAssessmentSlots_UsingDayMap(
    dates: Date[]
  ): AvailableAssessmentSlotPair[] {
    const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
  
    const pairs: AvailableAssessmentSlotPair[] = [];
    const dayMap = new Map<string, Date[]>();
  
    // Create a map of days -> dates using the day as the key, i.e. "2024-08-21".
    sortedDates.forEach((date) => {
      const dayKey = date.toISOString().split("T")[0];
      if (!dayMap.has(dayKey)) {
        dayMap.set(dayKey, []);
      }
      dayMap.get(dayKey)!.push(date);
    });
  
    //Create an array of the day keys to loop over.
    const dayKeyArray = [...dayMap.keys()];
    dayKeyArray.sort();
  
    for (let i = 0; i < dayKeyArray.length; i++) {
      const day1 = dayKeyArray[i];
      const day1Date = new Date(day1);
  
      for (let j = i + 1; j < dayKeyArray.length; j++) {
        const day2 = dayKeyArray[j];
        const day2Date = new Date(day2);
  
        // If the days are more than seven days apart, break out of the inner loop.
        if (calendarDaysApart(day1Date, day2Date) > 7) {
          break;
        }
        const day1Slots = dayMap.get(day1)!;
        const day2Slots = dayMap.get(day2)!;
  
        // Add all combinations of day1 and day2 slots since they are within 7 days of each other and on different days!
        for (let x = 0; x < day1Slots.length; x++) {
          for (let y = 0; y < day2Slots.length; y++) {
            pairs.push({
              firstAssessmentSlot: day1Slots[x],
              secondAssessmentSlot: day2Slots[y],
            });
          }
        }
      }
    }
    return pairs;
  }