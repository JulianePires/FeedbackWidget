import { ArrowLeft } from "phosphor-react";
import React, { FormEvent, memo, useState } from "react";
import { ScreenshotButton } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { FeedbackType, feedbackTypes } from "../WidgetForm";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

const FeedbackContentStep: React.FC<FeedbackContentStepProps> = ({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}) => {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const handleSubmitFeedback = async (event: FormEvent) => {
    event.preventDefault();

    setIsSendingFeedback(true);

    await api.post("/feedbacks", {
      type: feedbackType,
      comment,
      screenshot,
      email,
    });

    setIsSendingFeedback(false);

    onFeedbackSent();
  };

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <input
          placeholder="Informe seu e-mail..."
          className="w-full min-h-20 mb-2 text-sm placeholder-zinc-400 text-zinc-100 p-2 border-[1px] border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-2 focus:outline-none"
          onChange={({ target }) => setEmail(target.value)}
          required
        />

        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que est?? acontecendo..."
          onChange={({ target }) => setComment(target.value)}
          required
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            className="p-2 bg-brand-500 hover:bg-brand-300 rounded-md border-transparent flex-1 flex justify-center items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={
              (comment.length === 0 && email.length === 0) || isSendingFeedback
            }
          >
            {isSendingFeedback ? <Loading /> : "Enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  );
};

export const MemoContent = memo(FeedbackContentStep);
