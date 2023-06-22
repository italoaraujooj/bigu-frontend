import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

  const horas = (dataRecebida.getHours() - 3).toString().padStart(2, "0");
  const minutos = dataRecebida.getMinutes().toString().padStart(2, "0");

  return `${horas}:${minutos} ${resultado}`;
}

export function formatarDate(data: string): string {
  const dataRecebida = parseISO(data);
  const dataFormatada = format(dataRecebida, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
  return dataFormatada;
}

export function moneyMask(value: any) {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/[^0-9]/g, '');

  // Verifica se o valor está vazio
  if (numericValue === '') {
    return '';
  }

  // Obtém a parte inteira e a parte decimal
  const integerPart = numericValue.slice(0, -2);
  const decimalPart = numericValue.slice(-2);

  // Formata a parte inteira adicionando separadores de milhar
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Monta o valor completo com o prefixo "R$" e a parte inteira e decimal
  const formattedValue = `R$ ${formattedIntegerPart},${decimalPart}`;

  return formattedValue;
}

export function timeMask(value: any) {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/[^0-9]/g, '');

  // Verifica se o valor está vazio
  if (numericValue === '') {
    return '';
  }

  // Obtém as duas primeiras posições para as horas
  let hours = numericValue.slice(0, 2);

  // Obtém as duas últimas posições para os minutos
  let minutes = numericValue.slice(2, 4);

  // Validações para garantir que as horas e minutos estejam no formato correto
  if (hours !== '') {
    if (parseInt(hours, 10) >= 24) {
      hours = '00';
    } else if (hours.length === 1 && parseInt(hours, 10) > 1) {
      hours = `${hours}`;
    } else if (hours.length === 2 && parseInt(hours, 10) === 0) {
      hours = '01';
    } else if (hours.length === 2 && parseInt(hours, 10) >= 24) {
      hours = '00';
    }
  }

  if (minutes !== '') {
    if (parseInt(minutes, 10) > 59) {
      minutes = '59';
    } else if (minutes.length === 1 && parseInt(minutes, 10) > 5) {
      minutes = `0${minutes}`;
    }
  }

  // Monta o valor completo no formato HH:mm
  const formattedValue = `${hours}:${minutes}`;

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
