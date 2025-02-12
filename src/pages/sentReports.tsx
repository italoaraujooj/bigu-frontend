import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Reports from "@/components/reports";
import { getUserReportsSubmitted } from "@/services/report";
import { ReportResponseDTO } from "@/types/types";
import { GoBack } from "@/components";
import ReportForm from "@/components/reportForm";

const SentReports = () => {
  const { user } = useContext(AuthContext);

  const [showReportForm, setShowReportForm] = useState(false);
  const [reports, setReports] = useState<ReportResponseDTO[]>([]);
  const [editReport, setEditReport] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  const handleCloseReportForm = () => setShowReportForm(false);
  const handleOpenReportForm = () => setShowReportForm(true);

  useEffect(() => {
    if (user?.userId) {
      loadDataReports();

      if (shouldFetch) {
        setShouldFetch(false);
      }
    }
  }, [user?.userId, shouldFetch]);

  const loadDataReports = async () => {
    const responseReports = await getUserReportsSubmitted(
      user?.userId as string
    );
    if (responseReports) setReports(responseReports.data.reports);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="bg-gray-800 flex items-center space-x-2">
          <GoBack />
        </header>
        <div className="mt-8 flex justify-center">
          <Reports
            reports={reports}
            handleOpenReportForm={handleOpenReportForm}
            setEditReport={setEditReport}
            title={"Denúncias Enviadas"}
          />
          <ReportForm
            visible={showReportForm}
            handleClose={handleCloseReportForm}
            reportId={editReport}
            setShouldFetch={setShouldFetch}
            setEditReport={setEditReport}
          />
        </div>
      </main>
      <footer className="bg-gray-800 text-gray-400 text-center p-4 mt-12 font-[Poppins]">
        <p>Política de privacidade | Termos de uso</p>
        <p>&copy; 2023 Bluq. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default SentReports;
