import { create } from "zustand";
import { persist } from "zustand/middleware";

const stateObjectFn = () => ({
	studentClass: "",
	studentId: "",
});

export const useViewStudentFormStore = create(persist(stateObjectFn, { name: "viewStudentFormStore" }));
