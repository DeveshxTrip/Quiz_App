import {data} from '../../src/assets/data';
import React, { useRef, useState } from 'react'
import Confetti from 'react-confetti'

const Quiz = () => {

    let [index,setIndex] = useState(0);
    let [question,setQuestion]=useState(data[index]);
    let [lock,setLock]=useState(false);
    let[score,setScore]=useState(0);
    let[result,setResult]=useState(false);

    let Option1=useRef(null);
    let Option2=useRef(null);
    let Option3=useRef(null);
    let Option4=useRef(null);

    let opt_array = [Option1,Option2,Option3,Option4];

    const checkAnswer =(e,ans)=>{
        if(lock===false){

        
        if(question.ans===ans){
            e.target.classList.add("correct");
            setLock(true);
            setScore(prev=>prev+1);
            
        }
        else{
            e.target.classList.add("wrong");
            setLock(true);
            opt_array[question.ans-1].current.classList.add("correct");
        }
    }
}
const next =()=>{
    if(lock===true){
        if(index=== data.length-1){
            setResult(true);
            return 0;
        }
        setIndex(++index);
        setQuestion(data[index]);
        setLock(false);
        opt_array.map((option)=>{
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
            return null;
            
        })
    }

}
const reset =()=>{
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);

}
  return (
    <div className='w-2/4 m-auto mt-20 bg-slate-300 text-slate-900 flex flex-col gap-5 rounded-2xl px-2 py-2'>
      <h1 className='m-auto flex pt-2 text-xl'>
        QUIZ WORLD
      </h1>
      <hr className='h-1 border-0 bg-slate-500'/>
      {result?<></>:<>
        <h2 className='text-xl font-medium'>{index+1}.{question.question}</h2>
      <ul>
        <li className='flex text-center h-10 pl-3.5 border-2 border-black rounded-lg mb-5 text-xl cursor-pointer'ref={Option1} onClick={(e)=>{checkAnswer(e,1)}}>{question.option1}</li>
        <li className='flex text-center h-10 pl-3.5 border-2 border-black rounded-lg mb-5 text-xl cursor-pointer'ref={Option2} onClick={(e)=>{checkAnswer(e,2)}}>{question.option2}</li>
        <li className='flex text-center h-10 pl-3.5 border-2 border-black rounded-lg mb-5 text-xl cursor-pointer'ref={Option3} onClick={(e)=>{checkAnswer(e,3)}}>{question.option3}</li>
        <li className='flex text-center h-10 pl-3.5 border-2 border-black rounded-lg mb-5 text-xl cursor-pointer'ref={Option4} onClick={(e)=>{checkAnswer(e,4)}}>{question.option4}</li>
      </ul>
      <h3 className='flex m-auto'>Your Score == {score}</h3>
      <hr className='h-1 border-0 bg-slate-500'/>
      <button onClick={next} type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Next</button>
      <div className='m-auto text-xl'>{index+1} of {data.length} questions</div>
      </>}
      {result?<><h2 className='m-auto'>You Scored {score} out of {data.length}</h2>
      <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"onClick={reset}>Reset</button>
      <Confetti/></>:<></>}
      
    </div>
  )
}

export default Quiz
