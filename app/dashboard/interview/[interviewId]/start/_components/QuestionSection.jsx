import { LightbulbIcon, Volume2 } from "lucide-react";

function QuestionSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };

  return (
    <div className="p-5 border rounded-2xl my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion &&
          mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              onClick={() => setActiveQuestionIndex(index)}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer 
                ${
                  activeQuestionIndex === index
                    ? "bg-primary text-secondary"
                    : "bg-secondary"
                }`}
            >
              Question #{index + 1}
            </h2>
          ))}
      </div>

      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestion[activeQuestionIndex]?.Question}
      </h2>

      <Volume2
        onClick={() =>
          textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)
        }
        className="text-2xl text-gray-500 cursor-pointer"
      />

      <div className="bg-[#fcf7fed7] border border-grey-300 rounded-lg p-4 shadow-sm flex items-start gap-3 mt-5">
        <div className="mt-1 text-yellow-500">
          <LightbulbIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-yellow-800 mb-1">Information</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>NOTE:</strong> Click on "Record Answer" when you want to
            answer the question. At the end of the interview, we will provide
            you with feedback along with the correct answers to each question
            and your answers for comparison.
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuestionSection;
