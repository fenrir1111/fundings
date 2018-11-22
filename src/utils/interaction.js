// 获取账户地址

import web3 from "./web3";
import contract from "./contract";

const getAccounts = () => {
    return web3.eth.getAccounts()
}
// 创建众筹合约
 const createFunding =  (_projectName,_supportMoney,_goalMoney)=>{
    return new Promise(async (resolve,reject) => {
        try{
            const accounts = await web3.eth.getAccounts()
            // console.log(accounts)


            const result = await contract.factoryContract.methods
                .createFunding(_projectName,_supportMoney,_goalMoney)
                .send({
                    from:accounts[0]
                })
            console.table(result)
            resolve(result)
        } catch (e) {
            console.error(e)
            reject(e)
        }
    })

}
// 获取众筹合约

const Api = {
    getAccounts,
    createFunding
}

export default Api