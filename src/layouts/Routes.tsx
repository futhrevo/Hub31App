import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import AppliedRoute from '../components/AppliedRoute';
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import UnauthenticatedRoute from "../components/UnauthenticatedRoute";

// Public componenets
const Login = lazy(() => import('../pages/accounts/Login'));
const Signup = lazy(() => import('../pages/accounts/Signup'));

// Public Private Components
const RecoverPassword = lazy(() => import('../pages/accounts/RecoverPassword'));
const BecomeTeacher = lazy(() => import('../pages/teacher/become'));
const Privacy = lazy(() => import('../pages/PublicHome/privacy'));

// Private components
const ViewDocument = lazy(() => import('../pages/documents/ViewDocument'));

const ViewQuestionpaper = lazy(() => import('../pages/ViewQuestionPaper'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const ViewVideo = lazy(() => import('../pages/videos/ViewVideo'));
const Courses = lazy(() => import('../pages/CourseAdmin/Courses'));
const NewCourse = lazy(() => import('../pages/CourseAdmin/NewCourse'));
const ViewCourse = lazy(() => import('../pages/CourseAdmin/ViewCourse'));
const Groups = lazy(() => import('../pages/groups/Groups'));
const NewGroup = lazy(() => import('../pages/groups/NewGroup'));
const ViewGroup = lazy(() => import('../pages/groups/ViewGroup'));
const EditGroup = lazy(() => import('../pages/groups/EditGroup'));
const CatalogLibrary = lazy(() => import('../pages/CatalogLibrary'));
const Profile = lazy(() => import('../pages/Profile'));
const PublicCourse = lazy(() => import('../pages/PublicCourse'));
const CoursePage = lazy(() => import('../pages/CoursePage'));
const Classroom = lazy(() => import('../pages/Classroom'));
const LiveRoomPage = lazy(() => import('../pages/LiveRoomPage'));

// Public Routes
export const pubLinksMap = new Map([
  ["Login", { path: "/login", src: Login }],
  ["Signup", { path: "/signup", src: Signup }]
]);

// Mixed Routes
export const pubpvtLinksMap = new Map([
  ["RecoverPassword", { path: "/recover-password", src: RecoverPassword }],
  ["BecomeTeacher", { path: "/become-teacher", src: BecomeTeacher }],
  ["Privacy", { path: "/privacy", src: Privacy }]
])

// Private Routes
export const pvtLinksMap = new Map([
  ["Courses", { "path": "/courses", exact: true, "src": Courses }],
  ["NewCourse", { "path": "/courses/new", exact: true, "src": NewCourse }],
  ["ViewQuestionpaper", { "path": "/courses/:courseId/quiz/:chapId/:matId/:link", "src": ViewQuestionpaper }],
  ["ViewDocument", { "path": "/courses/:courseId/doc/:chapId/:matId/:link", "src": ViewDocument }],
  ["ViewVideo", { "path": "/courses/:courseId/vid/:chapId/:matId/:link", "src": ViewVideo }],
  ["ViewCourse", { "path": "/courses/:id", conn: true, "src": ViewCourse }],
  ["Groups", { "path": "/groups", exact: true, "src": Groups }],
  ["NewGroup", { "path": "/groups/new", exact: true, "src": NewGroup }],
  ["ViewGroup", { "path": "/groups/:id", exact: true, "src": ViewGroup }],
  ["EditGroup", { "path": "/groups/:id/edit", exact: true, "src": EditGroup }],
  ["Dashboard", { "path": "/dashboard", exact: true, "src": Dashboard }],
  ["CatalogLibrary", { "path": "/catalog", exact: true, "src": CatalogLibrary }],
  ["PublicCourse", { "path": "/course/:id", exact: true, "src": PublicCourse }],
  ["CoursePage", { "path": "/course/:id/p", conn: true, "src": CoursePage }],
  ["Classroom", { "path": "/course/:id/class/:chapter?/:material?", exact: true, conn: true, "src": Classroom }],
  ["Profile", { "path": "/profile", exact: true, "src": Profile }],
  ["LiveRoomPage", { "path": "/live/:id/:sess/:_at", conn: true, exact: true, "src": LiveRoomPage }]
]);

const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));

export default function Routes({ appProps }: { appProps: any }) {
  return (
    <Switch>
      <AppliedRoute name="home" path="/" exact component={Home} appProps={appProps} />
      {[...pubLinksMap].map(([k, v]) => <UnauthenticatedRoute key={k} path={v.path} appProps={appProps} component={v.src} />)}
      {[...pubpvtLinksMap].map(([k, v]) => <Route key={k} path={v.path} component={v.src} />)}
      {[...pvtLinksMap].map(([k, v]) => <AuthenticatedRoute key={k} path={v.path} component={v.src} appProps={appProps} exact={v.exact} connected={v.conn} />)}
      <Route component={NotFound} />
    </Switch>
  );
}
