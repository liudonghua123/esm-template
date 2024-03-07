#!/usr/bin/env node

import process from "process";
import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import figlet from "figlet";
import { say_hello, times_str } from "./utli.js";

/**
 * show the logo
 * @returns {void}
 */
function show_logo() {
  console.log(
    chalk.yellow(figlet.textSync(say_hello(), { horizontalLayout: "full" })),
  );
}

/**
 * Process the choice according to the user's choice
 * @param {{ choice: string }} result - the user's choice
 * @returns {void}
 */
function process_choice(result) {
  const spinner = ora(`Doing ${result.choice}...`).start(); // 启动旋转器动画
  setTimeout(() => {
    spinner.succeed(chalk.green("Done!")); // 3秒后完成，显示成功消息
  }, 3000);
}

/**
 * main function of the program
 * @returns {void}
 */
function main() {
  show_logo();
  program.version("1.0.0").description("My Node CLI");
  program.action(async () => {
    const result = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose an option:",
        choices: ["Option 1", "Option 2", "Option 3"],
      },
    ]);
    process_choice(result);
  });
  program.parse(process.argv);
  console.info(`invoke times_str: ${times_str(3, "hello")}`);
}

main();
