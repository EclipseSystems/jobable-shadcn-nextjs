"use client"

import { useState } from "react";

import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Book, CircleAlert, CircleQuestionMark, ListCheck } from "lucide-react";

import { IconTTButton } from "../custom/icon-tt-button";
import { IssueForm } from "../modals/issue-form";
import { ProfileMenu } from "./profile-menu";
import { ThemeToggle } from "./theme-toggle";
import { Notifications } from "./notifications";

export default function Header() {
	const [showIssueForm, setShowIssueForm] = useState(false)

	return (
		<header className="flex bg-background border-b h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger variant="outline" className="max-md:scale-125 mr-1" />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-6"
				/>
				<ThemeToggle />
				<IconTTButton url="/dashboard/tasks" title="Tasks" Icon={ListCheck} />
				<Notifications/>
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Button size="icon" className="shadow-md" variant="outline"><CircleQuestionMark /></Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Support</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem><Book /> Help guide</DropdownMenuItem>
						<DropdownMenuItem onSelect={() => setShowIssueForm(true)}>
							<CircleAlert /> Report an issue
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<IssueForm open={showIssueForm} onOpenChange={() => setShowIssueForm(!showIssueForm)} />
				<ProfileMenu />
			</div>
		</header>
	);
}