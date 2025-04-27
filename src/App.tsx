import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
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
import VisualInspectionTopicsPage from "./pages/VisualInspectionTopics";
import VisualInspectionCriteriaPage from "./pages/VisualInspectionCriteria";
import ScorePercentageHIPage from "./pages/ScorePercentageHI";
import ScorePercentageFactorPage from "./pages/ScorePercentageFactor";
import SubequipmentWeightPage from "./pages/SubequipmentWeight";
import ScoreWeightTestingPage from "./pages/ScoreWeightTesting";
import MainEquipmentWeightPage from "./pages/MainEquipmentWeight";
import TransformerMaintenanceSearchPage from "./pages/TransformerMaintenanceSearch";
import VisualInspectionPage from "./pages/VisualInspection";
import NotFoundThermoScan from "./pages/NotFoundThermoScan";
import FactorSettingPage from "./pages/FactorSetting";
import TransformerPriceAndLossPage from "./pages/TransformerPriceAndLoss";
import TransformerInformationPage from "./pages/TransformerInformation";
import TransformerRelocation from "./pages/TransformerRelocation";
import TransformerAbnormality from "./pages/TransformerAbnormality";
import OilTest from "./pages/OilTest";
import OltcMaintenance from "./pages/OltcMaintenance";
import OilContact from "./pages/OilContact";

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
          <Route path="/visual-inspection-topics" element={<VisualInspectionTopicsPage />} />
          <Route path="/visual-inspection-criteria" element={<VisualInspectionCriteriaPage />} />
          <Route path="/score-percentage-hi" element={<ScorePercentageHIPage />} />
          <Route path="/score-percentage-factor" element={<ScorePercentageFactorPage />} />
          <Route path="/subequipment-weight" element={<SubequipmentWeightPage />} />
          <Route path="/score-weight-testing" element={<ScoreWeightTestingPage />} />
          <Route path="/main-equipment-weight" element={<MainEquipmentWeightPage />} />
          <Route path="/transformer-maintenance-search" element={<TransformerMaintenanceSearchPage />} />
          <Route path="/visual-inspection" element={<VisualInspectionPage />} />
          <Route path="/not-found-thermo-scan" element={<NotFoundThermoScan />} />
          <Route path="/factor-setting" element={<FactorSettingPage />} />
          <Route path="/transformer-price-and-loss" element={<TransformerPriceAndLossPage />} />
          <Route path="/transformer-information" element={<TransformerInformationPage />} />
          <Route path="/transformer-relocation" element={<TransformerRelocation />} />
          <Route path="/transformer-abnormality" element={<TransformerAbnormality />} />
          <Route path="/oil-test" element={<OilTest />} />
          <Route path="/oltc-maintenance" element={<OltcMaintenance />} />
          <Route path="/oil-contact" element={<OilContact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
