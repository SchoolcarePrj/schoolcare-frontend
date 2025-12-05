import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const usePageBlocker = (options: { condition: boolean; message: string; redirectPath: string }) => {
	const { condition, message, redirectPath } = options;

	const navigate = useNavigate();

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!condition) return;

			toast.error(message);
			void navigate(redirectPath, { replace: true });
		}, 300);

		return () => clearTimeout(timeout);
	}, [navigate, condition, message, redirectPath]);
};

export { usePageBlocker };
