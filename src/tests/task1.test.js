// task1.test.js

// Testing the findAvailableAssessmentSlots_SlidingWindow function of task1.ts. 
const { findAvailableAssessmentSlots_SlidingWindow } = require("../solution/task1");

// Test that the function works for the example given in the notion document. 
const INPUT = [
  {
    "length": 90,
    "date": "2024-08-19T12:00:00.000Z"
  },
  {
    "length": 90,
    "date": "2024-08-19T12:15:00.000Z"
  },
  {
    "length": 90,
    "date": "2024-08-21T12:00:00.000Z"
  },
  {
    "length": 90,
    "date": "2024-08-21T15:00:00.000Z"
  },
  {
    "length": 90,
    "date": "2024-08-22T15:00:00.000Z"
  },
  {
    "length": 90,
    "date": "2024-08-28T12:15:00.000Z"
  }
];

// Turn strings into dates. 
const INPUT_DATES = INPUT.map((slot) => new Date(slot.date));

const EXPECTED_OUTPUT = [
  {
    firstAssessmentSlot: "2024-08-19T12:00:00.000Z",
    secondAssessmentSlot: "2024-08-21T12:00:00.000Z",
  },
  {
    firstAssessmentSlot: "2024-08-19T12:00:00.000Z",
    secondAssessmentSlot: "2024-08-21T15:00:00.000Z",
  },
  {
    firstAssessmentSlot: "2024-08-19T12:00:00.000Z",
    secondAssessmentSlot: "2024-08-22T15:00:00.000Z",
  },
  {
    firstAssessmentSlot: "2024-08-19T12:15:00.000Z",
    secondAssessmentSlot: "2024-08-21T12:00:00.000Z",
  },
  {
    firstAssessmentSlot: "2024-08-19T12:15:00.000Z",
    secondAssessmentSlot: "2024-08-21T15:00:00.000Z",
  },
  {
    firstAssessmentSlot: "2024-08-19T12:15:00.000Z",
    secondAssessmentSlot: "2024-08-22T15:00:00.000Z",
  },
  {
    firstAssessmentSlot: "2024-08-21T12:00:00.000Z",
    secondAssessmentSlot: "2024-08-22T15:00:00.000Z",
  },
  {
    firstAssessmentSlot: "2024-08-21T12:00:00.000Z",
    secondAssessmentSlot: "2024-08-28T12:15:00.000Z",
  },
  {
    firstAssessmentSlot: "2024-08-21T15:00:00.000Z",
    secondAssessmentSlot: "2024-08-22T15:00:00.000Z",
  },
  {
    firstAssessmentSlot: "2024-08-21T15:00:00.000Z",
    secondAssessmentSlot: "2024-08-28T12:15:00.000Z",
  },
  {
    firstAssessmentSlot: "2024-08-22T15:00:00.000Z",
    secondAssessmentSlot: "2024-08-28T12:15:00.000Z",
  },
];

// Turn strings into dates. 
const EXPECTED_OUTPUT_DATES = EXPECTED_OUTPUT.map((pair) => ({
  firstAssessmentSlot: new Date(pair.firstAssessmentSlot),
  secondAssessmentSlot: new Date(pair.secondAssessmentSlot)
}));

test("Task 1 - Test on Example Input", () => {
  const OUTPUT = findAvailableAssessmentSlots_SlidingWindow(INPUT_DATES);
  expect(OUTPUT).toEqual(EXPECTED_OUTPUT_DATES);
});


// Test that the function works when there are no possible AvailableAssessmentSlotPairs 
const INPUT_TWO = [
  {
    "length": 90,
    "date": "2024-08-19T12:00:00.000Z"
  },
  {
    "length": 90,
    "date": "2024-08-19T12:15:00.000Z"
  },
  {
    "length": 90,
    "date": "2024-08-28T12:15:00.000Z"
  }
];

// Turn strings into dates. 
const INPUT_DATES_TWO = INPUT_TWO.map((slot) => new Date(slot.date));

const EXPECTED_OUTPUT_TWO = [];

test("Task 1 - No Available Slots ", () => {
  const OUTPUT = findAvailableAssessmentSlots_SlidingWindow(INPUT_DATES_TWO);
  expect(OUTPUT).toEqual(EXPECTED_OUTPUT_TWO);
});