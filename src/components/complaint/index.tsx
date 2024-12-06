import { Button, Input, Text, TextArea } from "@/components";
import { AuthContext } from "@/context/AuthContext";
// import { createComplaint, editComplaint, getComplaint } from "@/services/complaint";
import { OfferRideFormState } from "@/utils/types";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    complaintId?: string;
};

function OfferRideForm(props: Props) {
  const { complaintId } = props;
  const { user } = useContext(AuthContext);
  const formRef = useRef<FormHandles>(null);
  const [username, setUsername] = useState("");
  const [title, setTtile] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (complaintId) {
      const loadData = async () => {
        // const responseComplaint = await getComplaint(complaintId);
        // if (responseComplaint?.data) {
        //   setUsername(responseComplaint.data.complaint.username);
        //   setTtile(responseComplaint.data.complaint.title);
        //   setDescription(responseComplaint.data.complaint.description);
        // }
      };
      loadData();
    }
  }, [complaintId]);

  const handleSubmit: SubmitHandler<OfferRideFormState> = async () => {
    const body = {
      accuser: user?.userId,
      username: username,
      title: title,
      description: description,
    };
    try {
    //   if (complaintId) {
    //     const response = await editComplaint(complaintId, body);
    //     if (response?.status === 200) {
    //       Router.push("/dashboard");
    //       toast.success("A denúncia foi editada com sucesso");
    //     }
    //   } else {
    //     const response = await createComplaint(body);
    //     if (response?.status === 201) {
    //       Router.push("/dashboard");
    //       toast.success("A denúncia foi criada com sucesso");
    //     }
    //   }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row lg:justify-between"
      ref={formRef}
    >
      <div className="w-full space-y-7">
        <div>
          <Text
            label="Username do meliante"
            size="lg"
            className="mb-4"
            weight="bold"
          />
          <Input
            name="username"
            type="text"
            sizing="adjustable"
            placeholder="O @ do usuário que é alvo da denúncia"
            value={username}
          />
        </div>
        <div>
          <Text label="Título" size="lg" className="mb-4" weight="bold" />
          <Input
            name="title"
            type="text"
            sizing="adjustable"
            placeholder="O motorista não apareceu"
            value={title}
          />
        </div>
        <TextArea
          label="Detalhe sua denúncia"
          placeholder="Detalhe um pouco sua denúncia, dica quando foi, de onde para onde, quem foram os envolvidos..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <section className="w-full flex justify-center gap-8">
          <Button
            label="Denunciar"
            size="base"
            className="uppercase font-semibold px-3 lg:px-6"
            color="green"
            type="submit"
          />
        </section>
      </div>
    </Form>
  );
}

export default OfferRideForm;
