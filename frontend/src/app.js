"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var LandingPage_1 = require("./pages/LandingPage");
var LoginPage_1 = require("./pages/LoginPage");
var DashboardPage_1 = require("./pages/DashboardPage");
var TicketPage_1 = require("./pages/TicketPage");
var ChangePasswordPage_1 = require("./pages/ChangePasswordPage");
var StaffManagementPage_1 = require("./pages/StaffManagementPage");
// Simple protected route component
function ProtectedRoute(_a) {
    var children = _a.children;
    var isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    var token = localStorage.getItem('authToken');
    // Check if user has valid token
    if (!isAuthenticated || !token) {
        return <react_router_dom_1.Navigate to="/login" replace/>;
    }
    return <>{children}</>;
}
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<LandingPage_1.LandingPage />}/>
        <react_router_dom_1.Route path="/login" element={<LoginPage_1.LoginPage />}/>
        <react_router_dom_1.Route path="/dashboard" element={<ProtectedRoute>
              <DashboardPage_1.DashboardPage />
            </ProtectedRoute>}/>
        <react_router_dom_1.Route path="/tickets" element={<ProtectedRoute>
              <TicketPage_1.TicketPage />
            </ProtectedRoute>}/>
        <react_router_dom_1.Route path="/change-password" element={<ProtectedRoute>
              <ChangePasswordPage_1.ChangePasswordPage />
            </ProtectedRoute>}/>
        <react_router_dom_1.Route path="/staff-management" element={<ProtectedRoute>
              <StaffManagementPage_1.StaffManagementPage />
            </ProtectedRoute>}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
