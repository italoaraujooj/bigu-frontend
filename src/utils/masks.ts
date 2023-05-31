export const formatDateTime = (date: string, time: string) => {
  const [hour, minute] = time.split(':');
  const dateTimeString = `${date}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
  const fullDateTime = new Date(dateTimeString).toISOString();
  return fullDateTime;
}