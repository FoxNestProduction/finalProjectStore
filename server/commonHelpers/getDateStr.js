module.exports = function getDateStr() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const monthsAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return `${monthsAbbreviations[month]} ${day}, ${year}`;
};