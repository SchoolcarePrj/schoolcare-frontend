import { cnMerge } from "@/lib/utils/cn";
import { createCustomContext, useCallbackRef, useToggle } from "@zayne-labs/toolkit-react";
import type { DiscriminatedRenderProps, InferProps } from "@zayne-labs/toolkit-react/utils";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useMemo } from "react";
import { IconBox } from "../common";

type ContextValue = {
	onClose: () => void;
	onOpen: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
};

const [DialogStateContextProvider, useDialogStateContext] = createCustomContext<ContextValue>();

function DialogRoot(props: InferProps<typeof DialogPrimitive.Root>) {
	const [openState, toggleOpen] = useToggle(false);
	// eslint-disable-next-line ts-eslint/unbound-method
	const { onOpenChange, open, ...restOfProps } = props;

	const selectedOpen = open ?? openState;
	const selectedOnOpenChange = open ? onOpenChange : toggleOpen;

	const setOpen = useCallbackRef((value: boolean) => selectedOnOpenChange?.(value));
	const onClose = useCallbackRef(() => setOpen(false));
	const onOpen = useCallbackRef(() => setOpen(true));

	const contextValue = useMemo(
		() =>
			({
				onClose,
				onOpen,
				open: selectedOpen,
				setOpen,
			}) satisfies ContextValue,
		[onClose, onOpen, selectedOpen, setOpen]
	);

	return (
		<DialogStateContextProvider value={contextValue}>
			<DialogPrimitive.Root {...restOfProps} open={selectedOpen} onOpenChange={selectedOnOpenChange} />
		</DialogStateContextProvider>
	);
}

type RenderFn = (props: ContextValue) => React.ReactNode;

function DialogContext(props: DiscriminatedRenderProps<RenderFn>) {
	const { children, render } = props;
	const dialogCtx = useDialogStateContext();

	if (typeof children === "function") {
		return children(dialogCtx);
	}

	return render(dialogCtx);
}

function DialogOverlay(props: InferProps<typeof DialogPrimitive.Overlay>) {
	const { className, ...restOfProps } = props;

	return (
		<DialogPrimitive.Overlay
			className={cnMerge(
				`fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0
				data-[state=open]:animate-in data-[state=open]:fade-in-0`,
				className
			)}
			{...restOfProps}
		/>
	);
}

function DialogContent(props: InferProps<typeof DialogPrimitive.Content> & { withCloseButton?: boolean }) {
	const { children, className, withCloseButton = true, ...restOfProps } = props;

	return (
		<DialogPrimitive.Portal>
			<DialogOverlay />

			<DialogPrimitive.Content
				className={cnMerge(
					`fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-1/2 gap-4 border
					bg-shadcn-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out
					data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
					data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
					data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
					data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
					sm:rounded-lg`,
					className
				)}
				{...restOfProps}
			>
				{children}

				{withCloseButton && (
					<DialogPrimitive.Close
						className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-shadcn-background
							transition-opacity hover:opacity-100 focus:ring-2 focus:ring-shadcn-ring
							focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none
							data-[state=open]:bg-shadcn-accent data-[state=open]:text-shadcn-muted-foreground"
					>
						<IconBox icon="lucide:x" className="size-4" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
}

function DialogHeader(props: InferProps<"div">) {
	const { className, ...restOfProps } = props;

	return (
		<div
			className={cnMerge("flex flex-col gap-1.5 text-center sm:text-left", className)}
			{...restOfProps}
		/>
	);
}

function DialogFooter(props: InferProps<"div">) {
	const { className, ...restOfProps } = props;

	return <div className={cnMerge("flex flex-col", className)} {...restOfProps} />;
}

function DialogTitle(props: InferProps<typeof DialogPrimitive.Title>) {
	const { className, ...restOfProps } = props;

	return (
		<DialogPrimitive.Title
			className={cnMerge("text-lg leading-none font-semibold tracking-tight", className)}
			{...restOfProps}
		/>
	);
}

function DialogDescription(props: InferProps<typeof DialogPrimitive.Description>) {
	const { className, ...restOfProps } = props;

	return (
		<DialogPrimitive.Description
			className={cnMerge("text-sm text-shadcn-muted-foreground", className)}
			{...restOfProps}
		/>
	);
}

export const Root = DialogRoot;

export const Context = DialogContext;

export const Close = DialogPrimitive.Close;

export const Content = DialogContent;

export const Description = DialogDescription;

export const Footer = DialogFooter;

export const Header = DialogHeader;

export const Overlay = DialogOverlay;

export const Portal = DialogPrimitive.Portal;

export const Title = DialogTitle;

export const Trigger = DialogPrimitive.Trigger;

// eslint-disable-next-line react-refresh/only-export-components
export { useDialogStateContext };
