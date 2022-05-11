import React, { memo } from "react";
import { FeedbackType, feedbackTypes } from "../../WidgetForm/WidgetForm";

interface FeedbackProps {
  type: string;
  content: string;
  screenshot?: string;
}

const Feedback: React.FC<FeedbackProps> = ({ content, type, screenshot }) => {
  const feedbackTypeInfo = feedbackTypes[type as FeedbackType];
  return (
    <div className="w-[200px] h-[200px] bg-zinc-800 p-4 rounded-md flex flex-col items-center justify-between">
      {screenshot && <img src={screenshot} alt="Feedback screenshot" className="max-h-20"/>}
      <p>{content}</p>
      <span className="text-xl leading-6 flex items-center gap-2">
        <img
          src={feedbackTypeInfo.image.source}
          alt={feedbackTypeInfo.image.alt}
          className="w-6 h-6"
        />
        {feedbackTypeInfo.title}
      </span>
    </div>
  );
};

export const MemoFeedback = memo(Feedback);
