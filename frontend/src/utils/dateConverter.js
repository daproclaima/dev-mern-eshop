export const convertDate = (inputFormat) => {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  const d = new Date(inputFormat);

  return `${[d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join(
    "/"
  )} at ${d.getHours()}:${d.getMinutes()}`;
};
