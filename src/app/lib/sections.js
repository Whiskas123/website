export function getAllSections() {
  const sections = [
    { url: "50-aos-25-abril", title: "50 anos do 25 de Abril" },
    { url: "salarios-ontem-hoje", title: "Salários ontem e hoje" },
    { url: "plataformas-digitais", title: "Plataformas Digitais" },
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
