import React, { useEffect, useState } from 'react'
import CryptoJS, { SHA256 } from 'crypto-js'
import "./Hasher.css"
import {FaClipboard} from "react-icons/fa"
import clipboardCopy from 'clipboard-copy'


const Hasher = () => {
  const [selected , setSelected] = useState('')
  const [text , setText] = useState('')
  const [hash , setHash] = useState('')
  const [isCopied, setIsCopied] = useState(false);

  const hashAlgorithms = {
    MD5: CryptoJS.MD5,
    SHA1: CryptoJS.SHA1,
    SHA256: CryptoJS.SHA256,
    SHA512: CryptoJS.SHA512,
  }
  useEffect(() => {

    const handlehash = () =>{
      try{
      const select  = hashAlgorithms[selected]
      const answer = select(text).toString()
      setHash(answer)
      }catch(e){
      console.log('okay',e)
      } 
    }
    handlehash()
  })
  const handleCopyClick = async () => {
    try {
    await clipboardCopy(hash);
    setIsCopied(true);
    setTimeout(() => {
    setIsCopied(false);
    }, 1500);
    } catch (err) {
    console.error('Failed to copy text: ', err);
    }
  }
return (
  <div className='main' >
    <h1>Password Encrytion</h1> 
         <p>{isCopied ? 'Copied!' : ''}</p> 
       <select className='dropdown' id ='dropdown' value={selected} onChange={(e) => setSelected(e.target.value)}> 
            <option className='option' value=''> Select an option</option>
            <option value="MD5">MD5</option>
            <option value="SHA1">SHA1</option>
            <option value="SHA256">SHA256</option>
            <option value="SHA512">SHA512</option>
          </select>

          <div className='main-container '>
          <div className='container'>
          <h2>Input</h2>

          <input 
          placeholder='enter text to encrpt'
          value={text}
          onChange={(e) => setText(e.target.value)}
          />
          </div>
        <div className='container' >
          <h2>Output</h2>
            <p>{selected}</p>
            <br /> 
            <b>{hash}</b>

          {hash? <FaClipboard style={{color:'#c260ff',cursor:'pointer',marginLeft:'5px'}} onClick={handleCopyClick}/>
          : ''  }  
        </div>
        </div>

  </div>
)
}

export default Hasher