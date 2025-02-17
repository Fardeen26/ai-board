"use client"

import Image from "next/image";

type Job = {
    id: number;
    title: string;
    companyName: string;
    companyLogo?: string;
    postedAt: Date;
    type: string;
    minSalary?: number;
    maxSalary?: number;
    minExperience?: number;
    maxExperience?: number;
    city: string;
    workMode: string;
    skills: string[];
    description: string;
};

export default function Page() {
    const jobs: Job[] = [
        {
            id: 1,
            title: "Frontend Developer",
            companyName: "Tech Corp",
            companyLogo: "https://placehold.co/200x200.png",
            postedAt: new Date(),
            type: "full-time",
            minSalary: 60000,
            maxSalary: 90000,
            minExperience: 2,
            maxExperience: 5,
            city: "San Francisco",
            workMode: "remote",
            skills: ["React", "JavaScript", "HTML", "CSS"],
            description: "We're looking for a skilled frontend developer to join our team."
        },
        {
            id: 2,
            title: "Backend Engineer",
            companyName: "Data Solutions",
            companyLogo: "https://placehold.co/200x200.png",
            postedAt: new Date(),
            type: "full-time",
            minSalary: 80000,
            maxSalary: 120000,
            minExperience: 3,
            maxExperience: 6,
            city: "New York",
            workMode: "hybrid",
            skills: ["Node.js", "Python", "AWS", "Docker"],
            description: "Join our backend team to build scalable systems."
        },
        {
            id: 3,
            title: "UI/UX Designer",
            companyName: "Creative Minds",
            companyLogo: "https://placehold.co/200x200.png",
            postedAt: new Date(),
            type: "contract",
            minSalary: 50000,
            maxSalary: 70000,
            minExperience: 1,
            maxExperience: 3,
            city: "Chicago",
            workMode: "onsite",
            skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
            description: "We need a creative designer to shape our user experiences."
        },
        {
            id: 4,
            title: "Data Scientist",
            companyName: "AI Innovations",
            companyLogo: "https://placehold.co/200x200.png",
            postedAt: new Date(),
            type: "full-time",
            minSalary: 90000,
            maxSalary: 130000,
            minExperience: 4,
            maxExperience: 7,
            city: "Austin",
            workMode: "remote",
            skills: ["Python", "Machine Learning", "Pandas", "TensorFlow"],
            description: "Help us build cutting-edge AI solutions."
        }
    ];

    const handleCardClick = (jobId: number) => {
        // Handle card click logic
        console.log('Clicked job:', jobId);
    };

    const formatSalary = (salary: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(salary);
    };

    return (
        <div className="text-white flex justify-center items-center flex-col gap-4 min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-4">Explore Jobs</h1>
            <p className="text-lg mb-8">Explore thousands of remote and onsite jobs that match your skills and aspirations.</p>
            <div className="w-full max-w-4xl space-y-6">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        onClick={() => handleCardClick(job.id)}
                        className="min-h-[200px] sm:text-sm text-xs text-slate-500 dark:text-slate-400 font-medium flex flex-col border p-6 bg-slate-100 gap-4 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                    >
                        <div className="flex w-full justify-between">
                            <div className="flex gap-3">
                                <div className="size-16 relative">
                                    {job.companyLogo && (
                                        <Image
                                            className="size-full object-contain"
                                            src={job.companyLogo}
                                            width={500}
                                            height={500}
                                            alt="company-logo"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-bold text-black dark:text-white text-xl">
                                        {job.title}
                                    </h2>
                                    <div className="flex">
                                        <p>{job.companyName + '.'} </p>
                                        <p className="ml-2">
                                            {'Posted on ' + job.postedAt.toDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <div className="p-2 bg-blue-100 dark:bg-blue-500 dark:bg-opacity-10 bg-opacity-90 text-blue-500 dark:text-blue-400 rounded">
                                {job.type}
                            </div>
                            <span className="flex items-center gap-0.5">
                                {job.minSalary && job.maxSalary ? (
                                    <span className="flex justify-start items-center gap-1 flex-nowrap bg-green-900/90 px-2 py-1 rounded-full text-white">
                                        {`${formatSalary(job.minSalary)}-${formatSalary(job.maxSalary)}`}
                                    </span>
                                ) : (
                                    'Not disclosed'
                                )}
                            </span>
                            <span className="flex items-center gap-0.5">
                                {job.minExperience && job.maxExperience ? (
                                    <span className="flex justify-start items-center gap-1 flex-nowrap">
                                        {`${job.minExperience}-${job.maxExperience} Yrs`}
                                    </span>
                                ) : (
                                    'Ex: Not disclosed'
                                )}
                            </span>
                            <span className="flex items-center gap-0.5">
                                {job.city} -
                                <span className="dark:bg-opacity-10 bg-opacity-90 text-blue-500 dark:text-blue-400 rounded capitalize">
                                    {job.workMode}
                                </span>
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 max-w-[70%]">
                            {job.skills.map((skill, index) => (
                                <div key={index} className="p-1 px-2 bg-gray-200 dark:bg-gray-700 rounded">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}