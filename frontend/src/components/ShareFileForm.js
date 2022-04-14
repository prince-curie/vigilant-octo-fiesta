import { ethers } from 'ethers';
import {useState} from 'react'
import contractABI from './contractABI.json'
import { BigNumber } from 'ethers';



export default function ShareFileForm() {

    const {fileId, setFileId} = useState(null);
    const {walletAddress, setWalletAddress} = useState("");
    const CONTRACT_ADDRESS = "address"

    const handleSubmit = async () => {
        try {
            const {ethereum} = window;
            if(ethereum) {
                const {provider} = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

                const tx = await contract.grantAccess(BigNumber.from(fileId), walletAddress);

                const receipt = await tx.wait();

                console.log("receipt", receipt);

                setFileId(null);
                setWalletAddress("");
            } else {
                console.log("No ethereum");
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div>
            <h1>Share File</h1>
            <input
                type="number"
                value={fileId}
                onChange={(e) => setFileId(e.target.value)}
            />
            <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
