import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MESES: any = {
  '01': 'Janeiro',
  '02': 'Fevereivo',
  '03': 'Março',
  '04': 'Abril',
  '05': 'Maio',
  '06': 'Junho',
  '07': 'Julho',
  '08': 'Agosto',
  '09': 'Setembro',
  '10': 'Outubro',
  '11': 'Novembro',
  '12': 'Dezembro',
}

export const formatDateRide = (dateTime: string) => {
  const dateTimeFormat = new Date(dateTime);
  const day = dateTimeFormat.getDate();
  const month = dateTimeFormat.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedTime = `${dateTimeFormat.getHours() - 3}:${dateTimeFormat.getMinutes()}`;
  const formattedDateTime = `${day}/${formattedMonth} às ${formattedTime}`;

  return formattedDateTime;
}

export const formatDateTime = (date: string, time: string) => {
  const [hour, minute] = time.split(':');
  const dateTimeString = `${date}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
  const fullDateTime = new Date(dateTimeString).toISOString();
  return fullDateTime;
}

export const formatarData = (data: string): string => {
  const [date, hour] = data.split(',');
  console.log(date)
  console.log(hour)
  const [day, month, year] = date.split('/')

  return `${day}/${month} ás ${hour.slice(0, 6)}`
  // const dataAtual = new Date();
  // const dataRecebida = new Date(data);

  // const diasSemana = [
  //   "do domingo",
  //   "da segunda-feira",
  //   "da terça-feira",
  //   "da quarta-feira",
  //   "da quinta-feira",
  //   "da sexta-feira",
  //   "do sábado"
  // ];

  // let resultado = "";

  // if (dataAtual.getDate() === dataRecebida.getDate()) {
  //   resultado = "hoje";
  // } else {
  //   resultado = diasSemana[dataRecebida.getDay()];
  // }

  // const horas = (dataRecebida.getHours() - 3).toString().padStart(2, "0");
  // const minutos = dataRecebida.getMinutes().toString().padStart(2, "0");

  // return `${horas}:${minutos} ${resultado}`;
}

export function formatarDate(data: string): string {
  const [date, hour] = data.split(',');
  const [dia, mes, ano] = date.split('/');
  // const dataRecebida = parseISO(data);
  // const dataFormatada = format(dataRecebida, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
  const dataFormatada = `${dia} de ${MESES[mes]} às ${hour.slice(0,6)}`
  return dataFormatada;
}

export function moneyMask(value: any) {
  const numericValue = value.replace(/[^0-9]/g, '');

  if (numericValue === '') {
    return '';
  }

  const integerPart = numericValue.slice(0, -2);
  const decimalPart = numericValue.slice(-2);

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const formattedValue = `R$ ${formattedIntegerPart},${decimalPart}`;

  return formattedValue;
}

export function timeMask(value: any) {

  value = value.replace(/\D/g, "");

  if (value.length > 3) {
    value = value.slice(0, 2) + ":" + value.slice(2, 4);
  } else if (value.length > 1) {
    value = value.slice(0, 1) + ":" + value.slice(1, 3);
  }

  const [hours, minutes] = value.split(":");

  let formattedHours = hours || "";
  let formattedMinutes = minutes || "";

  if (formattedHours && parseInt(formattedHours, 10) > 23) {
    formattedHours = "23";
  }

  if (formattedMinutes && parseInt(formattedMinutes, 10) > 59) {
    formattedMinutes = "59";
  }

  const formattedValue = `${formattedHours}${formattedMinutes ? `:${formattedMinutes}` : ""}`;

  return formattedValue;
}

export function formatarTelefone(numero: string): string {
  // Remover caracteres não numéricos
  const numerosApenas = numero?.replace(/\D/g, '');

  // Verificar se o número tem pelo menos 10 dígitos
  // if (numerosApenas?.length < 10) {
  //   return 'Número de telefone inválido.';
  // }

  // Formatar o número
  const codigoArea = numerosApenas?.slice(0, 2);
  const prefixo = numerosApenas?.slice(2, 6);
  const sufixo = numerosApenas?.slice(6);
  const telefoneFormatado = `(${codigoArea}) ${prefixo}${sufixo}`;

  return telefoneFormatado;
}
