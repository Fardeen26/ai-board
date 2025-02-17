import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { InteractiveGridPattern } from "./ui/interactive-grid-pattern"
import { ShineBorder } from "./ui/shine-border"
import Image from "next/image"
import google from '/public/google.svg'
import adobe from '/public/adobe.svg'
import atlassian from '/public/atlassian.svg'
import framer from '/public/framer.svg'
import medium from '/public/medium.svg'
import coinbase from '/public/coinbase.svg'
import Link from "next/link"

export function HeroSection() {
    return (
        <section className="relative min-h-screen pt-32 pb-16 overflow-hidden bg-black">
            <InteractiveGridPattern className="absolute inset-0 opacity-30" points={'40'} />

            <ShineBorder
                className="bg-black text-white relative z-10 max-w-6xl mx-auto px-6 border border-white/10 rounded-xl overflow-hidden"
            >
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Protect Your Privacy, Share What
                        <br />
                        Matters
                    </h1>
                    <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                        Easily crop out sensitive information on your screen during work calls. Keep your focus on what you want to
                        share while maintaining full control over your privacy.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button variant="outline" className="gap-2 border-white/10 bg-white/5 hover:bg-white/10">
                            <Play className="w-4 h-4" />
                            Explore Jobs
                        </Button>
                        <Link href={'/analyze-resume'}>
                            <Button variant="secondary" className="bg-white text-black hover:bg-gray-100">
                                Analyze Resume
                            </Button>
                        </Link>
                    </div>
                </div>
            </ShineBorder>

            <div className="flex flex-col items-center my-5 mt-20">
                <p className="border border-[#4E7AFF] rounded-lg bg-opacity-10 py-1 px-3 text-[#4E7AFF] text-xs w-fit font-medium">
                    Trusted By Leading Companies
                </p>
                <div className="grid md:grid-cols-6 grid-cols-2 items-center gap-1 md:mt-0 mt-4 dark:bg-[#02081766]">
                    {trustedCompanies.map((company, i) => (
                        <Image
                            key={i}
                            className="mx-4 md:w-28 w-24 h-20 md:h-24"
                            src={company.icon}
                            alt={`${company.name}-icon`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

const trustedCompanies = [
    {
        icon: adobe,
        name: 'adobe',
    },
    {
        icon: atlassian,
        name: 'atlassian',
    },
    {
        icon: medium,
        name: 'medium',
    },
    {
        icon: coinbase,
        name: 'coinbase',
    },
    {
        icon: framer,
        name: 'framer',
    },
    {
        icon: google,
        name: 'google',
    },
];
