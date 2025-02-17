"use client";

import { useSession, signOut, signIn } from 'next-auth/react';
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const { data: session } = useSession();

    const handleAuth = () => {
        signIn('google', { callbackUrl: '/' })
    }
    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-black/50">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-kn1C5CDk5zUaYa4BHkG1FKUQupEsrm.png"
                            alt="Crop Studio"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                        <span className="font-medium text-white">AI Board</span>
                    </Link>
                </div>
                {
                    session ? (
                        <Button variant="secondary" className="bg-white text-black hover:bg-gray-100" onClick={handleAuth}>
                            Signin
                        </Button>
                    ) : (
                        <Button onClick={() => signOut()} variant="secondary" className="bg-white text-black hover:bg-gray-100">
                            Logout
                        </Button>
                    )
                }

            </div>
        </header>
    );
}