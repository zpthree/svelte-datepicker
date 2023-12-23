<script>
  import { onMount } from "svelte";
  import { format, differenceInDays } from "date-fns";

  import {
    initRows,
    fullMonthYear,
    arrDays,
    updateRows,
  } from "./lib/datepicker";

  let isActive = false,
    rows = initRows(),
    selectedMonth = +format(new Date(), "MM"),
    selectedYear = +format(new Date(), "yyyy"),
    selectedFullDate = format(new Date(), "MM-dd-yyyy");


  /**
   * Navigate months
   */
  function previousMonth() {
    selectedMonth--;

    if (selectedMonth <= 0) {
      selectedMonth = 12;
      selectedYear--;
    }
    rows = updateRows(selectedMonth, selectedYear);
  }

  function nextMonth() {
    selectedMonth++;

    if (selectedMonth > 12) {
      selectedMonth = 1;
      selectedYear++;
    }

    rows = updateRows(selectedMonth, selectedYear);
  }

  function padNumber(num) {
    return num.toString().padStart(2, "0");
  }

  function selectDate(y, m, d) {
    // add leading zero to single digit days and months
    d = padNumber(d);
    m = padNumber(m);

    // update selectedFullDate
    selectedFullDate = format(new Date(`${y}-${m}-${d}T12:00:00`), "MM-dd-yyyy");
  }

  /**
   * Lifecycle methods
   */
  onMount(() => {
    rows = updateRows(selectedMonth, selectedYear);
  })
</script>

<main>
  <div class="py-10">
    <h1 class="mb-2 text-5xl">Svelte Datepicker</h1>

    <input type="text" class="p-2 mt-4 text-lg text-center text-black bg-gray-100 dark:bg-gray-700 dark:text-white" value={selectedFullDate} readonly />
  </div>

  <div class="relative flex items-center justify-center">
    <div
      id="datepicker"
      class="relative z-20 w-full max-w-[540px] h-full shadow-lg"
    >
      <div class="bg-gray-100 sm:rounded-md dark:bg-gray-900">
        <div class="w-full">
          <div class="w-full p-4 md:p-8">
            <div class="flex items-center justify-between">
              <!-- Month year -->
              <span
                class="text-lg font-bold text-gray-800 dark:text-gray-200 focus:outline-none"
                >{fullMonthYear(selectedMonth, selectedYear)}</span
              >
              <div class="flex items-center">
                <!-- bnt previous -->
                <button
                  type="button"
                  on:click={previousMonth}
                  aria-label="View previous month"
                  class="text-gray-800 dark:text-gray-200 previous-month"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-chevron-left"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </button>
                <!-- bnt next -->
                <button
                  type="button"
                  on:click={nextMonth}
                  aria-label="View next month"
                  class="ml-3 text-gray-800 dark:text-gray-200 next-month"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-chevron-right"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between pt-6 overflow-x-auto day-table">
              <table class="w-full">
                <thead>
                  <tr>
                    {#each arrDays() as day}
                      <th>
                        <div class="flex justify-center w-full">
                          <p
                            class="text-base font-medium text-center text-gray-700 dark:text-gray-300"
                          >
                            {day}
                          </p>
                        </div>
                      </th>
                    {/each}
                  </tr>
                </thead>

                <tbody>
                  {#each rows as col}
                    <tr>
                      {#each col as d}
                        <td>
                          {#if d}
                            <div class="flex justify-center w-full px-1 py-1 cursor-pointer">
                              <button
                                on:click={() => {
                                  selectDate(selectedYear, selectedMonth, d);
                                }}
                                class="text-center text-white transition-colors duration-200 bg-purple-700 border-none w-14 h-14 hover:bg-purple-600"
                                class:active-day-button={differenceInDays(
                                    new Date(`${selectedFullDate}`),
                                    new Date(`${selectedYear}-${padNumber(selectedMonth)}-${padNumber(d)}T00:00:00`)
                                  ) === 0}
                              >
                                {d}
                              </button>
                            </div>
                          {/if}
                        </td>
                      {/each}
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <div class="flex items-center justify-center py-10 text-gray-600 dark:text-gray-400">
      <a href="https://zachpatrick.com/blog/build-a-custom-datepicker-with-svelte" target="_blank" class="underline hover:text-black dark:hover:text-white">Built by Zach Patrick</a>&nbsp;&nbsp;<a href="https://github.com/zpthree/svelte-datepicker" target="_blank" rel="noopener noreferrer" class="hover:text-black dark:hover:text-white">
        <span class="sr-only">View on GitHub</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5" viewBox="0 0 496 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
      </a>
  </footer>
</main>
