import { useQuery } from "@tanstack/react-query";
import { usePageBlocker } from "@/lib/hooks";
import { sessionQuery } from "@/lib/react-query/queryOptions";
import { Outlet } from "react-router";

function AuthLayout() {
	const sessionQueryResult = useQuery(sessionQuery());

	usePageBlocker({
		condition: Boolean(sessionQueryResult.data),
		message: "You're already logged in! Redirecting to dashboard...",
		redirectPath: "/dashboard",
	});

	return <Outlet />;
}

export default AuthLayout;
