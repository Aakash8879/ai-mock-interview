"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { LightbulbIcon, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";


function Interview() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    if (params?.interviewId) {
      console.log("Interview ID:", params.interviewId);
      GetInterviewDetails();
    }
  }, [params?.interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result?.[0]);
  };

  return (
    <div className="my-10 px-4 md:px-20 flex flex-col ">
      <h2 className="font-bold text-3xl mb-10 ">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">

        {/* Left Column: Info & Lightbulb Box */}
        <div className="flex flex-col gap-6">
          {/* Job Info Box */}
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 border">
            <h2 className="text-xl font-semibold">
              <strong>Job Role: </strong>{interviewData?.jobPosition || "N/A"}
            </h2>
            <h2 className="text-xl font-semibold">
              <strong>Tech Stack: </strong>{interviewData?.jobDesc || "N/A"}
            </h2>
            <h2 className="text-xl font-semibold">
              <strong>Years of Experience: </strong>{interviewData?.jobExperience || "N/A"}
            </h2>
          </div>

          {/* Lightbulb Info Box */}
          <div className="bg-[#fffbea] border border-yellow-300 rounded-lg p-4 shadow-sm flex items-start gap-3">
            <div className="mt-1 text-yellow-500">
              <LightbulbIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Information</h3>
              <p className="text-sm text-yellow-700 leading-relaxed">
                Enable Video Web Cam and Microphone to start your AI-generated mock interview.
                It has 5 questions you can answer, and at the end, you'll get a report based on your answers.
                <br />
                <strong>NOTE:</strong> We never record your video. Webcam access can be disabled anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Webcam */}
        <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-6">
          {webCamEnabled ? (
            <Webcam
              audio={true}
              style={{ height: 300, width: 300, borderRadius: "0.75rem" }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
            />
          ) : (
            <div className="flex flex-col items-center">
              <WebcamIcon className="h-40 w-40 my-6 text-gray-400" />
              <Button variant= "ghost" onClick={() => setWebCamEnabled(true)}>Enable Webcam and Micro</Button>
            </div>
          )}
        </div>
      </div>
      import Link from "next/link";

<div className="flex justify-end mt-6">
  <Link href={`/dashboard/interview/${params.interviewId}/start`}>
    <Button>Start interview</Button>
  </Link>
</div>

    </div>
  );
}

export default Interview;
