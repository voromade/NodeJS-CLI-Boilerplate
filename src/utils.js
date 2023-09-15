const chalk = require("chalk");
const got = require("got");
const readline = require("readline");

/**
 * Make an HTTP request using the got library
 *
 * @param {Object} config - Configuration object for the HTTP request
 * @returns {Promise} - Promise resolving to the HTTP response
 */
const request = async (config) => {
  let res = await got(config);
  return res;
};

/**
 * Log a message to the console with colored output
 *
 * @param {string} message - The message to log
 * @param {string} type - The type of message (info, error, success, warn)
 */
const log = (message, type) => {
  switch (type) {
    case "info":
      console.log(chalk.greenBright(message));
      break;
    case "error":
      console.log(chalk.redBright(message));
      break;
    case "success":
      console.log(chalk.blueBright(message));
      break;
    case "warn":
      console.log(chalk.yellowBright(message));
      break;
    default:
      console.log(chalk.magenta(message));
  }
};

/**
 * Display the Voro banner in the console
 */
const logVoro = () => {
  clearConsole();
  let msg = `
██╗   ██╗ ██████╗ ██████╗  ██████╗ ███╗   ███╗ █████╗ ██████╗ ███████╗
██║   ██║██╔═══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗██╔══██╗██╔════╝
██║   ██║██║   ██║██████╔╝██║   ██║██╔████╔██║███████║██║  ██║█████╗  
╚██╗ ██╔╝██║   ██║██╔══██╗██║   ██║██║╚██╔╝██║██╔══██║██║  ██║██╔══╝  
 ╚████╔╝ ╚██████╔╝██║  ██║╚██████╔╝██║ ╚═╝ ██║██║  ██║██████╔╝███████╗
  ╚═══╝   ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝\n
                     Node.js CLI Boilerplate
                        by @voromade
    `;
  console.log(chalk.greenBright(msg));
};

/**
 * Log a list of options to the console with custom spacing
 *
 * @param {Array} options - The list of options to display
 */
const logOptions = (options) => {
  // Determine the length of the longest string for padding
  const maxLength = options.reduce(
    (max, str) => Math.max(max, str ? str.length : 0),
    0
  );

  // Print the menu with custom spacing
  for (let i = 0; i < options.length; i += 2) {
    // Get the first option, then pad it to align the text
    // I use maxLength (longest possible string) below to set the size of each option (allows them to be aligned!)
    const firstOption = `${chalk.gray(`[${i + 1}]`)} ${options[i]}`.padEnd(
      maxLength + 35,
      " "
    );
    const secondOption = options[i + 1]
      ? `${chalk.gray(`[${i + 2}]`)} ${options[i + 1]}`
      : ``;
    console.log(
      `${chalk.greenBright(firstOption)}${chalk.greenBright(secondOption)}`
    );
  }
};

/**
 * Clear the console screen
 */
const clearConsole = () => {
  console.clear();
  return;
};

/**
 * Set the title of the console window
 */
const setTitleBar = () => {
  process.title = `Node.js CLI Boilerplate | By @voromade`;
};

/**
 * Get user input from the console
 *
 * @param {string} prompt - The prompt message to display
 * @returns {Promise} - Promise resolving to the user's input
 */
const getUserInput = (prompt) => {
  /**
   * Create a readline interface for standard input and output
   */
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(
      chalk.greenBright(`${chalk.gray("[>]")} ${prompt}`),
      (answer) => {
        resolve(answer);
        rl.close();
      }
    );
  });
};

/**
 * Sleep function
 */
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports = {
  request,
  log,
  logVoro,
  logOptions,
  clearConsole,
  setTitleBar,
  getUserInput,
  sleep,
};
