import { CustomDate } from "./PropsTypes";
export const WeekDays = () => ["D", "S", "T", "Q", "Q", "S", "S"];

export function generateDateList(current: Date): CustomDate[][] {
  const date = new Date(current.getFullYear(), current.getMonth(), 1);
  let temp = date.getDate();
  let dayOfWeek = date.getDay();
  let lastDayOfMonth = new Date(
    current.getFullYear(),
    current.getMonth() + 1,
    0
  );
  let day = 0 - dayOfWeek;

  const month = [];
  let list: CustomDate[] = [];
  for (let i = 0; i < 6; i++) {
    list = [];
    for (let j = 1; j <= 7; j++) {
      day++;
      if (day >= 1 && day <= lastDayOfMonth.getDate()) {
        list.push({
          date: new Date(current.getFullYear(), current.getMonth(), day),
          enabled: true,
        });
      } else {
        list.push({
          date: new Date(current.getFullYear(), current.getMonth(), day),
          enabled: false,
        });
      }
    }
    month.push(list);
  }
  return month;
}

export function dateCompare(data1: Date, data2: Date): number {
  const temp = new Date(data1);
  const temp2 = new Date(data2);
  if (
    temp.getDate() === temp2.getDate() &&
    temp.getMonth() === temp2.getMonth() &&
    temp.getFullYear() === temp2.getFullYear()
  ) {
    return 0;
  } else if (
    temp.getDate() > temp2.getDate() &&
    temp.getMonth() === temp2.getMonth() &&
    temp.getFullYear() === temp2.getFullYear()
  ) {
    return 1;
  }
  return -1;
  // return (
  //   temp.getDate() === temp2.getDate() &&
  //   temp.getMonth() === temp2.getMonth() &&
  //   temp.getFullYear() === temp2.getFullYear()
  // );
}
