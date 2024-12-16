import clsx from "clsx";
import { useContext, useEffect, useRef, useState } from "react";
import { RideResponseDTO } from "@/types/ride";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import Router from "next/router";
import { toast } from "react-toastify";

import { Button, Input, Dropdown, TextArea } from "@/components";
import { AuthContext } from "@/context/AuthContext";
import {
  createReport,
  deleteReport,
  editReport,
  getReport,
} from "@/services/report";
import { OfferRideFormState } from "@/utils/types";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";

interface FormatContent {
  value: string;
  label: string;
}

type Props = {
  visible: boolean;
  handleClose: () => void;
  reportId?: string;
  accusedId?: any;
  setShouldFetch: (shouldFetch: boolean) => void;
  setEditReport: (reportId: string) => void;
};

function ReportForm(props: Props) {
  const { visible, handleClose, accusedId, setShouldFetch, setEditReport } =
    props;

  const { reportId } = props;
  const { user } = useContext(AuthContext);
  const formRef = useRef<FormHandles>(null);
  const [accused, setAccused] = useState<string>(accusedId || "");
  const [content, setContent] = useState<FormatContent>({} as FormatContent);
  const [comment, setComment] = useState("");

  const contents = [
    {
      value: "670c7741db1b1d5886b04cdg",
      label: "O motorista não corresponde ao perfil no meu aplicativo",
    },
    {
      value: "670c7741db1b1d5886b04cdh",
      label: "O veículo do meu motorista era diferente",
    },
    {
      value: "670c7741db1b1d5886b04cdi",
      label: "Reportar racismo",
    },
    {
      value: "670c7741db1b1d5886b04cdj",
      label: "Reportar assédio sexual",
    },
    {
      value: "670c7741db1b1d5886b04cdk",
      label: "Reportar um roubo",
    },
    {
      value: "670c7741db1b1d5886b04cdl",
      label: "O comportamento do motorista me troxe insegurança",
    },
    {
      value: "670c7741db1b1d5886b04cdm",
      label: "Reportar discriminação",
    },
    {
      value: "670c7741db1b1d5886b04cdn",
      label: "Reportar uma agressão física",
    },
    {
      value: "670c7741db1b1d5886b04cdo",
      label: "Reportar LGBTQIA+Fobia",
    },
    {
      value: "670c7741db1b1d5886b04cdp",
      label: "Outro",
    },
  ];

  useEffect(() => {
    if (reportId) {
      const loadData = async () => {
        const responseReport = await getReport(reportId);
        if (responseReport?.data) {
          const selectedContent = contents.find(
            (item) => item.label === responseReport.data.report.content
          );
          if (selectedContent) {
            setContent(selectedContent);
          }
          console.log(responseReport.data.report.comment);
          setComment(responseReport.data.report.comment);
          setAccused(responseReport.data.report.accusedId);
        }
      };
      loadData();
    }
  }, [reportId]);

  const handleCreateReport: SubmitHandler<OfferRideFormState> = async () => {
    console.log(content);
    const body = {
      reporterId: user?.userId,
      accusedId: accused,
      content: content.label,
      comment: comment,
    };
    try {
      const response = await createReport(body);
      if (response?.status === 201) {
        setShouldFetch(true);
        handleClose();
        toast.success("A denúncia foi criada com sucesso");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleUpdateReport: SubmitHandler<OfferRideFormState> = async () => {
    console.log(content);
    const body = {
      reporterId: user?.userId,
      accusedId: accusedId,
      content: content.label,
      comment: comment,
    };
    try {
      const response = await editReport(reportId!, body);
      if (response?.status === 200) {
        setShouldFetch(true);
        handleClose();
        toast.success("A denúncia foi editada com sucesso");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    try {
      const response = await deleteReport(reportId);
      if (response?.status === 200) {
        setShouldFetch(true);
        setEditReport("");
        handleClose();
        toast.success("A denúncia foi deletada com sucesso");
      }
    } catch (err: any) {
      handleClose();
      toast.error("Falha ao deletar a denúncia");
    }
  };

  return (
    <div
      id="rideOffers"
      className={clsx(
        "transition ease-in-out delay-150 duration-500",
        `h-screen w-full fixed bg-[#1a1a1a] overflow-y-scroll p-4 top-0 right-0 sm:p-8 md:p-10 lg:max-w-[35%]`,
        visible ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex flex-col justify-between items-start gap-4 mb-3">
        <CaretRight
          size={32}
          color="white"
          onClick={handleClose}
          className="cursor-pointer self-start"
          weight="bold"
        />

        <h1 className="font-['Poppins'] font-semibold text-2xl sm:text-3xl text-white my-2">
          Faça sua Denúncia
        </h1>

        <Form
          onSubmit={reportId ? handleUpdateReport : handleCreateReport}
          className="flex flex-col lg:flex-row lg:justify-between w-full"
          ref={formRef}
        >
          <div className="w-full space-y-7 flex-1">
            <div>
              <Dropdown
                key={1}
                label="Motivo da Denúncia"
                options={contents}
                selectedOption={content}
                onSelectOption={(selectedOption) => setContent(selectedOption)}
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-1 font-[Poppins] text-gray uppercase">
                Detalhe sua denúncia
              </label>
              <textarea
                rows={6}
                minLength={10}
                placeholder="Detalhe um pouco sua denúncia, por exemplo quando foi, de onde para onde, quem foram os envolvidos..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                autoComplete="on"
                autoCorrect="on"
                name="ride_description"
                className="w-full rounded-lg px-6 py-6 my-[0.16rem] placeholder-placeholder font-[Poppins] text-black"
              ></textarea>
            </div>

            {reportId ? (
              <div className="flex flex-row justify-center gap-2 mt-4">
                <Button
                  label="Deletar"
                  size="sm"
                  color="red"
                  className="uppercase font-semibold px-3 lg:px-6"
                  shape="square"
                  onClick={() => handleDeleteReport(reportId)}
                />

                <Button
                  label="Salvar"
                  size="sm"
                  color="green"
                  className="uppercase font-semibold px-3 lg:px-6"
                  shape="square"
                  type="submit"
                />
              </div>
            ) : (
              <div className="flex flex-row justify-center gap-2 mt-4">
                <Button
                  label="Denunciar"
                  size="sm"
                  color="green"
                  className="uppercase font-semibold px-3 lg:px-6"
                  shape="square"
                  type="submit"
                />
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ReportForm;
