# Salvuspet 🐾 - Proteção Animal

Uma plataforma de financiamento coletivo focada exclusivamente na causa animal. Este projeto é um **protótipo imersivo, estático e responsivo** desenvolvido para fins educacional, conectando doadores apaixonados a protetores e ONGs dedicadas.

## ✨ Características do Protótipo

- **Design:** Estética de rascunho de produção com bordas grossas, sombras sólidas e tipografia amigável (**Fredoka**).
- **Perfis Distintos:** Fluxos de experiência personalizados para **Doadores** e **Protetores/ONGs**.
- **Simulação de Falhas:** Tratamento de erros imersivo (usuário já cadastrado, senhas curtas) com animações de feedback.
- **Narrativa Imersiva:** Linguagem baseada em roteiros de cinema ("Cenas", "Ação", "Arco Narrativo").
- **Totalmente Responsivo:** Adaptado para celulares, tablets e desktops.

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3**
- **Tailwind CSS (via CDN):** Para estilização moderna e rápida.
- **JavaScript (Vanilla):** Lógica de navegação, manipulação de DOM e simulação de estados.
- **Font Awesome:** Ícones vetoriais para interface.

## 📂 Estrutura de Arquivos

```text
├── index.html        # Página inicial (Landing Page e Login)
├── dashboard.html    # Board de Produção (Painel administrativo Doador/Protetor)
├── 404.html          # Página de erro "Cena Perdida"
├── css/
│   └── styles.css    # Estilos customizados e animações de storyboard
└── js/
    └── script.js     # Lógica do protótipo e tratamento de falhas simuladas
```

## 🚀 Como Executar

Abra o arquivo `index.html` em qualquer navegador moderno. Para testar as falhas simuladas:
- No cadastro, use o e-mail `admin@salvuspet.com.br` para erro de duplicidade.
- Use uma senha menor que 6 caracteres para erro de validação.

---

*Desenvolvido por ed, william, alaide e arthur. para os nossos amiguinhos de quatro patas.*
