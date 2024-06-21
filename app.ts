#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

console.log("\n")
console.log(chalk.magentaBright("*************** OBJECT ORIENTED PROGRAMMING ***************"))
console.log("\n")


class STUDENT {
    name: string
    constructor(n: string) {
        this.name = n
    }
}

class PERSON {
    students: STUDENT[] = []
    addStudent(obj: STUDENT) {
        this.students.push(obj);
    }
}

const person = new PERSON()

async function main(person: PERSON) {
    do {

        let ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: chalk.magenta("Whome would you like to interact with?"),
                choices: ["staff", "student", "exit"]
            }
        ])

        if (ans.select === "staff") {
            console.log("\n")
            console.log(chalk.yellow("--------------- You approach the staff room, please feel free to ask any question.------------"))
            console.log("\n")
        }

        else if (ans.select === "student") {
            let ans = await inquirer.prompt([
                {
                    name: "student",
                    type: "input",
                    message: chalk.magenta("Enter the student`s name you wish to engage with:"),
                    validate:(input) => {
                        if(input.trim() === ""){
                            return chalk.red("Please Enter the student`s name you wish to engage with!")
                        }
                        else if(!(isNaN(input))){
                            return chalk.red("Please Enter the valid Student name")
                        }
                        else{
                            return true;
                        }
                    }
                }
            ])

            const std = person.students.find((val) => val.name === ans.student)

            if (!std) {
                const name = new STUDENT(ans.student);
                person.addStudent(name);
                console.log("\n")
                console.log(chalk.green(`Hello i am ${chalk.yellow(name.name)}. Nice to meet you!`))
                console.log("\n")
                console.log(chalk.green(`${chalk.yellow(name.name)}, Added Successfully`))
                console.log("\n")
                console.log(person.students)
                console.log("\n")
            }
            else{
                console.log("\n")
                console.log(chalk.green(`Hello i am ${chalk.yellow(std.name)}. Nice to meet you again!`))
                console.log("\n")
                console.log(chalk.green(`Existing Student List:`))
                console.log("\n")
                console.log(person.students)
                console.log("\n")
            }
        } 

        else if(ans.select === "exit"){
            console.log("\n")
            console.log(chalk.blue("Exiting the program ........"))
            console.log("\n")
            process.exit()
        }

    } while (true)
}
main(person)