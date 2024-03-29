#!/usr/bin/env node
import yargs from 'yargs';
import fs from 'fs';
import { exec } from 'child_process';

const argv = yargs
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
    .argv as { [key: string]: unknown, _: string[] }
if (argv._.includes("create")) {
    let fileName = argv.name as string;
    if (!fileName) fileName = "style";
    const example = `*{
    margin:0;
    padding:0;
  }`
    fs.writeFileSync(fileName + ".css", example),
        console.log("css dosyası başarıyla oluşuruldu");
}
if (argv._.includes("build")) {
    exec("npm run build", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stdout}`)
        }
        console.log(`stdout:${stdout}`);
        console.log(`stderr:${stderr}`);

    });
    if (argv._.includes("new")) {
        const projectName = argv.name;
        exec(`git clone https://github.com/TanerSaydam/SmartEnum.git ${projectName} `, (error, stdout, stderr) => {
            if (error) {
                console.error("Error:${stdout}")
            }
            console.log(`stdout:${stdout}`)
            console.log(`stderr:${stderr}`)

        });
    }
}