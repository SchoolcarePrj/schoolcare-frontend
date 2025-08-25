import type { AnyFunction } from "@zayne-labs/toolkit-type-helpers";
import { callBackendApi } from "@/lib/api/callBackendApi";
import { useQueryClientStore } from "@/store/react-query/queryClientStore";
import { sessionQuery } from "@/store/react-query/queryFactory";

export const dashboardLinkItems = [
	{
		icon: "mynaui:grid",
		label: "Dash Board",
		link: "/dashboard",
	},
	{
		icon: "fluent:document-one-page-add-24-regular",
		label: "Register Class",
		link: "/dashboard/register/class",
	},
	{
		icon: "fluent:document-one-page-add-24-regular",
		label: "Register Subjects",
		link: "/dashboard/register/subject",
	},
	{
		icon: "streamline:user-add-plus",
		label: "Register Students",
		link: "/dashboard/register/student",
	},
	{
		icon: "streamline:interface-edit-view-eye-eyeball-open-view",
		items: [
			{ label: "View all Students", link: "/dashboard/students/view-all" },
			{ label: "View a Student", link: "/dashboard/students/view-single" },
		],
		label: "View Student",
		link: null,
	},
	{
		icon: "solar:upload-minimalistic-linear",
		label: "Input Student Scores",
		link: "/dashboard/students/input-scores",
	},
	{
		icon: "mage:logout",
		label: "Log out",
		link: (navigate: AnyFunction) => {
			const refreshToken = localStorage.getItem("refreshToken");
			return () => {
				void callBackendApi("/logout", {
					body: { refresh: refreshToken },
					meta: { toast: { success: true } },
					method: "POST",

					onSuccess: () => {
						useQueryClientStore
							.getState()
							.queryClient.removeQueries({ queryKey: sessionQuery().queryKey });

						localStorage.removeItem("accessToken");
						localStorage.removeItem("refreshToken");

						navigate("/");
					},
				});
			};
		},
	},
];
