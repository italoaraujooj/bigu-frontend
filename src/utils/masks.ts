import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDateTime = (date: string, time: string) => {
  const [hour, minute] = time.split(':');
  const dateTimeString = `${date}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
  const fullDateTime = new Date(dateTimeString).toISOString();
  return fullDateTime;
}

export const formatarData = (data: string): string =>  {
  const dataAtual = new Date();
  const dataRecebida = new Date(data);

  const diasSemana = [
    "do domingo",
    "da segunda-feira",
    "da terça-feira",
    "da quarta-feira",
    "da quinta-feira",
    "da sexta-feira",
    "do sábado"
  ];

  let resultado = "";

  if (dataAtual.getDate() === dataRecebida.getDate()) {
    resultado = "hoje";
  } else {
    resultado = diasSemana[dataRecebida.getDay()];
  }

  const horas = dataRecebida.getHours().toString().padStart(2, "0");
  const minutos = dataRecebida.getMinutes().toString().padStart(2, "0");

  return `${horas}:${minutos} ${resultado}`;
}

export function formatarDate(data: string): string {
  const dataRecebida = parseISO(data);
  const dataFormatada = format(dataRecebida, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
  return dataFormatada;
}