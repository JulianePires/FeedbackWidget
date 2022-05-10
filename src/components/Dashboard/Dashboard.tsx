import { SignOut } from "phosphor-react";
import React, { memo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Footer } from "../Footer/Footer";

const Dashboard: React.FC = () => {
  const { user, handleSignOut } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <header className="flex w-screen justify-between items-center h-14 px-10 bg-zinc-800">
        <h3 className="font-medium">FeedbackDashboard</h3>

        <span className="hidden md:flex">{`Olá, ${user?.displayName}! Aqui estão os seus feedbacks...`}</span>

        <span className="flex items-center gap-4 text-zinc-200">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-brand-500 rounded-md hover:bg-brand-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            <p>Logout</p>
            <SignOut weight="bold" />
          </button>
          <div className="items-center justify-center hidden rounded-full bg-zinc-200 text-brand-500 text-sm md:flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500">
            {user?.photoURL ? (
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <p>{user?.displayName.charAt(0)}</p>
            )}
          </div>
        </span>
      </header>

      <section className="p-4 flex flex-col">
        <div>Hello World!</div>
      </section>

      <Footer />
    </div>
  );
};

export const MemoDashboard = memo(Dashboard);
