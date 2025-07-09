import React, { useContext } from 'react'
import './Main.css'
import { FaUser, FaCompass, FaLightbulb, FaCode, FaMicrophone   } from "react-icons/fa";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import { Context } from '../context/Context';
import { SiGooglegemini } from "react-icons/si";


const Main = () => {

    const {onSend,recentPrompt,showResult,Loading,resdata,setinputVal,inputVal}=useContext(Context)
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <FaUser/>
        </div>
        <div className="main-container">
            {!showResult
                ?<>
                    <div className="greet">
                        <p><span>Hello, Dev.</span></p>
                        <p>How can I help you today?</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Suggest some beautiful quotes...</p>
                            <FaCompass />
                        </div>
                        <div className="card">
                            <p>Briefly explain about Devanagari script</p>
                            <FaLightbulb  />
                        </div>
                        <div className="card">
                            <p>Explain about new Technologies in market...</p>
                            <FaCode  />
                        </div>
                        <div className="card">
                            <p>Explain about shadow effect in css</p>
                            <FaCompass />
                        </div>
                    </div>
                </>
                :
                <div className='result'>
                    <div className="result-title">
                       <FaUser id='icon'/>
                       <p>{recentPrompt} </p>
                    </div>
                    <div className="result-data">
                        <div>
                          <SiGooglegemini id='icon'/>  
                        </div>
                        
                        {Loading
                            ? 
                            <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :
                            <p dangerouslySetInnerHTML={{__html:resdata}}></p>
                        }
                        
                    </div>
                </div>            
            }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input value={inputVal} onChange={(e)=>setinputVal(e.target.value)} type="text" placeholder='Enter a prompt here...' />
                    <div>
                        <LuGalleryVerticalEnd/>
                        <FaMicrophone />
                        <IoMdSend onClick={()=>onSend()}/>
                    </div>                                  
                </div>
                <p className='bottom-info'>
                    This app may display inaccurate info, including about people, so double-check its responses.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main