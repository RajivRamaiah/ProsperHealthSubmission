import { findAvailableAssessmentSlotsForPatient } from "./task1";
import { maximizeAppointmentSlotsForDuration } from "./task2";
import { getValidAvailableAssessmentSlots } from "./task3";
import { patient } from "../starter-code/mock-patient";

// NOTE: Task 1 and Task 3 solutions assume that something like MOCK_CLINICIANS_DATA is available, which is an array of Clinician objects.

// TEST TASK 1 SOLUTION!

// Call findAvailableAssessmentSlotsForPatient from task1.ts on the mock patient. Log the result.
// Note that this function uses the "MOCK_CLINICIANS_DATA" from mock-data.ts.
console.log(
  "Task 1 Example: \n",
  findAvailableAssessmentSlotsForPatient(patient)
);

/*
    There are two clincians in the MOCK_CLINICIANS_DATA array, but only Jane Doe takes the patient's insurance. 

    This should log all valid AvailableAssessmentSlot pairs for that Jane Doe can offer this patient. 

    Task 1 Example: 
    Map(1) {
    '9c516382-c5b2-4677-a7ac-4e100fa35bdd' => [
        {
        firstAssessmentSlot: 2024-08-19T12:00:00.000Z,
        secondAssessmentSlot: 2024-08-21T12:00:00.000Z
        },
        {
        firstAssessmentSlot: 2024-08-19T12:00:00.000Z,
        secondAssessmentSlot: 2024-08-22T15:00:00.000Z
        },
        {
        firstAssessmentSlot: 2024-08-19T12:15:00.000Z,
        secondAssessmentSlot: 2024-08-21T12:00:00.000Z
        },
        {
        firstAssessmentSlot: 2024-08-19T12:15:00.000Z,
        secondAssessmentSlot: 2024-08-22T15:00:00.000Z
        },
        {
        firstAssessmentSlot: 2024-08-21T12:00:00.000Z,
        secondAssessmentSlot: 2024-08-22T15:00:00.000Z
        },
        {
        firstAssessmentSlot: 2024-08-21T12:00:00.000Z,
        secondAssessmentSlot: 2024-08-28T12:15:00.000Z
        },
        {
        firstAssessmentSlot: 2024-08-22T15:00:00.000Z,
        secondAssessmentSlot: 2024-08-28T12:15:00.000Z
        },
        {
        firstAssessmentSlot: 2024-08-28T12:15:00.000Z,
        secondAssessmentSlot: 2024-09-01T12:15:00.000Z
        },
        {
        firstAssessmentSlot: 2024-08-28T12:15:00.000Z,
        secondAssessmentSlot: 2024-09-04T12:15:00.000Z
        },
        {
        firstAssessmentSlot: 2024-09-01T12:15:00.000Z,
        secondAssessmentSlot: 2024-09-04T12:15:00.000Z
        }
    ]
    }
*/

// TEST TASK 2 SOLUTION

// These are the same available appointment slots that Jane Doe, the clinician, has in MOCK_CLINICIANS_DATA
export const MOCK_SIMPLE_SLOT_DATES = [
  "2024-08-19T12:00:00.000Z",
  "2024-08-19T12:15:00.000Z",
  "2024-08-19T12:30:00.000Z",
  "2024-08-19T12:45:00.000Z",
  "2024-08-19T13:00:00.000Z",
  "2024-08-19T13:15:00.000Z",
  "2024-08-19T13:30:00.000Z",
];

// Turn strings into dates.
const testDates = MOCK_SIMPLE_SLOT_DATES.map((slot) => new Date(slot));

// Call maximizeAppointmentSlotsForDuration on the testDates array with a duration of 90 minutes!
console.log(
  "\nTask 2 Example: \n",
  maximizeAppointmentSlotsForDuration(testDates, 90)
);

/*  
    ^ This should log:

    Task 2 Example: 
    [ 2024-08-19T12:00:00.000Z, 2024-08-19T13:30:00.000Z ]
    just like the Task 2 example in the Notion docutment.
*/

// TEST TASK 3 SOLUTION
console.log("\nTask 3 Example: \n", getValidAvailableAssessmentSlots(patient));

/*
^   This should log only two valid assessment slot pairs for Jane Doe where the 
    first and second slots are on different weeks because Jane Doe can only have 1 appointment per week, 

    Task 3 Example: 
    Map(1) {
    '9c516382-c5b2-4677-a7ac-4e100fa35bdd' => [
        {
        firstAssessmentSlot: 2024-08-28T12:15:00.000Z,
        secondAssessmentSlot: 2024-09-01T12:15:00.000Z
        },
        {
        firstAssessmentSlot: 2024-08-28T12:15:00.000Z,
        secondAssessmentSlot: 2024-09-04T12:15:00.000Z
        }
    ]
    }

*/
