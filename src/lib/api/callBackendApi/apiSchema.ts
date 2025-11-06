import { fallBackRouteSchemaKey } from "@zayne-labs/callapi/constants";
import { defineSchema } from "@zayne-labs/callapi/utils";
import { z } from "zod";

const BaseSuccessResponseSchema = z.object({
	data: z.record(z.string(), z.unknown()),
	message: z.string(),
	status: z.literal("success"),
});

const BaseErrorResponseSchema = z.object({
	errors: z.record(z.string(), z.string()).nullable(),
	message: z.string(),
	status: z.literal("error"),
});

export type BaseApiSuccessResponse = z.infer<typeof BaseSuccessResponseSchema>;

export type BaseApiErrorResponse = z.infer<typeof BaseErrorResponseSchema>;

const withBaseSuccessResponse = <TSchemaObject extends z.ZodType>(dataSchema: TSchemaObject) =>
	z.object({
		...BaseSuccessResponseSchema.shape,
		data: dataSchema,
	});

// eslint-disable-next-line ts-eslint/no-unused-vars
const withBaseErrorResponse = <
	TSchemaObject extends z.ZodType = typeof BaseErrorResponseSchema.shape.errors,
>(
	errorSchema?: TSchemaObject
) =>
	z.object({
		...BaseErrorResponseSchema.shape,
		errors: (errorSchema ?? BaseErrorResponseSchema.shape.errors) as NonNullable<TSchemaObject>,
	});

const StudentDataSchema = z.object({
	gender: z.string(),
	id: z.number(),
	name: z.string(),
	registration_number: z.string(),
	school_class: z.string(),
});

const SchoolClassDataSchema = z.object({
	grade: z.string(),
	school_class: z.string(),
});

const SchoolDetailsDataSchema = z.object({
	address: z.string(),
	city: z.string(),
	email: z.email(),
	is_active: z.boolean(),
	local_govt: z.string(),
	logo: z.url(),
	name: z.string(),
	nationality: z.string(),
	postal_code: z.number(),
	school_ID: z.string(),
	signature: z.string(),
	state: z.string(),
});

const ResultDataSchema = z.object({
	class_session_term: z.string(),
	exam: z.number(),
	first_ca: z.number(),
	grade: z.string(),
	remark: z.string(),
	second_ca: z.number(),
	student: z.string(),
	subject: z.string(),
	total: z.number(),
});

export const PersonalInfoBodySchema = z.object({
	email: z.email("Please enter a valid email!"),
	logo: z.file("Please upload a logo!"),
	name: z.string().min(1, "Name is required").max(50, "Name is too long"),
});

export const AddressBodySchema = z.object({
	address: z.string().min(1, "Address is required"),
	local_govt: z.string().min(1, "LGA is required"),
	nationality: z.string().min(1, "Nationality is required"),
	postal_code: z
		.string()
		.min(1, "Postal code is required")
		.min(6, "Postal code must be at least 6 digits"),
	state: z.string().min(1, "State is required"),
});

export const UploadResultBodySchema = z.object({
	class_session_term: z.string(),
	file: z.file("File is required"),
	subject: z.string().min(1, "Subject is required"),
});

