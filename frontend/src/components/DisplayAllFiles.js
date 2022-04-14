import { providerSignerContext } from "../context/ProviderOrSignerContext";
import { Contract } from "ethers";
import { abi, CONTRACT_ADDRESS } from "../constants";
import { useContext, useState } from "react";


export default function DisplayAllFiles () {

const { getProviderOrSigner } = useContext(providerSignerContext);
const [loading, setLoading] = useState(false);
const [publicFile, setPublicFile] = useState([])


  const getPublicFile = async () => {
    //
    
    
    try{
        const signer = await getProviderOrSigner(true)
        const contract = new Contract(
            CONTRACT_ADDRESS,
            abi,
            signer
        )
        const tx = await contract.getPublicFiles(1, 100)
        setLoading(true);
        // wait for the transaction to get mined
        tx.wait()
        setLoading(false)
        console.log(tx)
      
      
    } catch(err) {
        console.error(err)
    }
  }
    return(
        <div>
          <h4>display files</h4>
        </div>
    )
}