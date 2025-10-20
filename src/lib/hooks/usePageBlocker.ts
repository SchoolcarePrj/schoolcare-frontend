import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const usePageBlocker = (options: { condition: boolean; message: string; redirectPath: string }) => {
	const { condition, message, redirectPath } = options;

	const navigate = useNavigate();

	useEffect(() => {
		if (!condition) return;

		const timeout = setTimeout(() => {
			void navigate(redirectPath, { replace: true });
			toast.error(message);
		}, 100);

		return () => clearTimeout(timeout);
	}, [navigate, condition, message, redirectPath]);
};

export { usePageBlocker };
