import { Button } from "@/components/ui/button";
import { db } from "@/utils/db"; // Adjust path as needed
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Mic } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
};

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [chatSession, setChatSession] = useState(null);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    const session = model.startChat({ generationConfig, history: [] });
    setChatSession(session);
  }, []);

  useEffect(() => {
    if (isRecording) setUserAnswer("");
  }, [isRecording]);

  useEffect(() => {
    if (results.length > 0) {
      const fullTranscript = results.map((r) => r.transcript).join(" ");
      setUserAnswer(fullTranscript);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer.length < 10) {
        setLoading(false);
        toast.error("Error while saving answer. Please record again.");
        return;
      }

      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Based on the question and answer, provide a rating and a short feedback (3-5 lines) in JSON format with fields 'rating' and 'feedback'.`;

      try {
        if (chatSession) {
          const result = await chatSession.sendMessage(feedbackPrompt);
          const textResponse = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
          const cleanText = textResponse.replace("```json", "").replace("```", "").trim();
          const JsonFeedbackResp = JSON.parse(cleanText);

          toast.success("Answer saved successfully!");

          const resp = await db.insert(UserAnswer).values({
            mockIdRef: interviewData?.mockId,
            question: mockInterviewQuestion[activeQuestionIndex]?.Question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
            userAns: userAnswer,
            feedback: JsonFeedbackResp.feedback,
            rating: JsonFeedbackResp.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          });

          if (resp) {
            toast("User Answer recorded successfully");
          }
          setLoading(false);
        } else {
          toast.error("Chat session is not initialized.");
        }
      } catch (error) {
        console.error("Error parsing feedback:", error);
        toast.error("Failed to get feedback.");
      }
    } else {
      startSpeechToText();
      toast("Recording started...");
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Based on the question and answer, provide a rating and a short feedback (3-5 lines) in JSON format with fields 'rating' and 'feedback'.`;

    try {
      if (chatSession) {
        const result = await chatSession.sendMessage(feedbackPrompt);
        const textResponse = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const cleanText = textResponse.replace("```json", "").replace("```", "").trim();
        const JsonFeedbackResp = JSON.parse(cleanText);

        toast.success("Answer saved successfully!");

        const resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.Question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp.feedback,
          rating: JsonFeedbackResp.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        });

        if (resp) {
          toast("User Answer recorded successfully");
          setResults([]);
        }

        setUserAnswer("");
        setResults([]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during feedback update:", error);
      toast.error("Failed to get feedback.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="relative bg-gray-100 rounded-xl shadow-lg p-4 flex justify-center items-center w-full max-w-md">
        <Webcam
          audio={false} // ✅ Prevents echo from mic
          mirrored
          className="rounded-xl z-10"
          style={{ height: 300, width: "100%" }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="mt-8 px-6 py-2 text-sm font-medium flex items-center gap-2"
        onClick={StartStopRecording}
      >
        {isRecording ? <Mic className="animate-pulse" /> : "Record Answer"}
      </Button>

      {interimResult && (
        <p className="text-sm mt-4 text-gray-600 italic">Live: {interimResult}</p>
      )}

      {userAnswer && (
        <p className="mt-4 text-sm text-gray-700 text-center max-w-xl">
          <strong>Your Answer:</strong> {userAnswer}
        </p>
      )}
    </div>
  );
}

export default RecordAnswerSection;
