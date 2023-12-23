import { format, startOfMonth, endOfMonth } from "date-fns";

/**
 * Create the calendar grid
 * @returns {Array} rows
 */
export function initRows() {
  return [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
}

export function fullMonthYear(month, year) {
  // pad the month with a zero if it's less than 10
  month = month.toString().padStart(2, "0");

  const date = format(
    new Date(`${year}-${month}-01T12:00:00`),
    "MMMM yyyy"
  );

  return date.charAt(0).toUpperCase() + date.slice(1);
}

/**
 * Return an array of days
 * @returns {Array} days
 */
export function arrDays() {
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
}

/**
 * Return an calendary month
 * @returns {Array} months
 */
export function updateRows(month, year) {
  const rows = initRows();
  // pad the month with a zero if it's less than 10
  month = month.toString().padStart(2, "0");

  const firstDayOfCurrentMonth = format(
    startOfMonth(new Date(`${year}-${month}-01T12:00:00`)),
    "EEEEEE"
  );

  const lastDayOfCurrentMonth = +format(
    endOfMonth(new Date(`${year}-${month}-01T12:00:00`)),
    "d"
  );

  let row = 0; // week
  let col = 0; // day of the week
  let start = false;
  let i = 0;

  for (row = 0; row < 6; row++) {
    arrDays().forEach((daystr) => {
      if (i > lastDayOfCurrentMonth) {
        return;
      }

      if (!start && daystr === firstDayOfCurrentMonth) {
        i++;
        start = true;
      }

      rows[row][col] = i;
      col++;

      if (start) {
        i++;
      }
    });
    col = 0;
  }

  return rows;
}