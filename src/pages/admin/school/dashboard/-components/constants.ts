import type { QueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import { logout } from "../utils";

export const dashboardLinkItems = [
	{
		icon: "mynaui:grid",
		label: "Dash Board",
		link: "/admin/school/dashboard",
	},
	{
		icon: "fluent:document-one-page-add-24-regular",
		label: "Register Class",
		link: "/admin/school/dashboard/register/class",
	},
	{
		icon: "fluent:document-one-page-add-24-regular",
		label: "Register Subjects",
		link: "/admin/school/dashboard/register/subject",
	},
	{
		icon: "streamline:user-add-plus",
		label: "Register Students",
		link: "/admin/school/dashboard/register/student",
	},
	{
		children: [
			{ label: "View all Students", link: "/admin/school/dashboard/students/view-all" },
			{ label: "View a Student", link: "/admin/school/dashboard/students/view-single" },
		],
		icon: "streamline:interface-edit-view-eye-eyeball-open-view",
		label: "View Student",
	},
	{
		icon: "solar:upload-minimalistic-linear",
		label: "Input Student Scores",
		link: "/admin/school/dashboard/students/input-scores",
	},
	{
		icon: "mage:logout",
		label: "Log out",
		link: (queryClient: QueryClient, navigate: NavigateFunction) => () => logout(queryClient, navigate),
	},
];
