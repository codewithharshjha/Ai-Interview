"use client"
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {
    const router=useRouter()
    const onStart=()=>{
        router.push("/dashboard/interview/"+interview?.mockId)
    }
    const onFeedBackPress=()=>{
        router.push("/dashboard/interview/"+interview?.mockId+"/feedback")
    }
  return (
    <div className=' border shadow-sm rounded-lg p-3 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
        <h2 className=' font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className=' text-sm text-gray-500'>{interview?.jobExperience}</h2>
        <h2 className=' text-xs text-gray-400'> Createad At:{interview?.createdAt}</h2>
<div className=' flex justify-between mt-2 gap-5'>

    <Button className=" w-full"size="sm" variant="outline"onClick={onFeedBackPress}>Feedback</Button>
 
 
    <Button size="sm" className="w-full bg-violet-600" onClick={onStart}>Start</Button>
</div>
      
    </div>
  )
}

export default InterviewItemCard
