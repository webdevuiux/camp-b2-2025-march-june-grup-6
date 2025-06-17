import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Layout & Navbar
import Navbar from "./components/layout/Navbar";
import AdminLayout from "./components/admin/AdminLayout";

// Auth
import Login from "./components/auth/Login";
import Login_Successfull from "./components/auth/Login_Successfull";
import Register from "./components/auth/Register";
import Register_Successfull from "./components/auth/Register_Successfull";
import Reset_Password from "./components/auth/Reset_Password";
import Reset_Password_Form from "./components/auth/Reset_Password_Form";
import Reset_Password_Successfull from "./components/auth/Reset_Password_Successfull";
import Register_Organizer from "./components/auth/Register_Organizer";
import Register_Organizer_Successfull from "./components/auth/Register_Organizer_Successfull";
import Login_Admin from "./components/auth/Login_Admin";

// Home & Search
import HomePage from "./components/HomePage";
import Search_HomePage from "./components/search/page/Search_HomePage";

// Forum & Articles
import ForumWrapper from "./components/forum";
import Discussion from "./components/forum/Discussion";
import CreateTopicPage from "./components/forum/components/CreateTopicPage";
import CreativeCorner from "./components/Articles/CreativeCorner";
// --- DITAMBAHKAN (1 dari 2) ---
import ArticleDetail from "./components/Articles/ArticleDetail";

// Refund
import Refund from "./components/refund/Refund";
import Refund_Successful from "./components/refund/Refund_Successful";

// Customer Support
import CustomerSupportInitial from "./components/cs/CustomerSupportInitial";
import CustomerSupportForm from "./components/cs/CustomerSupportForm";
import CustomerSupportSuccess from "./components/cs/CustomerSupportSuccess";

// Create Workshop
import CreateWorkshopPage from "./components/createworkshop/CreateWorkshopPage";
import CreateWorkshopSuccess from "./components/createworkshop/CreateWorkshopSuccess";

// Profile & Workshop
import Ticket from "./components/profile/Ticket";
import Settings from "./components/profile/settings/Settings";
import TicketsDetail from "./components/profile/tickets/TicketsDetail";
import ViewWorkshopDetail from "./components/profile/tickets/ViewWorkshopDetail";
import MyWorkshop from "./components/profile/myworkshop/MyWorkshop";

// Admin Pages
import AdminWorkshopList from "./components/admin/admin_Workshop_List";
import MainContent from "./components/admin/components/MainContent";
import AdminForumList from "./components/admin/admin_Forum_List";
import AdminWorkshopSubmission from "./components/admin/admin_Workshop_Submission";
import AdminOrderRequest from "./components/admin/admin_Order_Request";
import AdminRefundRequest from "./components/admin/admin_Refund_Request";
import AdminSettings from "./components/admin/admin_Settings";

// Payment
import PaymentPage from "./components/payment/PaymentPage";
import PaymentNow from "./components/payment/PaymentNow";
import PaymentForm from "./components/payment/PaymentForm";
import PaymentSuccess from "./components/payment/PaymentSuccess";

// Styles
import "./App.css";

// Component to wrap navbar logic
function LayoutWithNavbar() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/ticket/:id" element={<TicketsDetail />} /> */}
        <Route path="/workshop-detail" element={<ViewWorkshopDetail />} />
        <Route path="/articles" element={<CreativeCorner />} />
        {/*  */}
        <Route
          path="/articles/detail/:articleSlug"
          element={<ArticleDetail />}
        />
        <Route path="/ticket/:bookingId" element={<TicketsDetail />} />
        <Route path="/workshop-detail" element={<ViewWorkshopDetail />} />
        <Route path="/articles" element={<CreativeCorner />} />
        {/* --- INI YANG HILANG (2 dari 2) --- */}
        {/* Daftarkan rute untuk halaman detail artikel */}
        <Route
          path="/articles/detail/:articleSlug"
          element={<ArticleDetail />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/login-success" element={<Login_Successfull />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<Register_Successfull />} />
        <Route path="/reset-password" element={<Reset_Password />} />
        <Route path="/reset-password-form" element={<Reset_Password_Form />} />
        <Route
          path="/reset-password-success"
          element={<Reset_Password_Successfull />}
        />
        <Route path="/register-organizer" element={<Register_Organizer />} />
        <Route
          path="/register-organizer-success"
          element={<Register_Organizer_Successfull />}
        />
        <Route path="/search" element={<Search_HomePage />} />
        <Route path="/articles" element={<CreativeCorner />} />
        {/* Forum */}
        <Route path="/forum" element={<ForumWrapper />} />
        <Route path="/forum/create" element={<CreateTopicPage />} />
        <Route path="/forum/discussion/:topicId" element={<Discussion />} />
        {/* Refund */}
        <Route path="/refund/:bookingId" element={<Refund />} />
        <Route path="/refund-success" element={<Refund_Successful />} />
        {/* Customer Service */}
        <Route path="/customer-service" element={<CustomerSupportInitial />} />
        <Route
          path="/customer-service/form"
          element={<CustomerSupportForm />}
        />
        <Route
          path="/customer-service/success"
          element={<CustomerSupportSuccess />}
        />
        {/* Create Workshop */}
        <Route path="/create-workshop" element={<CreateWorkshopPage />} />
        <Route
          path="/create-workshop/success"
          element={<CreateWorkshopSuccess />}
        />
        {/* Profile Routes */}
        <Route path="/ticket" element={<Ticket />} />
        {/* <Route path="/ticket/:id" element={<TicketsDetail />} /> */}{" "}
        {/* This is a duplicate, you can remove one */}
        <Route path="/workshop-detail/:id" element={<ViewWorkshopDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-workshops" element={<MyWorkshop />} />
        {/* Payment */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-form/:id" element={<PaymentForm />} />
        <Route path="/payment-now" element={<PaymentNow />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        {/* Admin */}
        <Route path="/login-admin" element={<Login_Admin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<MainContent />} />
          <Route path="workshop-list" element={<AdminWorkshopList />} />
          <Route path="forum-list" element={<AdminForumList />} />
          <Route
            path="workshop-submissions"
            element={<AdminWorkshopSubmission />}
          />
          <Route path="order-request" element={<AdminOrderRequest />} />
          <Route path="refund-request" element={<AdminRefundRequest />} />
          <Route path="settings" element={<AdminSettings />} />{" "}
          {/* Corrected admin settings path */}
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWithNavbar />
    </Router>
  );
}

export default App;
