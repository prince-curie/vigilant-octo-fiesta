import { ethers } from 'ethers';
import {useState} from 'react'
import { Web3Storage } from 'web3.storage'
import contractABI from './contractABI.json'




export default function UploadForm() {
    
    const WEB3_STORAGE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkzOUY4QjJmNzA0ZTU1RjUxRjBlOTAxQjA1YkMzQTIwNzgwNTRCYzIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk4ODI1NjExNDksIm5hbWUiOiJibG9ja2dhbWVzLXRhc2stMiJ9.zKRpIy8__jnK548DE7JzWtsQo0vfm0FZFqsRXfCB3SY";
    
    const {file, setFile} = useState(null);
    
    const {fileName, setFileName} = useState("");

    const {isPrivate, setIsPrivate} = useState(false);

    const CONTRACT_ADDRESS = "address"


    function makeStorageClient () {
        return new Web3Storage({ token: WEB3_STORAGE_TOKEN })
      }

    const handleUpload = async () => {
        const storageClient = makeStorageClient()
        const fileBuffer = await file.arrayBuffer()
        const fileHash = await storageClient.upload(fileBuffer)
        const fileUrl = `https://storage.web3.site/${fileHash}`
        setFile(fileUrl)
        setFileName(fileName)
        setIsPrivate(false)

        try {
            const {ethereum} = window;
            if(ethereum) {
                const {provider} = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

                const tx = await contract.uploadFile(fileName, fileUrl, isPrivate);

                const receipt = await tx.wait();

                console.log("receipt", receipt);

                setFileName("");
                setFile(null);
                setIsPrivate(false);
            } else {
                console.log("No ethereum");
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div>
            <input type= "text" value={fileName} onChange={(e) => setFileName(e.target.value)}/>
            <input type= "boolean" value={isPrivate} onChange={(e) => setIsPrivate(e.target.value)}/>
            <input type= "file" onChange={(e) => setFile(e.target.files[0])}/>

            <button onClick={() => handleUpload()}>Upload</button>


        </div>
    )

}