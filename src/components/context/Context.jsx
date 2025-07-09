import {createContext, useState} from 'react'
import run from '../config/gemini';

export const Context=createContext();

const ContextProvider =(props)=>{

    const [inputVal,setinputVal]=useState('');//input
    const [recentPrompt,setRecentPrompt]=useState('')//on clicking send button input goes to main component
    const [prevPrompts,setPrevPrompts]=useState([])//store ip history and show in sidebar
    const [showResult,setShowResult]=useState(false)//to hide cards in main
    const [Loading,setLoading]=useState(false)//
    const [resdata,setResdata]=useState("")

    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
            setResdata(prev=>prev+nextWord)
        },75*index)
    }
    const onSend=async(prompt)=>{

        setResdata("");
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt!==undefined){
            response=await run(prompt)
            setRecentPrompt(prompt)
        }else{
            setPrevPrompts(prev=>[...prev,inputVal])
            setRecentPrompt(inputVal)
            response=await run(inputVal)
        }     

        // const response= await run(inputVal);
        let responseArray=response.split("**")
        let newResponse="";
        for(let i=0;i<responseArray.length;i++){
            if(i===0 ||i%2!==1){
                newResponse+=responseArray[i]
            }else{
                newResponse+="<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2=newResponse.split('*').join("</br>")
        let newResArray=newResponse2.split(" ");
        for(let i=0;i<newResArray.length;i++){
            const nextWord=newResArray[i]
            delayPara(i,nextWord+' ')
        }
        // setResdata(newResponse2);
        setLoading(false);
        setinputVal("")

    }
    

    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSend,
        setRecentPrompt,
        recentPrompt,
        showResult,
        Loading,
        resdata,
        inputVal,
        setinputVal
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children }
        </Context.Provider>
    )
}

export default ContextProvider