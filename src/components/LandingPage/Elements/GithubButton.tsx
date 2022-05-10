import { GithubLogo } from "phosphor-react";
import React, { memo } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Loading } from "../../Loading";

const GithubButton: React.FC = () => {
  const { handleSignIn, authenticated, isAuthenticating } = useAuth();

  return (
    <div>
      <button
        type="button"
        className="flex items-center gap-2 border-transparent hover:bg-zinc-400 transition-colors bg-slate-100 text-zinc-900 font-medium p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
        onClick={handleSignIn}
        disabled={authenticated}
      >
        {isAuthenticating ? (
          <Loading />
        ) : (
          <>
            <GithubLogo weight="fill" />
            <p>Entre com o Github</p>
          </>
        )}
      </button>
    </div>
  );
};

export const MemoGithubButton = memo(GithubButton);
