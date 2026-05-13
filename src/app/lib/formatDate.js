export function formatDatePT(dateString) {
  if (!dateString) return null;
  const months = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ];
  const date = new Date(dateString);
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}
