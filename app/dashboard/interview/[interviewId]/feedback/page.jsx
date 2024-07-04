"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({params}) {
    const[feedbacklist,setFeedbacklist]=useState([])
    useEffect(()=>{
GetFeedback()
    },[])
    const GetFeedback=async()=>{
        const result=await db.select().from
        (UserAnswer).where(eq(UserAnswer.mockIdRef,params.interviewId)).orderBy(UserAnswer.id) 
        console.log(result)
        setFeedbacklist(result)

    }
    const router=useRouter()
  return (
    <div className=' p-10'>
    
        {feedbacklist?.length==0 ?<>
        <h2 className=' font-bold text-xl text-gray-400 '>No Interview Record Found</h2>
        </>:<>
        <h2 className=' text-3xl font-bold text-green-500'>Congratulation</h2>
        <h2 className=' font-bold text-2xl'>Here is your interview</h2>
        <h2 className=' text-primary text-lg  my-3'>Your overall rating <strong>7/10</strong></h2>
    <h2 className=' text-sm text-gray-500'>Find bellow interview question with correct answer ,Your answer and feedback for improvment</h2>
    {feedbacklist && feedbacklist.map((item,index)=>(
      <Collapsible key={index} className=' p-2 bg-secondary rounded-lg my-2 text-left  flex-col justify-between gap-7 w-full'>
  <CollapsibleTrigger>{item.question} <ChevronsUpDownIcon className=' h-5 w-5'/></CollapsibleTrigger>
  <CollapsibleContent>
  <div className=' flex flex-col gap-2'>
    <h2 className=' text-red-500 p-2 border rounded-lg'>
      <strong>Rating:{item.rating}</strong>
    </h2>
    <h2 className=' p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:{item.userAns}</strong></h2>
    <h2 className=' p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer:{item.correctAns}</strong></h2>
    <h2 className=' p-2 border rounded-lg bg-blue-50 text-sm text-primary-900'><strong>Feedback:{item.feedback}</strong></h2>
  </div>
  </CollapsibleContent>
</Collapsible>

    ))}
        </>}
     
    <Button onClick={()=>router.replace("/dashboard")}>Go Home</Button>
    </div>
  )
}

export default Feedback
