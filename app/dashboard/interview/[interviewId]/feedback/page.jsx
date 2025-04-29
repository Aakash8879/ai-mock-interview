"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { ChevronsUpDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  const params = useParams(); // ✅ Get params safely in client component

  useEffect(() => {
    if (params?.interviewId) {
      GetFeedback(params.interviewId);
    }
  }, [params?.interviewId]);

  const GetFeedback = async (interviewId) => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id, "desc"); // Get latest entries first
  
    const uniqueMap = new Map();
  
    for (const item of result) {
      if (!uniqueMap.has(item.question)) {
        uniqueMap.set(item.question, item);
      }
      if (uniqueMap.size >= 5) break; // Stop after 5 unique
    }
  
    const latestFiveUnique = Array.from(uniqueMap.values());
    setFeedbackList(latestFiveUnique);
  };
  

  const getOverallRating = () => {
    const validRatings = feedbackList
      .map((item) => parseFloat(item.rating))
      .filter((num) => !isNaN(num));

    if (validRatings.length === 0) return "N/A";

    const total = validRatings.reduce((sum, num) => sum + num, 0);
    const average = total / validRatings.length;
    return `${average.toFixed(1)}/10`;
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>

      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500 mt-6">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating: <strong>{getOverallRating()}</strong>
          </h2>
          <h2 className="text-sm text-gray-500 mb-4">
            Find below interview question with correct answer, your answer and feedback for improvement:
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-10 w-full">
                {item.question}
                <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating: </strong>{item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer: </strong>{item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer: </strong>{item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                    <strong>Feedback: </strong>{item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

      <Button onClick={() => router.replace("/dashboard")} className="mt-6">
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
