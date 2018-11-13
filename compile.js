const fs = require('fs')
const path = require('path')
const solc = require('solc')

const filePath = path.join(__dirname,"contracts","Funding.sol")
console.log(filePath)
const source = fs.readFileSync(filePath,"utf-8")

// read file content

// compile file content

const compile = solc.compile(source,1)
console.log(compile)

const compileContracts = {
    Funding: compile.contracts[':Funding'],
    FundingFactory: compile.contracts[':FundingFactory'],

}
module.exports = compileContracts