
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const[userAnswer,setUserAnswer]=useState('')
  const {user}=useUser()
  const [loading,setLoading]=useState(false)
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    timeout: 10000,
  });

  useEffect(()=>{
   
      
    results?.map((result,index) => {
       setUserAnswer((prevAns) => prevAns + result );
      
    });
    

  },[results])
  useEffect(()=>{
    if(!isRecording && userAnswer.length>10){
      UpdateUserAnswer()
    }

  },[userAnswer])
  const StartSopRecording=async()=>{

if(isRecording){
  stopSpeechToText()

 
   
  
}
else{
  startSpeechToText()
}
  }
  const UpdateUserAnswer=async()=>{
    setLoading(true)
    const feedbackPrompt='Question'+mockInterviewQuestion[activeQuestionIndex]?.question+", User Answer:"+userAnswer+",Depends on question and user answer for given interview question"+"please give us rating for answer and feedback as area of improvment if any"+"in just 3 to 5 lines to improve it in JSON format with rating field and feedback field"
    const result =await chatSession.sendMessage(feedbackPrompt)
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
      console.log(MockJsonResp)
      const JsonFeedBackResp=JSON.parse(MockJsonResp)
      const resp=await db.insert(UserAnswer).values({
        mockIdRef:interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns:userAnswer,
        feedback:JsonFeedBackResp?.rating,
        rating:JsonFeedBackResp?.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format("DD-MM-YY"),

        
      })
      if(resp){
        toast.success("User answer recorded successfully")
        setUserAnswer("")
     setResults([])

      }
      setResults([])
      setLoading(false)
  }


  return (
    <div className=' flex items-center justify-center flex-col'>
    <div className=' flex flex-col justify-center items-center  rounded-lg p-5 mt-20'>
        <Image src={"/webcamera.png"} width={200} height={200} alt='weblogo'className=' absolute'/>
<Webcam
style={{
  height:300,
  width:'100%',
  zIndex:10,

}}
mirrored={true}
/>
    </div>
 <Button variant="outline"className=" my-10" onClick={StartSopRecording} disabled={loading}>
      {isRecording ?<>
        <h2 className=' text-red-600 flex gap-2'><Mic/>{"Recording"}</h2>

      </>:" Record Answer"}
     </Button>
   {/* <Button onClick={()=>console.log(userAnswer)}>Show User Answer</Button>   */}

    </div>
  )
}

export default RecordAnswerSection
