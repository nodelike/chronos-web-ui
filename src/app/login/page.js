"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, verify, setToken } from "@/services/auth";
import ThemeToggle from "@/components/ThemeToggle";
import { EnvelopeIcon, LockClosedIcon, ShieldCheckIcon, EyeIcon, EyeSlashIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [bannerImage, setBannerImage] = useState("/images/onboarding-1.jpg");
    const [showPassword, setShowPassword] = useState(false);

    const [requiresVerification, setRequiresVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationEmail, setVerificationEmail] = useState("");

    useEffect(() => {
        const images = ["/images/onboarding-1.jpg", "/images/onboarding-2.jpg"];
        setBannerImage(images[Math.floor(Math.random() * images.length)]);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await login(email, password);
            const { data } = response;

            if (data.requiresVerification) {
                setRequiresVerification(true);
                setVerificationEmail(data.email);
            } else {
                setToken(data.token);
                router.push("/app");
            }
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await verify(verificationEmail, verificationCode);
            const { data } = response;

            setToken(data.token);
            router.push("/app");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during verification");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center relative">
            <div className="absolute top-4 right-4 z-10">
                <ThemeToggle />
            </div>
            <div className="hidden md:block md:w-1/2 h-full relative">
                <img src={bannerImage} alt="onboarding-banner" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
                    <div className="text-white max-w-md px-12">
                        <h1 className="text-4xl font-bold mb-4">Welcome back</h1>
                        <p className="text-lg text-white/80">Access your productivity dashboard and continue your journey</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 h-full flex items-center justify-center p-6 relative">
                <div className="w-full max-w-md space-y-8 rounded-xl border border-chBorder p-8 shadow-lg bg-chBgSecondary transition-all duration-300 hover:shadow-xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-chTextPrimary mb-2">{requiresVerification ? "Verify Account" : "Welcome Back"}</h2>
                        <p className="mt-2 text-chTextSecondary">
                            {requiresVerification ? "Enter the verification code sent to your email" : "Sign in to access your account"}
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200 flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {requiresVerification ? (
                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="flex items-center justify-center mb-4 bg-gray-50 rounded-md py-2 px-4 border border-chBorder">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                                <span className="text-chTextPrimary text-sm font-medium truncate flex-1">{verificationEmail}</span>
                                <button
                                    type="button"
                                    onClick={() => setRequiresVerification(false)}
                                    className="ml-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                                    title="Edit email">
                                    <PencilIcon className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="verification-code" className="block text-sm font-medium text-chTextPrimary">
                                    Verification Code
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="verification-code"
                                        name="verification-code"
                                        type="text"
                                        required
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        className="pl-10 mt-1 block w-full rounded-md border border-chBorder px-3 py-3 shadow-sm focus:border-ctaPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary bg-chBgPrimary text-chTextPrimary"
                                        placeholder="Enter 6-digit code"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-md bg-ctaPrimary px-4 py-3 text-white font-medium transition-all duration-200 hover:bg-opacity-90 disabled:opacity-50 shadow-md hover:shadow-lg">
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Verifying...
                                    </span>
                                ) : (
                                    "Verify Account"
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-chTextPrimary">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 mt-1 block w-full rounded-md border border-chBorder px-3 py-3 shadow-sm focus:border-ctaPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary bg-chBgPrimary text-chTextPrimary"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-chTextPrimary">
                                        Password
                                    </label>
                                    <a href="#" className="text-sm font-medium text-ctaPrimary hover:text-opacity-80">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 mt-1 block w-full rounded-md border border-chBorder px-3 py-3 shadow-sm focus:border-ctaPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary bg-chBgPrimary text-chTextPrimary"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none">
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                        )}
                                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-md bg-ctaPrimary px-4 py-3 text-white font-medium transition-all duration-200 hover:bg-opacity-90 disabled:opacity-50 shadow-md hover:shadow-lg">
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign In/Up"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
