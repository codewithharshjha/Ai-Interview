import { Button } from "@/components/ui/button";
import { CircleUserIcon } from "lucide-react";
import Image from "next/image";
import HomeHeader from "./dashboard/_components/HomeHeader";

export default function Home() {
  return (
    <div>
 <HomeHeader/>

 <div className=" grid grid-cols-2  mt-4">
  <div className=" flex mt-20 gap-5 flex-col items-center ml-[-400px] md:ml-[50px]    ">
    <h1 className=" text-8xl">Build</h1>
    <h1 className=" text-8xl text-orange-700 ml-44">Carrier In</h1>
    <h1 className=" text-8xl text-violet-700 ml-64">Technology</h1>
    <p className=" text-orange-500 mt-10 ml-16">The next big thing start here.<br/> Get Prodify and be the first to market <br/>with an integrated product that you love</p>
    
  </div >
  <div className=" mr-20 w-30">
    <Image src={"/logo.svg"} height={10} width={1000} alt="interviewimg" className=" rounded-lg   "/>
  </div>
 </div>
   </div>
  );
}
