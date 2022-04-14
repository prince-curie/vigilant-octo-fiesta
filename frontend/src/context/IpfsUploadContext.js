import { createContext, useState } from "react";
import { create } from 'ipfs-http-client'

const client = create('https://ipfs.infura.io:5001/api/v0')
export const ipfsContext = createContext()
export default function IpfsUploadContext(props) {
    const [fileHash, setFileHash] = useState(``)
    const [fileName, setFileName] = useState(``)
    const [fileLoading, setFileLoading] = useState(false)
    const handleUpload = async(file) => {
    
    try {
      setFileLoading(true)
      const added = await client.add(file)
      
      // const pathOnIpfs = `https://ipfs.infura.io/ipfs/${added.path}`

      setFileHash(added.path)
      setFileName(file.name)
      setFileLoading(false)
      
    } catch (error) {
      console.log('Error uploading file: ', error)
    } 
   }

   return (
       <ipfsContext.Provider value={{ fileHash, fileName, handleUpload, fileLoading }}>
           {props.children}
       </ipfsContext.Provider>
   )
}