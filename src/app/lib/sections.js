const sections = [

  {url: "trabalho-e-imigracao", title: "Trabalho e Imigração", isTemaCentral: true, isNew: true},
  {
    url: "contra-reforma-laboral",
    title: "Contra-reforma laboral",      files: [
      {
        path: "/files/preaviso_cgtp.pdf",
        title: "Pré-aviso de Greve Geral da CGTP",
      },
      {
        path: "/files/preaviso_ugt.pdf",
        title: "Pré-aviso de Greve Geral da UGT",
      },
      {
        path: "/files/razoes_cgtp.pdf",
        title:
          "Razões para Combater as Propostas do Governo PSD/CDS para a Legislação Laboral (CGTP)",
      },
      {
        path: "/files/resolucao_ugt.pdf",
        title: "Resolução do Secretariado Nacional da UGT",
      },
    ], },
  { url: "50-aos-25-abril", title: "50 anos do 25 de Abril", isTemaCentral: true},
  { url: "salarios-ontem-hoje", title: "Salários ontem e hoje",isTemaCentral: true },
  { url: "plataformas-digitais", title: "Plataformas Digitais", isTemaCentral: true },
  { url: "recensoes", title: "Recensões" },
  { url: "mesa-controversia", title: "Mesa de Controvérsia" },
  { url: "internacional", title: "Internacional" },
  { url: "abecedario-critico", title: "Abecedário Crítico" },
  { url: "culturas-do-trabalho", title: "Culturas do Trabalho" },
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
