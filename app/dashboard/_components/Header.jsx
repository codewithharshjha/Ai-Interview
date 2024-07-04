"use client"
import { SignOutButton, UserButton } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { ModeToggle } from './ModeToggle'
import { Button } from '@/components/ui/button'

function Header() {
    const path=usePathname()
    console.log(path)
   useEffect(()=>{
    console.log(path)
   },[])
  return (
    <div className=' flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={"/logo.svg"} width={50}height={50} alt='logo'/>
      <ul className=' hidden md:flex gap-6'>
        <Link href={"/dashboard"}>
        <li className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${path=="/dashboard" &&"text-primary font-bold"}`}>Dashboard</li>
        </Link>
        {/* <Link href={"/dashboard/question"}>
        <li  className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${path=="/dashboard/question" &&"text-primary font-bold"}`}>Questions</li>
        </Link> */}
        <Link href={"/dashboard/upgrade"}>
        <li  className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${path=="/dashboard/upgrade" &&"text-primary font-bold"}`}>Upgrade</li></Link>
        {/* <li  className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${path=="/dashboard/how" &&"text-primary font-bold"}`}>How it works</li> */}
      </ul>
      <div className=' flex items-center space-x-5'>

     
      <UserButton className=" "/>
      <ModeToggle />
     <Button>
      <SignOutButton/>
     </Button>
     </div>
    </div>
  )
}

export default Header
