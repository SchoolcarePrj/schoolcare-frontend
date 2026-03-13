import { on } from "@zayne-labs/toolkit-core";

// NOTE - Preloader Removal
// NOTE - Preloader Removal
const removePreloader = () => {
	const preloaderElement = document.querySelector<HTMLElement>("#preloader");

	if (!preloaderElement) return;

	preloaderElement.style.opacity = "0";

	on(preloaderElement, "transitionend", () => {
		preloaderElement.remove();
	});
};

on(document, "DOMContentLoaded", removePreloader);
