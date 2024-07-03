// node todo.js -f mytasks.txt add "Buy milk"
// node todo.js -f mytasks.txt list
// node todo.js -f mytasks.txt remove 1

const fs = require("fs").promises;
const { program } = require("commander");
require("colors");

const addTask = async (task, logFile) => {
  try {
    await fs.appendFile(logFile, `${task}\n`);
  } catch (err) {
    console.error(`Could not save task to ${logFile}`.red);
  }
};

const listTasks = async logFile => {
  const data = await fs.readFile(logFile, 'utf-8');
  console.log(data.blue);
};

const removeTask = async (index, logFile) => {
  try {
    const data = await fs.readFile(logFile, 'utf-8');
    const arrData = data.split('\n');

    if (index < 1 || index > arrData.length) {
      console.log(`Invalid index. Please provide a number between 1 and ${arrData.length}`);
      return;
    }

    arrData.splice(index - 1, 1);
    await fs.writeFile(logFile, arrData.join('\n'));
  } catch (err) {
    console.error(`Could not modify file ${logFile}`.red);
  }
};

program.option("-f, --file [type]", "file for saving tasks", "tasks.txt");
program
  .command("add <task>")
  .description("Add a new task")
  .action(async task => {
    const logFile = program.opts().file;
    await addTask(task, logFile);
    console.log("Task added!".green);
  });
program
  .command("list")
  .description("List all tasks")
  .action(async () => {
    const logFile = program.opts().file;
    await listTasks(logFile);
  });
program
  .command("remove <index>")
  .description("Remove a task by index")
  .action(async index => {
    const logFile = program.opts().file;
    await removeTask(index, logFile);
    console.log("Task removed!".green);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}