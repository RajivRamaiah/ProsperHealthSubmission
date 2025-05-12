const { maximizeAppointmentSlotsForDuration } = require("../solution/task2");

const TEST_DATE_STRINGS = [
  "2024-08-19T12:00:00.000Z",
  "2024-08-19T12:15:00.000Z",
  "2024-08-19T12:30:00.000Z",
  "2024-08-19T12:45:00.000Z",
  "2024-08-19T13:00:00.000Z",
  "2024-08-19T13:15:00.000Z",
  "2024-08-19T13:30:00.000Z",
  "2024-08-19T13:45:00.000Z",
];

// Turn strings into dates.
const TEST_DATES = TEST_DATE_STRINGS.map((dateString) => new Date(dateString));

const EXPECTED_OUTPUT_STRINGS = [
  "2024-08-19T12:00:00.000Z",
  "2024-08-19T13:30:00.000Z",
];

// Turn strings into dates.
const EXPECTED_OUTPUT_DATES = EXPECTED_OUTPUT_STRINGS.map(
  (dateString) => new Date(dateString)
);

test(" Task 2 - Test on Example Input", () => {
  const MAXIMIZED_SLOTS = maximizeAppointmentSlotsForDuration(TEST_DATES, 90);
  expect(MAXIMIZED_SLOTS).toEqual(EXPECTED_OUTPUT_DATES);
});

const TEST_DATES_TWO = [];

// Turn strings into dates.

const EXPECTED_OUTPUT_DATES_TWO = [];

test("Task 2 - Empty Case Test", () => {
  const MAXIMIZED_SLOTS = maximizeAppointmentSlotsForDuration(
    TEST_DATES_TWO,
    90
  );
  expect(MAXIMIZED_SLOTS).toEqual(EXPECTED_OUTPUT_DATES_TWO);
});

const TEST_DATE_STRINGS_THREE = [
  "2024-08-19T12:00:00.000Z",
  "2024-08-19T12:15:00.000Z",
  "2024-08-19T13:30:00.000Z",
  "2024-08-19T13:45:00.000Z",
  "2024-08-19T15:00:00.000Z",
  "2024-08-19T15:15:00.000Z",
];

// Turn strings into dates.
const TEST_DATES_THREE = TEST_DATE_STRINGS_THREE.map(
  (dateString) => new Date(dateString)
);

const EXPECTED_OUTPUT_STRINGS_THREE = [
  "2024-08-19T12:00:00.000Z",
  "2024-08-19T13:30:00.000Z",
  "2024-08-19T15:00:00.000Z",
];

// Turn strings into dates.
const EXPECTED_OUTPUT_DATES_THREE = EXPECTED_OUTPUT_STRINGS_THREE.map(
  (dateString) => new Date(dateString)
);

test("Task 2 - No Maximization Possible", () => {
  const MAXIMIZED_SLOTS = maximizeAppointmentSlotsForDuration(
    TEST_DATES_THREE,
    90
  );
  expect(MAXIMIZED_SLOTS).toEqual(EXPECTED_OUTPUT_DATES_THREE);
});


const EXPECTED_OUTPUT_STRINGS_FOUR = [
  "2024-08-19T12:00:00.000Z",
  "2024-08-19T13:00:00.000Z",
];

const EXPECTED_OUTPUT_DATES_FOUR = EXPECTED_OUTPUT_STRINGS_FOUR.map(
  (dateString) => new Date(dateString)
);


test("Task 2 - Duration of 60 Mins", () => {
  const MAXIMIZED_SLOTS = maximizeAppointmentSlotsForDuration(
    TEST_DATES,
    60
  );
  expect(MAXIMIZED_SLOTS).toEqual(EXPECTED_OUTPUT_DATES_FOUR);
});