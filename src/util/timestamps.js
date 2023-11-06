import dayjs from "dayjs";

export const tsToSimple = (ts) => {
  console.log(ts);
  return dayjs(ts).format("MMM DD, YYYY");
};
