import clsx from "clsx";
import { useContext, useEffect, useRef, useState } from "react";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { toast } from "react-toastify";
import { Button } from "@/components";
import { AuthContext } from "@/context/AuthContext";
import { OfferRideFormState } from "@/utils/types";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import StarRating from "../starRating";
import {
  createRating,
  deleteRating,
  editRating,
  getRating,
} from "@/services/ratings";

type Props = {
  visible: boolean;
  handleClose: () => void;
  rideId?: string;
  ratingId?: string;
  rateeId?: any;
  rateeName?: string;
  setShouldFetch: (shouldFetch: boolean) => void;
  setEditRating: (ratingId: string) => void;
};

function RatingForm(props: Props) {
  const {
    visible,
    handleClose,
    rideId,
    rateeId,
    rateeName,
    ratingId,
    setShouldFetch,
    setEditRating,
  } = props;

  const formRef = useRef<FormHandles>(null);
  const [ratee, setRatee] = useState<string>(rateeId);
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (ratingId) {
      const loadData = async () => {
        const responseRating = await getRating(ratingId);
        console.log(responseRating);
        if (responseRating?.data) {
          setComment(responseRating.data.rating.comment);
          setRatee(responseRating.data.rating.rateeId);
          setScore(responseRating.data.rating.score);
        }
      };
      loadData();
    }
  }, [ratingId]);

  const handleCreateRating: SubmitHandler<OfferRideFormState> = async () => {
    const body = {
      rideId: rideId,
      rateeId: rateeId,
      score: score,
      comment: comment,
    };
    try {
      const response = await createRating(body);
      if (response?.status === 201) {
        // setShouldFetch(true);
        handleClose();
        toast.success("A avaliação foi criada com sucesso");
      }
    } catch (err: any) {
      handleClose();
      toast.error(err.message);
    }
  };

  const handleUpdateRating: SubmitHandler<OfferRideFormState> = async () => {
    const body = {
      rideId: rideId,
      rateeId: ratee,
      score: score,
      comment: comment,
    };
    try {
      const response = await editRating(ratingId!, body);
      if (response?.status === 200) {
        // setShouldFetch(true);
        handleClose();
        toast.success("A avaliação foi editada com sucesso");
      }
    } catch (err: any) {
      handleClose();
      toast.error(err.message);
    }
  };

  const handleDeleteRating = async (ratingId: string) => {
    try {
      const response = await deleteRating(ratingId);
      if (response?.status === 200) {
        // setShouldFetch(true);
        // setEditRating("");
        handleClose();
        toast.success("A avaliação foi deletada com sucesso");
      }
    } catch (err: any) {
      handleClose();
      toast.error("Falha ao deletar a avaliação");
    }
  };

  return (
    <div
      id="rideOffers"
      className={clsx(
        "transition ease-in-out delay-150 duration-500",
        `h-screen w-full fixed bg-[#1a1a1a] overflow-y-scroll p-4 top-0 right-0 sm:p-8 md:p-10 lg:max-w-[35%]`,
        "z-[9999]",
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
          {`Avalie: ${rateeName}`}
        </h1>

        <Form
          onSubmit={ratingId ? handleUpdateRating : handleCreateRating}
          className="flex flex-col lg:flex-row lg:justify-between w-full"
          ref={formRef}
        >
          <div className="w-full space-y-7 flex-1">
            <div className="md:w-80 md:h-16 md:text-lg flex flex-col">
              <label className="block text-lg font-bold mb-1 font-[Poppins] text-gray uppercase">
                Nota
              </label>
              <StarRating
                count={5}
                size={50}
                value={score}
                edit={true}
                onChange={(value) => setScore(value)}
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-1 font-[Poppins] text-gray uppercase">
                Deixe um Comentário
              </label>
              <textarea
                rows={6}
                minLength={10}
                placeholder="Detalhe um pouco sua avaliação, o que justifica a nota que você está dando a esse usuário..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                autoComplete="on"
                autoCorrect="on"
                name="ride_description"
                className="w-full rounded-lg px-6 py-6 my-[0.16rem] placeholder-placeholder font-[Poppins] text-black"
              ></textarea>
            </div>

            {ratingId ? (
              <div className="flex flex-row justify-center gap-2 mt-4">
                <Button
                  label="Deletar"
                  size="sm"
                  color="red"
                  className="uppercase font-semibold px-3 lg:px-6"
                  shape="square"
                  onClick={() => handleDeleteRating(ratingId)}
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
                  label="Avaliar"
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

export default RatingForm;
