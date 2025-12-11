"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/app/lib/auth/auth-client";

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        const res = await signUp.email({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        });

        if (res.error) {
            setError(res.error.message || "Something went wrong.");
        } else {
            router.push("/dashboard");
        }
    }

    return (
        <main className="max-w-md mx-auto p-6 space-y-4 text-white">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    minLength={8}
                    className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
                />
                <button
                    type="submit"
                    className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
                >
                    Create Account
                </button>
            </form>
            <div className="w-full">
                <div className="flex items-center my-4">
                    <div className="grow border-t border-neutral-700"></div>
                    <span className="mx-4 text-neutral-500 text-sm">OR</span>
                    <div className="grow border-t border-neutral-700"></div>
                </div>
                <button
                    onClick={async () => {
                        await signIn.social({
                            provider: "google",
                            callbackURL: "/dashboard",
                        });
                    }}
                    className="w-full bg-neutral-800 text-white font-medium rounded-md px-4 py-2 hover:bg-neutral-700 flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Sign up with Google
                </button>
            </div>

        </main>
    );
}