const cors = require("cors")
const express = require('express')
const crypto = require('crypto')
const sanityClient = require('@sanity/client')
const keccak = require('keccak256')
const getTokenByChain = require('./tokenConfig')
const { response } = require("express")
const myPrivateKey = 'asohmwkdib3ijn3vbbs9ejb5ja09djnwmmw'
const Web3 = require("web3")
const { ethers } = require('ethers')
const dotenv = require('dotenv');
dotenv.config();

//Sanity Client configuration
const client = sanityClient({
    projectId: '8cs1ycrb',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token:
        'sk1EyKI1AqgrWMhDKdf30DNj6PZnSx9bp5vqrDSICta0idga21xAJaSjuM8SqotBPP58y6fM6BSXUcUtVsMCDhMNDkjtExwS5Gaf8KmlMZ2yGfW4LYyhKpRXT0kLHs4Db2x4hhYVrBnEtMJ0dU6KXSwy09XfRg2rT8EwHXTceZaBm8aigiyF',
    useCdn: true,
})

const trnxLimit = 30
const port = process.env.PORT

const app = express()
const web3 = new Web3()

//middleware
app.use(express.json())
app.use(cors())


//routes

app.get("/get/balance/:myaddress/:crypto", async (req, res) => {
    const query = '*[_type == "txTracker" && to == $walletAddress && coin == $coin && status == $status] {amount}'
    const params = { walletAddress: req.params.myaddress, status: 'pending', coin: req.params.crypto }
    const result = await client.fetch(query, params)
    const summary = result.length != 0 ? result.map(bal => bal.amount).reduce((acc, bal) => bal + acc) : 0;
    res.send({ result: summary })
})

app.get("/get/data/:myaddress/:crypto", async (req, res) => {
    const query = '*[_type == "txTracker" && to == $walletAddress && coin == $coin && status == $status] {_id,from,contract,amount,coin}'
    const params = { walletAddress: req.params.myaddress, status: 'pending', coin: req.params.crypto }
    const result = await client.fetch(query, params)
    res.send(result)
})

app.put("/update/status/:id", async (req, res) => {
    // const query = '*[_type == "txTracker" && _id == $id] {_id,from,contract,amount,coin}'
    // const params = { id: req.params.id}
    // const out = await client.fetch(query, params)
    // const id = out[0]._id

    await client.patch(req.params.id)
        .set({ 'status': 'paid' })
        .commit()
        .then(res.send("Withdrawal successfully completed."))
        .catch(e => `Error is: ${e}`)

})

async function clearFields() {
    const query = '*[_type == "txTracker"]';
    //const params = { status: 'no', date: Number(((new Date().getTime()) / 1000).toFixed(0)) }
    const result = await client.delete({ query })
}

app.post("/save/trnx/", async (req, res) => {
    const { from, to, coin, contract, amount, status } = req.body
    const userDoc = {
        _type: "txTracker",
        _id: Date.now(),
        from: from.toLowerCase(),
        to: to.toLowerCase(),
        coin: coin,
        contract: contract.toLowerCase(),
        amount: amount,
        status: status,
    };
    try {
        const result = await client.create(userDoc);
        res.send("Data Saved")
    } catch (e) {
        console.log(e)
        res.send(`Errored out: ${e}`)
    };
})

// app.get("/get/mixerWallet/:owner", async (req, res) => {
//     const query = '*[_type == "counterTracker" && walletAddress == $walletAddress] {count}'
//     const params = { walletAddress: req.params.owner }
//     console.log("params", params)
//     const result = await client.fetch(query, params)
//     console.log("result", result)
//     const count = result[0] ? result[0].count : 0
//     var mixerWallet;
//     if (result[0]) {
//         console.log("all ok", result[0])
//     } else {
//         const counterDoc = {
//             _type: "counterTracker",
//             _id: req.params.owner,
//             count: 0,
//             walletAddress: req.params.owner,
//         }
//         const result1 = await client.createIfNotExists(counterDoc);

//         const wallet = ethers.Wallet.createRandom()
//         const walletDoc = {
//             _type: "walletTracker",
//             _id: wallet.address,
//             owner: req.params.owner,
//             mixerWallet: wallet.address,
//             mixerWalletPvtKey: wallet.privateKey,
//             mixerWalletMnemonic: wallet._mnemonic().phrase,
//             status: "Active",
//         };
//         const result = await client.createIfNotExists(walletDoc);
//     }
//     if (Number(count) + 1 <= Number(trnxLimit)) {
//         //send the old address
//         const query = '*[_type == "walletTracker" && owner == $walletAddress && status == $status] {mixerWallet}'
//         const params = { walletAddress: req.params.owner, status: "Active" }
//         console.log("params", params)
//         mixerWallet = await client.fetch(query, params)
//         console.log("if")
//     } else {
//         console.log("else")
//         //Change the existing wallet to passive
//         const query = '*[_type == "walletTracker" && owner == $walletAddress && status == $status] {_id}'
//         const params = { walletAddress: req.params.owner, status: "Active" }
//         const out = await client.fetch(query, params)
//         const id = out[0]._id
//         const updateStatus = await client.patch(id).set({ 'status': 'Passive' }).commit()
//             .catch(e => console.log(e))

//         //Create new wallet and send the address
//         const wallet = ethers.Wallet.createRandom()
//         mixerWallet = wallet.address
//         const walletDoc = {
//             _type: "walletTracker",
//             _id: _id.toLowerCase(),
//             owner: req.params.owner,
//             mixerWallet: wallet.address,
//             mixerWalletPvtKey: wallet.privateKey,
//             mixerWalletMnemonic: wallet._mnemonic().phrase,
//             status: "Active",
//         };
//         const result = await client.createIfNotExists(walletDoc);
//     }
//     console.log("result", mixerWallet)
//     res.send({ mixwallet: mixerWallet })
// })

// app.put("/updateCounter/:owner", async (req, res) => {
//     const query = '*[_type == "counterTracker" && walletAddress == $walletAddress] {count,_id}'
//     const params = { walletAddress: req.params.owner }
//     const out = await client.fetch(query, params)
//     const id = out[0]?._id
//     const count = out[0]?.count
//     if (Number(count) + 1 <= Number(trnxLimit)) {
//         //increse counter
//         const updateCounter = await client.patch(id).set({ 'count': Number(count) + 1 }).commit()
//             .catch(e => console.log(e))
//     } else {
//         //reset
//         const updateCounter = await client.patch(id).set({ 'count': 1 }).commit()
//             .catch(e => console.log(e))
//     }
//     res.send({ response: "Counter Updated" })
// })



//listen
const POLLING_INTERVAL = 5000; // 5 Seconds, business can edit
setTimeout(async () => {
    //uncomment this line to reset the entire database
    //clearFields()
}, POLLING_INTERVAL);

app.listen(port, () => console.log(`Listening at ${port}`))