import { AuthContext } from "@/context/AuthContext";
import { verifyCode } from "@/services/auth";
import router from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const { user } = useContext(AuthContext);

  const handleSendCode = async () => {
    if (!user?.email) {
      return;
    }

    setLoading(true);
    const response = await verifyCode(user?.email, code);

    if (response && response.status === 202) {
      setLoading(false);
      toast.success("Email verificado com sucesso");
      router.push({
        pathname: "/dashboard",
        query: { firstAccess: true },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="bg-white flex gap-2 flex-col items-center p-4 rounded max-h-[75%]">
        <h1>Verificação de conta</h1>
        <p>Verifique sua caixa de entrada.</p>
        <div className="p-2 flex gap-2">
          <input
            className="border-2 rounded p-2"
            type="text"
            placeholder="Código de verificação"
            disabled={loading}
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
          <button
            type="button"
            onClick={handleSendCode}
            className="bg-blue-500 text-white rounded p-2"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
