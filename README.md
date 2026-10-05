# Que Força É Essa — website

Site da revista sobre os mundos do trabalho. Next.js (App Router), artigos em Markdown, alojado na Vercel.

## Correr localmente

```bash
bun install
bun run dev
```

Abre em [http://localhost:3000](http://localhost:3000).

## Publicar um artigo

1. Criar `src/app/posts/<id>.md` (o id é o número seguinte) com o cabeçalho:

   ```md
   ---
   title: 'Título'
   subtitle: 'Subtítulo (também usado como descrição nas partilhas)'
   date: '2026-09-30'
   author: "Nome"            # ou uma lista: ["Nome A", "Nome B"]
   authorDescription: "Opcional"
   section: 'Internacional'  # título exato de uma secção em src/app/lib/sections.js
   ---
   ```

2. Pôr a imagem de capa em `public/images/<id>.jpg` (JPEG, ~1600px de largura no máximo; `bun run optimize-images` reduz as maiores). A primeira imagem do texto é a usada nas partilhas em redes sociais.
3. Acrescentar o id a `bigSlideConfigs` ou `otherSlideConfigs` em `src/app/page.js` para aparecer na página inicial.

No texto, `![legenda](/images/ficheiro.jpg)` mostra a imagem com legenda e um link para um ficheiro `.mp3` é mostrado como leitor de áudio.

## Onde está o quê

- `src/app/lib/sections.js` — secções do menu (e PDFs associados a uma secção).
- `src/app/lib/site.js` — endereço e descrição do site (usados no sitemap, RSS e partilhas).
- `public/pdf/` — edições da revista em PDF, ligadas em `src/app/components/magazineDropdown.js`.
