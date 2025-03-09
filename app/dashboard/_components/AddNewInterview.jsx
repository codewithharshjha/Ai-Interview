"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { MockInterview } from "@/utils/schema";
import { useRouter } from "next/navigation";
function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();
  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const InputPrompt =
      "Job position: " +
      jobPosition +
      ",Job Description: " +
      jobDescription +
      ", JobExperience: " +
      jobExperience +
      ",Depends on Job Postion,Job Description & Years of Experience give us " +
      process.env.NEXT_PUBLIC_INTERVIEW_COUNT +
      "Interview question  with Answered in JSON format, Give Question and answer as field in JSON ";
    const result = await chatSession.sendMessage(InputPrompt);

    // console.log(result.response.text());
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
  

    setJsonResponse(MockJsonResp);
    if (MockJsonResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YY"),
        })
        .returning({
          mockId: MockInterview.mockId,
        });

      if (resp) {
        setOpenDailog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    } else {
      console.log("error");
    }

    setLoading(false);
  };
  return (
    <div>
      <div
        className=" p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="  text-lg">+Add New</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className=" text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription >
              <form action="" onSubmit={onSubmit}>
                <div>
                  <h2>Add Details about your job position/role</h2>
                  <div>
                    <label htmlFor="">Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full stack Develloper"
                      className=" mt-7 my-2"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Job Description/Tech Stack</label>
                    <Textarea
                      placeholder="React Next.js Sql"
                      required
                      onChange={(event) =>
                        setJobDescription(event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="">Years of Experience</label>
                    <Input
                      placeholder="4year"
                      type="number"
                      className=" mt-7 my-2"
                      required
                      max="50"
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className=" flex gap-5 justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => setOpenDailog(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                  {loading ? (
  <>
    <LoaderCircle className="animate-spin" />
    {'"Generating from AI"'}
  </>
) : (
  'Start interview'
)}

                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
