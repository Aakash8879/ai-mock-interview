import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function InterviewItemCard({ interview }) {

    const router = useRouter();

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }

    const onFeedback=()=>{
        router.push("/dashboard/interview/"+interview?.mockId+"/feedback")
    }
  return (
    <div className="border shadow-md rounded-2xl p-5 bg-white hover:shadow-lg transition-shadow duration-300 text-center">
    <h2 className="font-semibold text-lg text-primary mb-1">
      {interview?.jobPosition}
    </h2>
    <p className="text-sm text-gray-600">
      {interview?.jobExperience} Years of Experience
    </p>
    <p className="text-xs text-gray-400 mb-4">
      Created At: {interview.createdAt}
    </p>

    <div className="flex flex-col gap-3">
      <Button size="sm" variant="outline" className="w-full" onClick={onFeedback}>
        Feedback
      </Button>
      <Button size="sm" className="w-full" onClick={onStart} >
        Start
      </Button>
    </div>
  </div>
  );
}

export default InterviewItemCard;
