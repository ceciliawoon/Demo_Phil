

window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider')
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/<APIKEY>"));
    }
})

const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );


async function getBalance() {
    var address, wei, balance
    // address = document.getElementById("address").value;
    address = "0x8500Cb98498733A6B6cC29E92845a13400EA5dc2"; //hard-coded metamask ethereum wallet address.
    wei = promisify(cb => web3.eth.getBalance(address, cb))
    try {
        balance = web3.fromWei(await wei, 'ether')
        document.getElementById("output").innerHTML = "You own : " + balance + " ETH";

        // // x = document.getElementById("colright");
        //         img = document.createElement("img");

        //         // img.src = "giphy.gif";
        //         img.setAttribute("src", "macdo.gif" ,50000);
        //         img.setAttribute("height", "595");
        //         img.setAttribute("width", "825");
        //         img.setAttribute("alt", "macdo");
                
        //         document.getElementById("colright").appendChild(img);
        //         // 
    } catch (error) {
        document.getElementById("output").innerHTML = error;
    }
}
async function getERC20Balance() {
    var address, contractAddress, contractABI, tokenContract, decimals, balance, name, symbol, adjustedBalance
    // address = document.getElementById("address").value
    // contractAddress = document.getElementById("contractAddress").value
    address = "0x8500Cb98498733A6B6cC29E92845a13400EA5dc2";
    contractAddress = "0xf8d9ec39f1798bc68096e144dfb37cb2ebd3e0b0";
    contractABI = human_standard_token_abi

    tokenContract = web3.eth.contract(contractABI).at(contractAddress)

    decimals = promisify(cb => tokenContract.decimals(cb))
    balance = promisify(cb => tokenContract.balanceOf(address, cb))
    name = promisify(cb => tokenContract.name(cb))
    symbol = promisify(cb => tokenContract.symbol(cb))

    try {
        adjustedBalance = await balance / Math.pow(10, await decimals)
        document.getElementById("output2").innerHTML = "You have : " + adjustedBalance ;
        // document.getElementById("output2").innerHTML += " " + await symbol + " (" + await name + ")" + " tokens";
        document.getElementById("output2").innerHTML += " "  + " tokens";

                // // img.src = "giphy.gif";
                // img.setAttribute("src", "shaq2.gif");     
    } catch (error) {
        document.getElementById("output2").innerHTML = error;
    }
}


