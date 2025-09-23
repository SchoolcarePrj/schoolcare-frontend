import type { InferProps } from "@zayne-labs/toolkit-react/utils";
import { isFile } from "@zayne-labs/toolkit-type-helpers";
import { toast } from "sonner";
import { cnMerge } from "@/lib/utils/cn";
import { DropZone } from "../ui/drop-zone";
import { IconBox } from "./IconBox";

type DropZoneInputProps = InferProps<typeof DropZone.Root> & {
	onChange: (file: File) => void;
};

export function DropZoneInput(props: DropZoneInputProps) {
	const { onChange, onFilesChange, onValidationError, onValidationSuccess, ...restOfProps } = props;

	const handleFileUpload: DropZoneInputProps["onFilesChange"] = (ctx) => {
		onFilesChange?.(ctx);

		if (!isFile(ctx.fileStateArray[0]?.file)) return;

		onChange(ctx.fileStateArray[0].file);
	};

	return (
		<DropZone.Root
			onFilesChange={handleFileUpload}
			onValidationSuccess={(ctx) => {
				toast.success("Success", { description: ctx.message });
				void onValidationSuccess?.(ctx);
			}}
			onValidationError={(ctx) => {
				toast.error("Error", { description: ctx.message });
				void onValidationError?.(ctx);
			}}
			{...restOfProps}
		/>
	);
}

type ImagePreviewProps = {
	classNames?: {
		image?: string;
		listContainer?: string;
		listItem?: string;
	};
};

export function DropZoneInputImagePreview(props: ImagePreviewProps) {
	const { classNames } = props;

	return (
		<DropZone.FileList
			className={cnMerge(
				`relative mt-[13px] max-h-[140px] divide-y divide-gray-600 overflow-y-auto overscroll-y-contain
				rounded-md border border-gray-600`,
				classNames?.listContainer
			)}
		>
			{(ctx) => (
				<DropZone.FileItem
					key={ctx.fileState.id}
					fileState={ctx.fileState}
					className={cnMerge("justify-between text-xs", classNames?.listItem)}
				>
					<DropZone.FileItemPreview
						className="h-[48px] gap-4 md:h-[66px]"
						renderPreview={{
							default: (
								<span className="block size-[40px]">
									<IconBox icon="solar:file-outline" className="size-full" />
								</span>
							),
							image: {
								props: {
									className: cnMerge("size-[50px] rounded-md", classNames?.image),
									fetchPriority: "high",
								},
							},
							text: {
								node: (
									<span className="block size-[40px]">
										<IconBox icon="solar:document-medicine-linear" className="size-full" />
									</span>
								),
							},
						}}
					/>

					<DropZone.FileItemMetadata />

					<DropZone.FileItemDelete>
						<IconBox icon="lucide:trash-2" className="size-[20px] text-red-600 active:scale-[1.1]" />
					</DropZone.FileItemDelete>
				</DropZone.FileItem>
			)}
		</DropZone.FileList>
	);
}
