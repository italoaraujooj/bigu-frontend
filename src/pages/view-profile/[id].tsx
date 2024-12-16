import Text from "@/components/text";
import { getUserById } from "@/services/auth";
import { getUserRatings } from "@/services/ratings";
import {
  RatingResponseDTO,
  UserResponseDTO,
  ReportResponseDTO,
} from "@/types/ride";
import { ArrowCircleLeft } from "@phosphor-icons/react/dist/ssr/ArrowCircleLeft";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WomanAvatar from "../../assets/woman.png";
import History from "@/components/history";
import Homem from "../../assets/avatar.png";
import { getRideHistoryUser } from "@/services/ride";
import { Attribute, Bar } from "@/components/profile/carousel/components";
import ReportForm from "@/components/reportForm";
import { getUserReportsReceived } from "@/services/report";
import Ratings from "@/components/ratings";
import Reports from "@/components/reports";
import RatingForm from "@/components/ratingForm";

function Profile() {
  const router = useRouter();
  const { id } = router.query;

  const [userData, setUserData] = useState<UserResponseDTO>();
  const [history, setHistory] = useState([]);
  const [loadingStateHistory, setLoadingStateHistory] = useState<boolean>(true);
  const [ratings, setRatings] = useState<RatingResponseDTO[]>([]);
  const [reports, setReports] = useState<ReportResponseDTO[]>([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [editReport, setEditReport] = useState<string>("");
  const [editRating, setEditRating] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const [rateeId, setRateeId] = useState<string>("");
  const [rateeName, setRateeName] = useState<string>("");
  const [rideId, setRideId] = useState<string>("");

  const handleCloseReportForm = () => setShowReportForm(false);
  const handleOpenReportForm = () => setShowReportForm(true);
  const handleCloseRatingForm = () => setShowRatingForm(false);
  const handleOpenRatingForm = () => setShowRatingForm(true);

  useEffect(() => {
    if (id) {
      loadDataUser();
      loadDataRatings();
      loadDataHistory();
      loadDataReports();

      if (shouldFetch) {
        setShouldFetch(false);
      }
    }
  }, [id, shouldFetch]);

  const loadDataUser = async () => {
    const responseUser = await getUserById(id as string);
    if (responseUser) setUserData(responseUser.data.user);
  };

  const loadDataRatings = async () => {
    const responseRatings = await getUserRatings(id as string);
    if (responseRatings) setRatings(responseRatings.data.ratings);
  };

  const loadDataReports = async () => {
    const responseReports = await getUserReportsReceived(id as string);
    if (responseReports) setReports(responseReports.data.reports);
  };

  const loadDataHistory = async () => {
    try {
      const responseHistory = await getRideHistoryUser(id as string);
      setHistory(responseHistory.data.userHistory);
    } finally {
      setLoadingStateHistory(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center my-4 md:my-8">
      <div>
        <div>
          <Link
            href="/dashboard"
            className="text-gray flex items-center gap-2 mb-4"
          >
            <ArrowCircleLeft size={32} />
            <Text
              label="Voltar para tela inicial"
              className=" cursor-pointer hover:text-stone-400 "
              color="gray"
              size="xl"
            />
          </Link>
        </div>
        <div className="flex w-full items-center justify-center my-4 md:my-8">
          <div className="relative bg-dark w-[90vw] md:w-[85vw] lg:w-[90vw] xl:w-[80vw] 2xl:w-[80vw] sm:w-full p-4 rounded-2xl flex flex-col gap-6 md:p-16 space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
              {/* Bloco do nome, rating e status de verificação */}
              <div className="flex justify-between md:justify-start md:flex-row flex-col items-center md:items-start">
                <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
                  <div className="relative">
                    {userData?.sex === "Feminino" ? (
                      <Image
                        className="w-12 h-12 md:w-24 md:h-24 object-cover rounded-full transition duration-300"
                        src={userData?.profileImage || WomanAvatar}
                        alt="foto"
                      />
                    ) : (
                      <Image
                        className="w-12 h-12 md:w-24 md:h-24 object-cover rounded-full transition duration-300"
                        src={userData?.profileImage || Homem}
                        alt="foto"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl font-bold text-white md:text-4xl font-[Poppins]">
                        {userData?.name}
                      </h1>
                      <span className="text-gray text-[2rem] font-[Poppins]">
                        ⭐ {userData ? userData.avgScore.toFixed(1) : 0.0}
                      </span>
                    </div>
                    <p className="text-gray italic text-md font-[Poppins]">
                      {userData?.isVerified
                        ? "Usuário Verificado"
                        : "Usuário Não Verificado"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleOpenReportForm}
                className="group transition-all duration-300 ease-in-out"
              >
                <Text
                  label="🚫 Denunciar Usuário"
                  className="py-2 px-4 sm:text-sm text-base md:text-lg hover:text-[#AA0000] text-gray uppercase font-medium bg-left-bottom bg-gradient-to-r from-amber-400 to-amber-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out underline-offset-8"
                  color="gray"
                  size="base"
                  weight="medium"
                />
              </button>
            </div>

            <div className="w-full h-full flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-1/2 flex flex-col gap-6">
                {/* Avaliações */}
                <Ratings
                  ratings={ratings}
                  handleOpenRatingForm={handleOpenRatingForm}
                  setEditRating={setEditRating}
                />

                {/* Denúncias */}
                {/* <Reports
                  reports={reports}
                  handleOpenReportForm={handleOpenReportForm}
                  setEditReport={setEditReport}
                /> */}
              </div>

              {/* Divider */}
              <div className="w-1 h-auto bg-blackLine md:w-[2px] md:h-[40rem]"></div>

              {/* Bloco da Barra e Histórico Section */}
              <div className="w-full md:w-1/2 flex flex-col gap-6">
                {/* Bloco da Barra e Atributos */}
                <div className="flex md:w-2/3 mx-auto items-center justify-center gap-6 bg-white p-4 pb-0 rounded-md">
                  <Bar />
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <Attribute
                      label={userData?.sex === "Feminino" ? "MULHER" : "HOMEM"}
                      value={
                        userData?.sex === "Feminino" ? "ELA/DELA" : "ELE/DELE"
                      }
                      color="light-blue"
                    />
                    <Attribute
                      label={
                        /estudante|ccc|ee/i.test(userData?.email ?? "")
                          ? "ESTUDANTE"
                          : "PROFESSOR"
                      }
                      value="GRADUAÇÃO"
                      color="yellow"
                    />
                    <Attribute
                      label={`${userData?.offeredRidesCount} ${
                        userData?.offeredRidesCount === 1 ? "CARONA" : "CARONAS"
                      }`}
                      value="CONDUZIDAS"
                      color="orange"
                    />
                    <Attribute
                      label={`${userData?.takenRidesCount} ${
                        userData?.takenRidesCount === 1 ? "CARONA" : "CARONAS"
                      }`}
                      value="RECEBIDAS"
                      color="orange"
                    />
                  </div>
                </div>

                {/* Histórico de Caronas */}
                <History races={history} loading={loadingStateHistory} />

                <ReportForm
                  visible={showReportForm}
                  handleClose={handleCloseReportForm}
                  reportId={editReport}
                  accusedId={id}
                  setShouldFetch={setShouldFetch}
                  setEditReport={setEditReport}
                />

                <RatingForm
                  visible={showRatingForm}
                  handleClose={handleCloseRatingForm}
                  ratingId={editRating}
                  rideId={rideId}
                  rateeId={rateeId}
                  rateeName={rateeName}
                  setShouldFetch={setShouldFetch}
                  setEditRating={setEditRating}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
