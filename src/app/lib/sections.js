export function getAllSections() {
  const sections = [
    { url: "temas-centrais", title: "Temas Centrais" },
    { url: "mesa-controversia", title: "Mesa de Controvérsia" },
    { url: "internacional", title: "Internacional" },
    { url: "abecedario-critico", title: "Abecedário Crítico" },
    { url: "retratos", title: "Retratos" },
    { url: "culturas-do-trabalho", title: "Culturas do Trabalho" },
    { url: "recensoes", title: "Recensões" },
    { url: "outros-textos", title: "Outros Textos" },
    { url: "a-ler-e-a-ver", title: "A Ler e a Ver" },
    { url: "consultorio", title: "Consultório" },
  ];

  // Return sections directly without wrapping in params
  return sections;
}
