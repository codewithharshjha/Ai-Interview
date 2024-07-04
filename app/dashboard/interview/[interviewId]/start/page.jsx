"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function StartInterview({params}) {
    const[interviewData,setInterviewData]=useState()
    const[mockInterviewQuestion,setMockInterviewQuestion]=useState()
    const[activeQuestionIndex,setActiveQuestionIndex]=useState(0)
    useEffect(()=>{
GetInterviewDetail()
    },[])
    const GetInterviewDetail = async () => {
      try {
          const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        
          if (result.length > 0) {
              const jsonMockResp = JSON.parse(result[0].jsonMockResp);
             
              setMockInterviewQuestion(jsonMockResp);
              setInterviewData(result[0]);
          } else {
              console.error('No interview data found for interview ID:', params.interviewId);
              // Handle the case where no data is found, e.g., show a message to the user
          }
      } catch (error) {
          console.error('Error fetching interview data:', error);
          // Handle error, show a message to the user, retry logic, etc.
      }
  };

  return (
    <div>
   <div className=' grid grid-cols-1 md:grid-cols-2 gap-10'> 
   
    <QuestionSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>
    <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}/>
   </div>
   <div className='
    flex justify-end gap-6'>
        {activeQuestionIndex >0 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
    
        {activeQuestionIndex !=mockInterviewQuestion?.length-1 &&  <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
    {activeQuestionIndex==mockInterviewQuestion?.length-1 &&  
    <Link href={"/dashboard/interview/"+interviewData?.mockId+"/feedback"}>

    <Button>End Interview</Button>
    </Link>
    }
   
   </div>
    </div>
  )
}

export default StartInterview
