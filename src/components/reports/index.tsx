import { ReportResponseDTO } from "@/types/ride";
import { formatarData } from "@/utils/masks";
import Image from "next/image";
import Homem from "../../assets/avatar.png";
import WomanAvatar from "../../assets/woman.png";
import LottieAnimation from "../../components/LottieAnimation";
import ghost from "../../assets/ghost.json";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr/PencilSimple";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

type Props = {
  reports: ReportResponseDTO[];
  handleOpenReportForm: () => void;
  setEditReport: (reportId: string) => void;
  title?: string;
};

const Reports = (props: Props) => {
  const { reports, handleOpenReportForm, setEditReport, title } = props;
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-dark w-full h-fit rounded-lg py-6 flex flex-col mx-auto lg:mx-0 max-w-[800px]">
      <h2 className="font-['Poppins'] text-center text-xl sm:text-3xl text-white font-bold pb-8">
        {title ? title : "Denúncias"}
      </h2>

      {reports?.length > 0 ? (
        reports?.map((report, index) => (
          <div
            key={index}
            className="flex flex-col bg-white rounded-lg p-4 mb-4 ml-8 mr-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {report.reporterSex === "Feminino" ? (
                    <Image
                      className="w-8 h-8 md:w-16 md:h-16 object-cover rounded-full"
                      src={WomanAvatar}
                      alt="foto"
                    />
                  ) : (
                    <Image
                      className="w-8 h-8 md:w-16 md:h-16 object-cover rounded-full"
                      src={Homem}
                      alt="foto"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <p className="text-xl font-bold text-black font-[Poppins]">
                    {report.reporterName}
                  </p>
                </div>
              </div>

              {user?.userId === report.reporterId && (
                <div className="ml-auto">
                  <PencilSimple
                    color="#FFB400"
                    weight="bold"
                    className="cursor-pointer"
                    size={24}
                    onClick={() => {
                      handleOpenReportForm();
                      setEditReport(report._id);
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex-grow mt-4">
              <p className="font-['Poppins'] text-black my-2">
                {report.comment}
              </p>
              <div className="flex font-['Poppins'] text-black text-sm">
                <span>⏰ {formatarData(report.createdAt)}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex items-center justify-center">
          <div className="w-64 h-64">
            {/* @ts-ignore */}
            <LottieAnimation data={ghost} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
