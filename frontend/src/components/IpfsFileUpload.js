import { useContext } from 'react'

import { ipfsContext } from '../context/IpfsUploadContext'



export default function IpfsFileUpload() {
  const { fileName, fileUrl, handleUpload } = useContext(ipfsContext)
  async function handleChange(e) {
    handleUpload(e.target.files[0])
  } 

  return (
    <div>
    <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={handleChange}
      />
      {
        fileUrl && <img src={fileUrl} alt={fileName} width="400"/>
      }
       
    </div>
  );
}