export const apiSchema = defineSchema(
	{
		/* eslint-disable perfectionist/sort-objects */
		[fallBackRouteSchemaKey]: {
			errorData: (data) => data as BaseApiErrorResponse,
		},

		"@delete/school/classes/:id": {},
		/* eslint-enable perfectionist/sort-objects */

		"@delete/school/students/:id": {},

		"@get/check-user-session": {
			data: withBaseSuccessResponse(
				z.object({
					email: z.string(),
					logo: z.string(),
					school: z.string(),
				})
			),
		},

		"@get/main-class": {
			data: withBaseSuccessResponse(z.array(z.string())),
		},

		"@get/main-subject": {
			data: withBaseSuccessResponse(z.array(z.string())),
		},

		"@get/school/classes": {
			data: withBaseSuccessResponse(z.array(SchoolClassDataSchema)),
		},

		"@get/school/classes/:id": {
			data: withBaseSuccessResponse(SchoolClassDataSchema),
		},

		"@get/school/results": {
			data: withBaseSuccessResponse(z.array(ResultDataSchema)),
		},

		"@get/school/results/list-results": {
			data: withBaseSuccessResponse(z.array(ResultDataSchema)),
			query: z.object({
				class: z.string(),
				session: z.string(),
				subject: z.string(),
				term: z.string(),
			}),
		},

		"@get/school/students": {
			data: withBaseSuccessResponse(
				z.array(StudentDataSchema.pick({ gender: true, name: true, school_class: true }))
			),
		},

		"@get/school/students/:id": {
			data: withBaseSuccessResponse(StudentDataSchema),
		},

		"@get/school/students/class-students": {
			data: withBaseSuccessResponse(
				z.object({
					students: z.array(
						StudentDataSchema.pick({ gender: true, name: true, registration_number: true })
					),
				})
			),
			query: z.object({ class: z.string() }),
		},

		"@get/school/students/students-by-gender": {
			data: withBaseSuccessResponse(z.object({ female: z.number(), male: z.number() })),
		},

		"@get/school/students/students-by-reg-number": {
			data: withBaseSuccessResponse(
				StudentDataSchema.pick({ gender: true, name: true, registration_number: true })
			),
			query: z.object({ reg: z.string() }),
		},

		"@get/school/subjects": {
			data: withBaseSuccessResponse(z.array(z.object({ subject: z.string() }))),
		},

		"@get/session": {
			data: withBaseSuccessResponse(z.array(z.string())),
		},

		"@get/term": {
			data: withBaseSuccessResponse(z.array(z.string())),
		},

		"@post/check-result": {
			body: z.object({
				class_grade: z.string().min(1, "Grade level is required"),
				school_class: z.string().min(1, "Class is required"),
				school_ID: z.string().min(1, "School ID is required"),
				scratch_card_code: z.string().min(1, "Scratch card code is required"),
				serial_number: z.string().min(1, "Serial number is required"),
				session: z.string("Session is required"),
				student_reg_number: z.string().min(1, "Reg number is required"),
				term: z.string("Term is required"),
			}),
			data: withBaseSuccessResponse(
				z.object({
					average: z.number(),
					class_session_term: z.string(),
					class_students_count: z.number(),
					comment: z.string(),
					gender: z.string(),
					logo: z.string(),
					position: z.number(),
					results: z.array(ResultDataSchema),
					school: z.string(),
					school_address: z.string(),
					school_email: z.string(),
					student_name: z.string(),
					student_reg_number: z.string(),
					subject_count: z.number(),
					total_score: z.number(),
					use_count: z.number(),
				})
			),
		},

		"@post/login": {
			body: z.object({
				email: z.email("Please enter a valid email!"),
				password: z.string().min(1, "Password is required"),
			}),
			data: withBaseSuccessResponse(
				z.object({
					access: z.string(),
					email: z.email(),
					logo: z.string(),
					refresh: z.string(),
					school: z.string(),
				})
			),
		},

		"@post/logout": {
			body: z.object({ refresh: z.string() }),
		},

		"@post/school/admin/register": {
			body: z.object({
				email: z.email("Please enter a valid email!"),
				password: z
					.string()
					.min(1, "Password is required")
					.min(8, "Password must be at least 8 characters"),
				school: z.string().min(1, "School name is required"),
			}),
			data: withBaseSuccessResponse(z.object({ email: z.email(), school: z.string() })),
		},

		"@post/school/classes": {
			body: z.object({
				grade: z
					.string()
					.min(1, "Grade is required")
					.max(1, "Grade must be a single character")
					.regex(/^[A-Za-z]$/, "Grade must be an alphabet"),
				school_class: z.string().min(1, "School class is required"),
			}),
			data: withBaseSuccessResponse(SchoolClassDataSchema),
		},

		"@post/school/register": {
			body: z.instanceof(FormData),
			data: withBaseSuccessResponse(SchoolDetailsDataSchema),
		},

		"@post/school/results": {
			body: z.instanceof(FormData),
		},

		"@post/school/results/get-class-session-term": {
			body: z.object({
				school_class: z.string(),
				session: z.string(),
				term: z.string(),
			}),
			data: withBaseSuccessResponse(
				z.object({
					class_session_term: z.object({
						school_class: z.string(),
						session: z.string(),
						term: z.string(),
					}),
					students: z.array(z.object({ name: z.string(), reg_number: z.string() })),
				})
			),
		},

		"@post/school/students": {
			body: z.object({
				gender: z.string().min(1, "Gender is required"),
				name: z.string().min(1, "Name is required"),
				school_class: z.string().min(1, "Please choose the student's class"),
			}),
			data: withBaseSuccessResponse(
				StudentDataSchema.pick({ gender: true, name: true, school_class: true })
			),
		},

		"@post/school/subjects": {
			body: z.object({ subject: z.string().min(1, "Subject is required") }),
			data: withBaseSuccessResponse(z.object({ subject: z.string() })),
		},

		"@post/token/refresh": {
			body: z.object({ refresh: z.string() }),
			data: withBaseSuccessResponse(z.object({ access: z.string() })),
		},

		"@put/change-password": {
			body: z.object({
				old_password: z.string(),
				password: z.string(),
				password2: z.string(),
			}),
		},

		"@put/school/classes/:id": {
			body: z.object({ grade: z.string(), school_class: z.string() }),
			data: withBaseSuccessResponse(SchoolClassDataSchema),
		},

		"@put/school/students/:id": {
			body: z.object({
				gender: z.enum(["Male", "Female"]),
				name: z.string(),
				school_class: z.string(),
			}),
			data: withBaseSuccessResponse(StudentDataSchema),
		},
	},
	{ strict: true }
);

export type CheckResultResponseData = z.infer<
	(typeof apiSchema)["routes"]["@post/check-result"]["data"]
>["data"];

export type InputScoresResponseData = z.infer<
	(typeof apiSchema)["routes"]["@post/school/results/get-class-session-term"]["data"]
>["data"];
