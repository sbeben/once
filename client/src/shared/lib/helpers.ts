const mmFromDate = (date: Date) =>
  date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
const ddFromDate = (date: Date) =>
  date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
const hhFromDate = (date: Date) =>
  date.getHours() > 9 ? date.getHours() : "0" + date.getHours();

export const fullDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return mmFromDate(date) + "." + ddFromDate(date) + "." + date.getFullYear();
};
