import { useContext } from "react"
import { providerSignerContext } from "../context/ProviderOrSignerContext"



export default function Navbar() {
    const {connectWallet, walletConnected} = useContext(providerSignerContext)
    return (
        <ul>
  <li><a class="active" href="#home">Casper</a></li>
  <li><a href="#news">Home</a></li>
  <li><a href="#news">About</a></li>
  <li><a href="#news">Faq</a></li>
  
</ul>


      
    )
}