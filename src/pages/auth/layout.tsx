import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { usePageBlocker } from "@/lib/hooks";
import { sessionQuery } from "@/lib/react-query/queryOptions";

function AuthLayout() {
	// const sessionQueryResult = useQuery(sessionQuery());

	// usePageBlocker({
	// 	condition: Boolean(sessionQueryResult.data),
	// 	message: "You're already logged in! Redirecting to dashboard...",
	// 	redirectPath: "/admin/school/dashboard",
	// });

	return <Outlet />;
}

export default AuthLayout;
