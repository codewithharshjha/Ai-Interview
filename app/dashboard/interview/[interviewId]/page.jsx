"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";

function Interview({params}) {
    const[interviewData,setInterviewData]=useState()
    const [webcam, setWebcam] = useState(false)
    useEffect(()=>{

GetInterviewDetail()
    },[])
    const GetInterviewDetail=async()=>{
        const result =await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
        
      setInterviewData(result[0])
    }
  return (
    <div className=' my-10'>
     <h2 className=' font-bold text-2xl'>Lets Get Started</h2>
     <div className=' grid grid-cols-1 md:grid-cols-2 gap-10'>
     
     <div className=' flex flex-col my-5 gap-5  '>
        <div className=' flex flex-col gap-5 p-5 rounded-lg border'>

      
     <h2 className=' text-lg'> <strong>Job Role/Job Postion</strong> :{interviewData?.jobPosition}</h2> 
     <h2 className=' text-lg'> <strong>Job Description/Tech stack</strong> :{interviewData?.jobDesc}</h2> 
     <h2 className=' text-lg'> <strong>Years of experience</strong> :{interviewData?.jobExperience}</h2> 
     </div>
     <div className=' p-5 border rounded-lg border-y-yellow-300 bg-yellow-100'>
        
        <h2 className=' flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
        <h2 className=' mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
     </div>
   
     </div>
     <div>
        {
            webcam ?<Webcam audio={false} height={500} width={500} onUserMedia={()=>setWebcam(true)} onUserMediaError={()=>setWebcam(false)} mirrored={true}/> :
            <>
             <WebcamIcon className=' h-72 w-full my-7 p-20 bg-secondary border rounded-lg'/>
             <Button onClick={()=>setWebcam(true)} className="" variant="ghost">Enable web cam and microphone</Button>
            </>
           
      
        }
    
     </div>
     </div>
    <div className=' flex justify-end items-end'>
<Link href={"/dashboard/interview/"+params.interviewId+"/start"}>

     <Button className="" >Start Interview</Button>
</Link>
    </div>
    </div>
  )
}

export default Interview
