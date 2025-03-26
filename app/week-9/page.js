"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Home() {
    const {user, gitHubSignIn, firebaseSignOut} = useUserAuth();

    const handleLogin = async () => {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await firebaseSignOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
    <main className="p-4">
      {!user ? (
        <div>
          <h1 className="text-xl font-bold mb-4">Shopping List App</h1>
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign in with GitHub
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-2">
            Welcome, <strong>{user.displayName}</strong> ({user.email})
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded mb-4"
          >
            Sign out
          </button>
          <br />
          <Link href="/week-9/shopping-list">
            <span className="text-blue-600 underline">Go to Shopping List</span>
          </Link>
        </div>
      )}
    </main>
  );
}