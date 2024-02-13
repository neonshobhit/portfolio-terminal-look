import commandsJson from "./commands.json";
export function getResponse(command) {
  let res = undefined;
  let action = undefined;
  console.log(commandsJson[command]);
  if (commandsJson[command] === undefined) {
    res = "Not supported.";
  } else if (commandsJson[command] === null && command === "clear") {
    res = null;
    action = "CLEAR";
  } else if (command === "") {
    res = "";
  } else if (
    commandsJson[command] === null &&
    (command === "help" || command === "man")
  ) {
    res = "<table>";

    for (let i in commandsJson) {
      if (commandsJson[i] === null) continue;
      if (i === "") continue
      res += "<tr>"
      res += "<td>" + i + "</td>"
      res += "<td>" + commandsJson[i].cue + "</td>"
      res += "</tr>"
    }
    res += "</table>"
  } else {
    res = commandsJson[command].response;
  }

  return {
    res,
    action,
  };
}

export function parseCommand(inputValue) {
  const command = inputValue.split(" ").filter((el) => el !== "");
  let parsingError = undefined;
  if (command.length === 0) {
    return {
      inputValue,
      answer: "",
      action: "IGNORE",
    };
  }
  console.log(command);
  const parsedCommand = {
    options: [],
    command: command[0],
    args: [],
  };
  for (let i = 1; i < command.length; ++i) {
    const elm = command[i];
    if (elm === "" || elm === "") continue;
    if (elm === "--") {
      for (let j = i + 1; j < command.length; ++j) {
        parsedCommand.args.push(command[j]);
      }
      break;
    } else if (elm.slice(0, 2) === "--") {
      const com = elm.slice(2);
      if (com.length < 2) {
        parsingError = "error at " + command[i];
        break;
      }
      if (i + 1 === command.length) {
        parsingError = "error at " + command[i];
        break;
      }
      if (command[i + 1].startsWith("-")) {
        parsingError = "error at " + command[i + 1];
        break;
      }
      parsedCommand.options.push({
        command: com,
        arg: command[++i],
      });
      continue;
    } else if (elm.slice(0, 1) === "-") {
      const com = elm.slice(1);
      if (com.length !== 1) {
        parsingError = "error at " + command[i];
        break;
      }
      if (i + 1 === command.length) {
        parsingError = "error at " + command[i];
        break;
      }
      if (command[i + 1].startsWith("-")) {
        parsingError = "error at " + command[i + 1];
        break;
      }
      parsedCommand.options.push({
        command: com,
        arg: command[++i],
      });
    } else {
      parsedCommand.args.push(command[i]);
    }
  }
  // Yet not supported 0 arg options
  if (parsingError) {
    return {
      inputValue,
      answer: parsingError,
      action: null,
    };
  } else {
    const { res, action } = getResponse(command[0]);
    console.log(res, action);
    return {
      inputValue,
      answer: res,
      action,
    };
  }
}
