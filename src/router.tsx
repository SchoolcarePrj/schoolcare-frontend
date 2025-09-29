import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from "react-router";
import { dashboardLoader, sessionLoader } from "./lib/react-query/loaders";
import { getQueryClient } from "./lib/react-query/queryClient";
import RootLayout from "./pages/layout";

const queryClient = getQueryClient();

/* Layouts */
const PrimaryLayout = lazy(() => import("./pages/(primary)/layout"));
const HomeLayout = lazy(() => import("./pages/(home)/layout"));
const ProtectionLayout = lazy(() => import("./pages/layout.protect"));
const AuthLayout = lazy(() => import("./pages/auth/layout"));
const RegisterLayout = lazy(() => import("./pages/auth/register/layout"));
const AdminSchoolDashboardLayout = lazy(() => import("./pages/admin/school/dashboard/layout"));
const StudentResultLayout = lazy(() => import("./pages/student-result/layout"));
const AdminSchoolRegisterLayout = lazy(() => import("./pages/admin/school/register/layout"));
const AdminSuperDashboardLayout = lazy(() => import("./pages/admin/super/dashboard/layout"));

const routes = createRoutesFromElements(
	<Route Component={RootLayout}>
		{/* eslint-disable react-x/no-nested-lazy-component-declarations */}

		<Route path="/test" Component={lazy(() => import("./pages/page.test"))} />

		<Route Component={HomeLayout} loader={sessionLoader}>
			<Route path="/" Component={lazy(() => import("./pages/(home)/page"))} />
		</Route>

		<Route Component={StudentResultLayout}>
			<Route path="/student-result" Component={lazy(() => import("./pages/student-result/page"))} />
		</Route>

		<Route Component={PrimaryLayout}>
			<Route path="/who-we-are" Component={lazy(() => import("./pages/(primary)/who-we-are.page"))} />
			<Route path="/faqs" Component={lazy(() => import("./pages/(primary)/faq.page"))} />
			<Route path="/contact" Component={lazy(() => import("./pages/(primary)/contact.page"))} />
			<Route
				path="/how-it-works"
				Component={lazy(() => import("./pages/(primary)/how-it-works.page"))}
			/>
		</Route>

		<Route Component={AuthLayout} loader={sessionLoader}>
			<Route Component={RegisterLayout}>
				<Route path="/auth/register" element={<Navigate to="/auth/register/personal-info" />} />

				<Route
					path="/auth/register/personal-info"
					Component={lazy(() => import("./pages/auth/register/personal-info.page"))}
				/>

				<Route
					path="/auth/register/address"
					Component={lazy(() => import("./pages/auth/register/address.page"))}
				/>
			</Route>

			<Route path="/auth/login" Component={lazy(() => import("./pages/auth/login/page"))} />
		</Route>

		<Route Component={ProtectionLayout} loader={sessionLoader}>
			<Route path="/admin/school/dashboard" Component={AdminSchoolDashboardLayout}>
				<Route
					index={true}
					loader={dashboardLoader}
					Component={lazy(() => import("./pages/admin/school/dashboard/page"))}
				/>

				<Route
					path="register/student"
					Component={lazy(() => import("./pages/admin/school/dashboard/register/student.page"))}
				/>
				<Route
					path="register/subject"
					Component={lazy(() => import("./pages/admin/school/dashboard/register/subject.page"))}
				/>
				<Route
					path="register/class"
					Component={lazy(() => import("./pages/admin/school/dashboard/register/class.page"))}
				/>

				<Route
					path="students/view-all"
					Component={lazy(() => import("./pages/admin/school/dashboard/students/view-all/page"))}
				/>
				<Route
					path="students/view-all/table"
					Component={lazy(
						() => import("./pages/admin/school/dashboard/students/view-all/table.page")
					)}
				/>
				<Route
					path="students/view-single"
					Component={lazy(() => import("./pages/admin/school/dashboard/students/view-single/page"))}
				/>
				<Route
					path="students/view-single/table"
					Component={lazy(
						() => import("./pages/admin/school/dashboard/students/view-single/table.page")
					)}
				/>
				<Route
					path="students/input-scores"
					Component={lazy(() => import("./pages/admin/school/dashboard/students/input-scores/page"))}
				/>
				<Route
					path="students/input-scores/table"
					Component={lazy(
						() => import("./pages/admin/school/dashboard/students/input-scores/table.page")
					)}
				/>
				<Route
					path="students/input-scores/upload"
					Component={lazy(
						() => import("./pages/admin/school/dashboard/students/input-scores/upload.page")
					)}
				/>
			</Route>
		</Route>

		<Route path="/admin/school/register" Component={AdminSchoolRegisterLayout}>
			<Route index={true} Component={lazy(() => import("./pages/admin/school/register/page"))} />
		</Route>

		<Route path="/admin/super/dashboard" Component={AdminSuperDashboardLayout}>
			<Route index={true} Component={lazy(() => import("./pages/admin/super/dashboard/page"))} />
			<Route
				path="notifications"
				Component={lazy(() => import("./pages/admin/super/dashboard/notifications/page"))}
			/>
			<Route path="blogs" Component={lazy(() => import("./pages/admin/super/dashboard/blogs/page"))} />
			<Route
				path="schools"
				Component={lazy(() => import("./pages/admin/super/dashboard/schools/page"))}
			/>
			<Route
				path="settings"
				Component={lazy(() => import("./pages/admin/super/dashboard/settings/page"))}
			/>
		</Route>

		{/* eslint-enable react-x/no-nested-lazy-component-declarations */}
	</Route>
);

const browserRouter = createBrowserRouter(routes);

export function Router() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={browserRouter} />

			<ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
		</QueryClientProvider>
	);
}
