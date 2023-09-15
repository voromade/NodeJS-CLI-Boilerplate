const {
  logVoro,
  log,
  logOptions,
  getUserInput,
  setTitleBar,
  sleep,
} = require("./src/utils.js");
const { menus } = require("./config.json");

/**
 * Initialize the CLI application.
 * Sets the title bar, displays the banner and options, and handles user input.
 *
 * @returns {Promise<void>} - A promise that resolves when the initialization is complete.
 */
const init = async () => {
  setTitleBar();
  logVoro();
  logOptions(menus);
  log("", "info");
  let answer = await getUserInput("Selection: ");
  await handler(parseInt(answer));
};

/**
 * Handle the user's menu selection.
 * Logs the user's selection and takes appropriate action.
 *
 * @param {number} selection - The user's menu selection.
 * @returns {Promise<void>} - A promise that resolves when the handling is complete.
 */
const handler = async (selection) => {
  switch (selection) {
    default:
      if (isNaN(selection) || selection > menus.length || selection < 1) {
        log(`[X] Invalid Selection`, "error");
        break;
      }
      if (menus.length === selection) {
        log("[>] Exiting CLI...", "error");
        process.exit();
      }
      log(`[>] You selected option ${selection}`, "success");
      break;
  }

  await sleep(2500);
  init();
};

// Initialize the CLI application.
init();
