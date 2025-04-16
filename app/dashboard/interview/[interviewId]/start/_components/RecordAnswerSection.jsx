"use client";

import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnswerSection() {
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Reset answer when new recording starts
  useEffect(() => {
    if (isRecording) setUserAnswer("");
  }, [isRecording]);

  // Combine transcript results into a single answer
  useEffect(() => {
    if (results.length > 0) {
      const fullTranscript = results.map((r) => r.transcript).join(" ");
      setUserAnswer(fullTranscript);
    }
  }, [results]);

  const SaveUserAnswer = () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer?.length < 10) {
        toast.error("Error while saving answer. Please record again.");
        return;
      }

      // You can handle saving to backend here
      toast.success("Answer saved successfully!");
    } else {
      startSpeechToText();
      toast("Recording started...");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      {/* Webcam Section */}
      <div className="relative bg-gray-100 rounded-xl shadow-lg p-4 flex justify-center items-center w-full max-w-md">
        <Image
          src="/webcam.png"
          width={200}
          height={200}
          alt="Webcam Overlay"
          className="absolute opacity-20"
        />
        <Webcam
          audio
          mirrored
          className="rounded-xl z-10"
          style={{ height: 300, width: "100%" }}
        />
      </div>

      {/* Record/Stop Button */}
      <Button
        variant="outline"
        className="mt-8 px-6 py-2 text-sm font-medium flex items-center gap-2"
        onClick={SaveUserAnswer}
      >
        {isRecording ? <Mic className="animate-pulse" /> : "Record Answer"}
      </Button>

      {/* Show Answer Button (for debug) */}
      <Button className="mt-4" onClick={() => console.log(userAnswer)}>
        Show Answer in Console
      </Button>

      {/* Display Live Interim Text */}
      {interimResult && (
        <p className="text-sm mt-4 text-gray-600 italic">
          Live: {interimResult}
        </p>
      )}

      {/* Display Final Answer */}
      {userAnswer && (
        <p className="mt-4 text-sm text-gray-700 text-center max-w-xl">
          <strong>Your Answer:</strong> {userAnswer}
        </p>
      )}
    </div>
  );
}

export default RecordAnswerSection;
