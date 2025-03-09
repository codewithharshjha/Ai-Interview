"use client"
import { db } from '@/utils/db'

import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard'
import Loader from './Loader'
import { MockInterview } from '@/utils/schema'

function InterviewLists() {
    const{user}=useUser()
    const [interviewList, setInterviewList] = useState([])
    useEffect(()=>{
        GetInterviewist()
    },[user])
    const GetInterviewist=async()=>{
        const result=await db.select().from(MockInterview).where(eq(MockInterview?.createdBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterview.id))

setInterviewList(result)
    }
  return interviewList.length>0 ? (


   <>
    <div>
      <h2 className=' font-medium text-xl'>
        Previous Mock Interview List
      </h2>
      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        {interviewList ?interviewList.map((interview,index)=>(
        <InterviewItemCard key={index} interview={interview}/>
        )) :<> <h1>empty</h1></>}
     
      </div>
    </div>
   </>
  ):(
  <Loader/>
  )
}

export default InterviewLists
