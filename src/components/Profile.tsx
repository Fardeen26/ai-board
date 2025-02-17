"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link";


export default function Profile() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:border-none focus:outline-none">
                <Avatar className="max-sm:w-6 max-sm:h-6">
                    <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                    <AvatarFallback>AI</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <Link href=''>
                    <DropdownMenuItem>
                        Applications
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Jobs
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}