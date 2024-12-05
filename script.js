const pages = {
    home: document.getElementById("home-page"),
    question: document.getElementById("question-page"),
    final: document.getElementById("final-page"),
  };
  
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  
  let currentQuestionIndex = 0;
  let selectedCountry = null;
  
  const questions = {
    default: [
      {
        text: "Você já quis realizar o intercâmbio?",
        options: ["Sim", "Claro"], // Ambas levam para a próxima pergunta
      },
      {
        text: "Para qual país você gostaria de ir?",
        options: ["EUA", "Espanha", "França", "Canadá", "Argentina", "Irlanda"], // Escolhe o país
      },
    ],
    countries: {
      EUA: [
        { text: "Qual é a capital dos EUA?", options: ["Nova York", "Washington, D.C.", "Los Angeles"], correct: 1 },
        { text: "Qual é o maior estado dos EUA?", options: ["Texas", "Alasca", "Califórnia"], correct: 1 },
        { text: "Qual é a famosa comida dos EUA?", options: ["Hambúrguer", "Sushi", "Pizza"], correct: 0 },
        { text: "Onde está localizada a Estátua da Liberdade?", options: ["Nova York", "Chicago", "Houston"], correct: 0 },
        { text: "Quantos estados há nos EUA?", options: ["48", "50", "52"], correct: 1 },
      ],
      Espanha: [
        { text: "Qual é a capital da Espanha?", options: ["Madrid", "Barcelona", "Sevilha"], correct: 0 },
        { text: "Qual é uma famosa dança da Espanha?", options: ["Flamenco", "Samba", "Tango"], correct: 0 },
        { text: "Qual idioma se fala na Espanha?", options: ["Espanhol", "Francês", "Português"], correct: 0 },
        { text: "Qual cidade é famosa pela Sagrada Família?", options: ["Barcelona", "Madrid", "Valência"], correct: 0 },
        { text: "O que é uma 'Paella'?", options: ["Comida", "Música", "Cidade"], correct: 0 },
      ],
      França: [
        { text: "Qual é a capital da França?", options: ["Lyon", "Paris", "Marselha"], correct: 1 },
        { text: "Qual é a torre famosa da França?", options: ["Eiffel", "Pisa", "CN Tower"], correct: 0 },
        { text: "Qual é um prato típico francês?", options: ["Croissant", "Pizza", "Tacos"], correct: 0 },
        { text: "Qual é o rio que corta Paris?", options: ["Sena", "Tâmisa", "Danúbio"], correct: 0 },
        { text: "Qual é o famoso museu em Paris?", options: ["Louvre", "Prado", "MoMA"], correct: 0 },
      ],
      Canadá: [
        { text: "Qual é a capital do Canadá?", options: ["Toronto", "Ottawa", "Vancouver"], correct: 1 },
        { text: "Qual folha simboliza o Canadá?", options: ["Maple", "Oak", "Pine"], correct: 0 },
        { text: "Qual é o esporte nacional do Canadá?", options: ["Hockey", "Futebol", "Baseball"], correct: 0 },
        { text: "O Canadá é famoso por suas?", options: ["Florestas", "Desertos", "Montanhas"], correct: 0 },
        { text: "Qual animal está na moeda de 1 dólar canadense?", options: ["Urso", "Pato", "Loon"], correct: 2 },
      ],
      Argentina: [
        { text: "Qual é a capital da Argentina?", options: ["Buenos Aires", "Mendoza", "Córdoba"], correct: 0 },
        { text: "Qual é a dança típica da Argentina?", options: ["Tango", "Salsa", "Flamenco"], correct: 0 },
        { text: "Qual é o esporte mais popular na Argentina?", options: ["Futebol", "Basquete", "Tênis"], correct: 0 },
        { text: "Qual bebida é tradicional na Argentina?", options: ["Mate", "Café", "Chá"], correct: 0 },
        { text: "Qual montanha famosa está na Argentina?", options: ["Aconcágua", "Everest", "Kilimanjaro"], correct: 0 },
      ],
      Irlanda: [
        { text: "Qual é a capital da Irlanda?", options: ["Dublin", "Belfast", "Cork"], correct: 0 },
        { text: "Qual é o símbolo nacional da Irlanda?", options: ["Trevo", "Maple Leaf", "Estrela"], correct: 0 },
        { text: "Qual é uma famosa festa da Irlanda?", options: ["St. Patrick's Day", "Thanksgiving", "Carnaval"], correct: 0 },
        { text: "Qual cor está associada à Irlanda?", options: ["Verde", "Azul", "Vermelho"], correct: 0 },
        { text: "Qual é o famoso penhasco da Irlanda?", options: ["Cliffs of Moher", "Grand Canyon", "Mont Saint-Michel"], correct: 0 },
      ],
    },
  };
  
  function startQuiz() {
    switchPage(pages.home, pages.question);
    loadQuestion();
  }
  
  function loadQuestion() {
    const isCountrySelection = !selectedCountry && currentQuestionIndex === 1;
    const countryQuestions = questions.countries[selectedCountry];
    const questionSet = selectedCountry && countryQuestions ? countryQuestions : questions.default;
  
    const question = questionSet[currentQuestionIndex];
    questionText.textContent = question.text;
    optionsContainer.innerHTML = "";
  
    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.className = "option";
      button.onclick = () => handleOptionClick(index, question.correct, isCountrySelection);
      optionsContainer.appendChild(button);
    });
  }
  
  function handleOptionClick(selectedIndex, correctIndex, isCountrySelection) {
    if (currentQuestionIndex === 0) {
      // Se for a pergunta "Sim ou Claro", apenas passa para a próxima pergunta
      currentQuestionIndex++;
      loadQuestion();
      return;
    }
  
    if (isCountrySelection) {
      // Define o país selecionado
      selectedCountry = questions.default[1].options[selectedIndex];
      currentQuestionIndex = 0; // Reinicia para começar as perguntas do país
      loadQuestion();
      return;
    }
  
    const countryQuestions = questions.countries[selectedCountry];
  
    // Valida se a resposta está correta
    if (selectedIndex !== correctIndex) {
      return alert("Tente novamente!");
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex >= countryQuestions.length) {
      switchPage(pages.question, pages.final);
    } else {
      loadQuestion();
    }
  }
  
  function switchPage(current, next) {
    current.classList.remove("active");
    current.classList.add("hidden");
    next.classList.remove("hidden");
    next.classList.add("active");
  }
  
  // Inicializa a página inicial
  pages.home.classList.add("active");
  