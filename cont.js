const { program } = require("commander");
const readline = require("readline");
const fs = require("fs");


program.option("-f, --file <type>", "file", "game_result.txt");
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let counter = 0;
const number = Math.ceil(Math.random() * 100);
const logFile = program.opts().file;

const validate = (number) => {
  if(!isNaN(number) && number > 0 && number <= 100){
    return true
  }
  return false
}
const logger = async (log) =>{
  try{
    await fs.appendFile(logFile, `${new Date().toLocaleString("uk-UA")}: ${log}\n`)
  }catch(e){
    console.log(e.message)
  }
}
const game = () => {
 
   rl.question("e\n", ()=>{
     console.log("it works")
   })

  // rl.question("Enter number from 1 to 100\t", (value) => {
  //   if(!validate(value)){
  //     return game()
  //   }
  //   if (Number(value) !== number) {
  //     counter++
  //     console.log(`Correct number is ${value > number ? "bigger" : "smaller"}`);
  //     return game()
     
  //   } 
  //   console.log("You`re right!");
  //   logger(`Congrats!! you gessed in ${counter} trys`)
  //   return
  // });
};

game()