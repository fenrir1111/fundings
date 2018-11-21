const Web3 = require('web3')

const compileContracts = require('./compile')

const HDWalletProvider = require('truffle-hdwallet-provider')

let mnemonic = 'poem keen border output life want tourist swarm cotton monkey panda battle'
const provider = new HDWalletProvider(mnemonic,'https://rinkeby.infura.io/v3/8df118de68934f93bdeef77c0673a6e4')

const web3  = new Web3(provider)

deployFactory = async () => {
    const contract = compileContracts.FundingFactory
    const accounts = await web3.eth.getAccounts()
    const bytecode = '0x'+contract.bytecode
    const gas = await web3.eth.estimateGas({data:bytecode})

    // 0xa9ca16574Ed47532A2F166A8974959046a4Bbc07
    const contractResult = await new web3.eth.Contract(JSON.parse(contract.interface))
        .deploy({data:bytecode})
        .send({
            from:accounts[0],
            gas:gas
        })
    console.log(accounts[0])
    console.log(contractResult.options.address)
    console.log('================== FundingFactory interface')
    console.log(contract.interface)


}
deploy = async () =>{
  await deployFactory()
    console.log('================== Funding interface')
    console.log(compileContracts.Funding.interface)

}

deploy()