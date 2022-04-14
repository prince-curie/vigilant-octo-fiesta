import { createContext, useContext, useState } from "react";
import { create } from 'ipfs-http-client'
import { Contract } from "ethers";
import { abi, CONTRACT_ADDRESS } from "../constants";
import { providerSignerContext } from "./ProviderOrSignerContext";

const client = create('https://ipfs.infura.io:5001/api/v0')
export const ipfsContext = createContext()
export default function IpfsUploadContext(props) {
  const {getProviderOrSigner} = useContext(providerSignerContext)
    const [fileUrl, setFileUrl] = useState(``)
    const [fileName, setFileName] = useState(``)
    const [fileType, setFileType] = useState(``)
    const [totalCounter, setTotalCounter] = useState(0)
    const [fileLoading, setFileLoading] = useState(false)

    const getTotalCounter = async () => {
      
    
        try {
          const provider = await getProviderOrSigner();
          const contract = new Contract(CONTRACT_ADDRESS, abi, provider);
        
          const tx = await contract._tokenIdCounter();
  
          setTotalCounter(tx.toNumber())
          
        } catch (err) {
          console.error(err);
        }
    }
    const handleUpload = async(file) => {
    
    try {
      setFileLoading(true)
      const added = await client.add(file)
      
      const pathOnIpfs = `https://ipfs.infura.io/ipfs/${added.path}`

      setFileUrl(pathOnIpfs)
      setFileName(file.name)
      setFileType(file.type)
      setFileLoading(false)
      getTotalCounter()
      
      
    } catch (error) {
      console.log('Error uploading file: ', error)
    } 
   }
  
   return (
       <ipfsContext.Provider value={{ fileUrl, fileName, fileType, totalCounter, getTotalCounter,  handleUpload, fileLoading }}>
           {props.children}
       </ipfsContext.Provider>
   )
}