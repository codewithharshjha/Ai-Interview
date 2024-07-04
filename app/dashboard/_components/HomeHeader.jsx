import React from 'react'
import { Button } from "@/components/ui/button";
import { CircleUserIcon } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from './ModeToggle';
import { SignIn, SignOutButton, SignUp } from '@clerk/nextjs';
import Link from 'next/link';
function HomeHeader() {
  return (
    <div className=" justify-between flex mt-2">
    <div className=" flex gap-2 items-center ml-5  ">
      <Image src={"/logo.svg"} width={50} height={50} alt="logo" className=" "/>
      <h2 className=" text-xl font-bold">Ai-Interview</h2>
    </div>
    <div className=" flex gap-2 items-center mr-4" >
      <Link href={"/sign-in"}>
  
      <Button className=" text-sm gap-2"><CircleUserIcon/>  SignIn</Button>   </Link>
   <Link href={"/sign-up"}>
   <Button className=" text-sm">SignUp</Button>
   </Link>
     
      <ModeToggle/>
    </div>
     </div>
  )
}

export default HomeHeader
