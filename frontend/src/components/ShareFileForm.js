
import {useState} from 'react'

import { BigNumber, Contract } from 'ethers';
import {abi, CONTRACT_ADDRESS} from "../constants/index"
import { providerSignerContext } from '../context/ProviderOrSignerContext';



export default function ShareFileForm() {
    const {getProviderOrSigner} = useContext(providerSignerContext)

    const {fileId, setFileId} = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    const [loading, setLoading] = useState(false)


    const handleSubmit = async () => {
        try {
            const {ethereum} = window;
            if(ethereum) {

                const signer = await getProviderOrSigner(true)
                const contract = new Contract(
                    CONTRACT_ADDRESS,
                    abi,
                    signer
                )
                const tx = await contract.shareFile(BigNumber.from(fileId), walletAddress);
                
                setLoading(true);
                // // wait for the transaction to get mined
                tx.wait()
                setLoading(false)
                console.log(tx)
                setFileId(null);
                setWalletAddress("")
                
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
