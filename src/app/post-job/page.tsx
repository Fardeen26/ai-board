"use client"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(10).max(1000),
    location: z.string().min(2).max(1000),
    salary: z.string().optional(),
    type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]),
    experience: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    company: z.string().min(2).max(100),
})


export default function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            salary: "",
            type: "FULL_TIME",
            experience: "",
            requirements: [],
            status: "ACTIVE",
            company: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.post("/api/job/post", values)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
        console.log(values)
    }
    return (
        <section className="mt-28 pb-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto border border-gray-200 p-8 rounded-2xl">
                    <h1 className="text-3xl font-bold text-center">Post a Job</h1>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter job title" {...field} className="bg-transparent" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter job description" {...field} className="bg-transparent" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter job location" {...field} className="bg-transparent" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Salary</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter salary range" {...field} className="bg-transparent" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter company name" {...field} className="bg-transparent" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-transparent">
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="FULL_TIME">Full Time</SelectItem>
                                        <SelectItem value="PART_TIME">Part Time</SelectItem>
                                        <SelectItem value="CONTRACT">Contract</SelectItem>
                                        <SelectItem value="INTERNSHIP">Internship</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Experience Required</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 2+ years" {...field} className="bg-transparent" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="requirements"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Requirements</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter job requirements (one per line)"
                                        className="bg-transparent min-h-[100px]"
                                        value={field.value?.join('\n') || ''}
                                        onChange={(e) => field.onChange(e.target.value.split('\n'))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-blue-600">Submit</Button>
                </form>
            </Form>
        </section>
    )
}