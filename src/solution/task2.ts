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
export function maximizeAvailableAppointmentSlotsForDuration(
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