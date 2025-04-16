
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CoreInsulationResistancePage from "./pages/CoreInsulationResistance";
import ElectricalTestResultsPage from "./pages/ElectricalTestResults";
import DPLimitPage from "./pages/DPLimit";
import ChangePasswordPage from "./pages/ChangePassword";
import UserManagementPage from "./pages/UserManagement";
import StandardReportsPage from "./pages/StandardReports";
import TransformerReportsPage from "./pages/TransformerReports";
import DamageReportsPage from "./pages/DamageReports";
import OilTestUploadPage from "./pages/OilTestUpload";
import ElectricalTestUploadPage from "./pages/ElectricalTestUpload";
import ActivateTestResultsPage from "./pages/ActivateTestResults";
import TransformerConfigManagementPage from "./pages/TransformerConfigManagement";
import TransformerImportanceConfigPage from "./pages/TransformerImportanceConfig";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/electrical-test-results" element={<ElectricalTestResultsPage />} />
          <Route path="/core-insulation-resistance" element={<CoreInsulationResistancePage />} />
          <Route path="/dp-limit" element={<DPLimitPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/user-management" element={<UserManagementPage />} />
          <Route path="/standard-reports" element={<StandardReportsPage />} />
          <Route path="/transformer-reports" element={<TransformerReportsPage />} />
          <Route path="/damage-reports" element={<DamageReportsPage />} />
          <Route path="/oil-test-upload" element={<OilTestUploadPage />} />
          <Route path="/electrical-test-upload" element={<ElectricalTestUploadPage />} />
          <Route path="/activate-test-results" element={<ActivateTestResultsPage />} />
          <Route path="/transformer-config-management" element={<TransformerConfigManagementPage />} />
          <Route path="/transformer-importance-config" element={<TransformerImportanceConfigPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
