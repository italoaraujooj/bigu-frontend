import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MESES: any = {
  '01': 'Janeiro',
  '02': 'Fevereiro',
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
  const date = new Date(data);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} de ${MESES[month]} às ${hours}h${minutes}`;
}

export function formatarDate(data: string): string {
  const [date, time] = data.split(',');
  let [dia, mes, ano] = date.trim().split('/');

  if (mes.length === 1) {
    mes = `0${mes}`;
  }

  const [hour, minute, second] = time.trim().split(':');

  const dataFormatada = `${dia} de ${MESES[mes]} às ${hour}:${minute}`;
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
  
  if (value.length === 5) {
    if (formattedMinutes && parseInt(formattedMinutes, 10) > 59) {
      formattedMinutes = "59";
    }
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
