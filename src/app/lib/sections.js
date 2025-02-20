const sections = [
  { url: "50-aos-25-abril", title: "50 anos do 25 de Abril" },
  { url: "salarios-ontem-hoje", title: "Salários ontem e hoje" },
  { url: "plataformas-digitais", title: "Plataformas Digitais" },
  { url: "recensoes", title: "Recensões" },
  { url: "mesa-controversia", title: "Mesa de Controvérsia" },
  { url: "internacional", title: "Internacional" },
  { url: "abecedario-critico", title: "Abecedário Crítico" },
  { url: "retratos", title: "Retratos" },
  { url: "culturas-do-trabalho", title: "Culturas do Trabalho" },
  { url: "a-ler-e-a-ver", title: "A Ler e a Ver" },
  { url: "consultorio-juridico", title: "Consultório Jurídico" },
  { url: "todos-os-textos", title: "Todos os textos" },
];

export function getAllSections() {
  return sections;
}

export function getUrlByTitle(title) {
  const section = sections.find(
    (section) => section.title.toLowerCase() === title.toLowerCase()
  );
  return section ? section.url : null;
}
