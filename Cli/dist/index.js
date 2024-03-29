#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const argv = yargs_1.default
    .command("create", "create a new file", {
    "name": {
        describe: "File Name",
        demandOption: true,
        type: "string",
        alias: 'n'
    }
})
    .command("new", "create a new project", {
    "name": {
        describe: "File Name",
        demandOption: true,
        type: "string",
        alias: 'n'
    }
})
    .command("build", "build cli")
    .help()
    .argv;
if (argv._.includes("create")) {
    let fileName = argv.name;
    if (!fileName)
        fileName = "style";
    const example = `*{
    margin:0;
    padding:0;
  }`;
    fs_1.default.writeFileSync(fileName + ".css", example),
        console.log("css dosyası başarıyla oluşuruldu");
}
if (argv._.includes("build")) {
    (0, child_process_1.exec)("npm run build", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stdout}`);
        }
        console.log(`stdout:${stdout}`);
        console.log(`stderr:${stderr}`);
    });
    if (argv._.includes("new")) {
        const projectName = argv.name;
        (0, child_process_1.exec)(`git clone https://github.com/TanerSaydam/SmartEnum.git ${projectName} `, (error, stdout, stderr) => {
            if (error) {
                console.error("Error:${stdout}");
            }
            console.log(`stdout:${stdout}`);
            console.log(`stderr:${stderr}`);
        });
    }
}
