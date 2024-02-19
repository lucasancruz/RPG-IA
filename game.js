const gameContainer = document.getElementById('game-container');

// Classes
const classes = [
    { name: 'Guerreiro', description: 'Um guerreiro forte e destemido, habilidoso em combate.' },
    { name: 'Mago', description: 'Um mago sábio e poderoso com controle sobre forças mágicas.' },
    { name: 'Ladino', description: 'Um ladino furtivo e astuto, habilidoso em enganação e agilidade.' }
];

// Game State
let gameState = {
    class: null,
    currentStage: 0,
    lastChoice: -1,
    goodChoices: 0,
    neutralChoices: 0,
    badChoices: 0,
    storyTexts: [
        "Após a batalha inicial contra as forças de Malgrim, você encontra Sir Alderic, um guerreiro experiente com uma aura de sabedoria. Ele oferece treinamento para aprimorar suas habilidades.",
        "Durante a jornada, você encontra uma cidade em desespero, atacada pelas criaturas de Malgrim. A população pede sua ajuda.",
        "Um mapa antigo revela uma passagem secreta que encurtará sua jornada, mas a passagem está repleta de armadilhas.",
        "Você se depara com um antigo templo, onde um oráculo oferece vislumbres do futuro. As visões são perturbadoras.",
        "Chegando ao coração do território controlado por Malgrim, você se depara com uma fortaleza protegida por magia negra."
    ],
    optionsTable: [
        [
            { text: "Aceitar o Treinamento: Fortalecer suas habilidades para enfrentar os desafios vindouros.", type: "bom" },
            { text: "Explorar a Região em Busca de Aliados: Buscar aliados que possam se unir à sua causa.", type: "neutro" },
            { text: "Aprimorar suas Habilidades Mágicas: Focar em magias para enfrentar Malgrim.", type: "ruim" },
        ],
        [
            { text: "Proteger a Cidade: Defender a cidade contra as criaturas, ganhando lealdade dos habitantes.", type: "bom" },
            { text: "Buscar Auxílio Mágico para a Cidade: Tentar encontrar uma solução mágica para os problemas da cidade.", type: "neutro" },
            { text: "Seguir em Frente Ignorando a Cidade: Continuar a jornada sem se envolver em questões locais.", type: "ruim" },
        ],
        [
            { text: "Consultar Aliados para Conselhos: Pedir a opinião de aliados sobre a decisão.", type: "bom" },
            { text: "Seguir o Caminho Conhecido: Evitar a passagem secreta e seguir o caminho seguro.", type: "neutro" },
            { text: "Arriscar a Passagem Secreta: Enfrentar as armadilhas para economizar tempo.", type: "ruim" },
        ],
        [
            { text: "Ignorar as Visões e Continuar a Jornada: Recusar-se a ser influenciado pelas visões.", type: "bom" },
            { text: "Procurar Respostas nas Visões: Investigar mais a fundo as visões para obter orientação.", type: "neutro" },
            { text: "Alterar o Curso para Evitar a Profecia: Mudar a rota da jornada com base nas visões.", type: "ruim" },
        ],
        [
            { text: "Infiltrar-se na Fortaleza: Tentar uma abordagem furtiva para evitar confrontos diretos.", type: "bom" },
            { text: "Enfrentar as Tropas de Malgrim: Lutar contra as forças do vilão em uma batalha aberta.", type: "neutro" },
            { text: "Buscar Aliados para o Ataque: Reunir aliados para aumentar suas chances de sucesso.", type: "ruim" },
        ],
    ],
    consequencesTable: [
        [
            "Sob a orientação de Sir Alderic, você aprimora suas habilidades de combate. Seus músculos ficam mais firmes, e sua perícia com a espada se torna notável. O guerreiro experiente compartilha histórias de suas próprias batalhas e aconselha sobre a importância de escolher aliados sábios.",
            "Você parte em uma jornada pela região, conhecendo diferentes comunidades. Alguns se juntam a você, inspirados por sua coragem, enquanto outros permanecem céticos. A diversidade de habilidades e histórias dos aliados em potencial é intrigante.",
            "Ao dedicar tempo ao estudo das artes mágicas, você desbloqueia novos feitiços e aprimora seu controle sobre a magia. Cada feitiço aprendido é uma arma poderosa contra as forças das trevas."
        ],
        [
            "Você lidera a defesa da cidade, inspirando os habitantes a lutar ao seu lado. A batalha é intensa, mas a cidade é salva. Os habitantes agradecem, e a notícia de sua coragem se espalha.",
            "Você procura um sábio local em busca de ajuda mágica. Juntos, desenvolvem um ritual para repelir as criaturas, protegendo a cidade temporariamente.",
            "Você continua sua jornada sem se envolver nos problemas locais. O olhar triste dos habitantes enquanto você parte ecoa em sua mente."
        ],
        [
            "Você consulta seus aliados sobre a decisão. As opiniões variam, refletindo diferentes perspectivas sobre os riscos e recompensas da passagem secreta.",
            "Ao escolher o caminho seguro, a jornada é mais longa, mas sem grandes desafios. O progresso é constante, mas a sensação de urgência persiste.",
            "Ao adentrar a passagem secreta, cada passo exige cautela. Armadilhas são superadas com astúcia, mas o cansaço e o estresse aumentam."
        ],
        [
            "Você escolhe seguir em frente, rejeitando as visões perturbadoras. A determinação supera o medo, mas a inquietação permanece.",
            "Investigando mais a fundo as visões, você descobre pistas ocultas sobre os planos de Malgrim. As respostas geram mais perguntas, mas uma direção mais clara começa a se formar.",
            "Decidindo alterar o curso da jornada com base nas visões, você evita áreas previamente identificadas como perigosas. O caminho se torna mais longo, mas aparentemente mais seguro."
        ],
        [
            "Silenciosamente, você se move pelas sombras, evitando as sentinelas mágicas. O sigilo é sua aliada, mas o risco de ser descoberto é constante.",
            "Você decide enfrentar as tropas de Malgrim em uma batalha aberta. A coragem inspira seus aliados e incita o medo nas fileiras inimigas.",
            "Reconhecendo a magnitude da fortaleza, você busca aliados para aumentar suas chances de sucesso. Líderes locais e guerreiros corajosos se unem à sua causa."
        ],
    ],
    images: [
        'images/01.jpg',
        'images/02.jpg',
        'images/03.jpg',
        'images/04.jpg',
        'images/05.jpg',
        'images/06.jpg',
        'images/07.jpg',
    ]
};

// Function to start the game
function startGame() {
    gameState.currentStage = 0;
    gameState.lastChoice = -1;
    gameState.goodChoices = 0;
    gameState.neutralChoices = 0;
    gameState.badChoices = 0;
    showIntro();
}

// Function to display the introduction
function showIntro() {
    clearGameContainer();
    appendTextToContainer('Bem-vindo à Aventura de RPG!');
    showClassOptions();
}

// Função para exibir opções de classe como cards
function showClassOptions() {
    appendTextToContainer('Escolha sua classe:');
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
    classes.forEach((characterClass, index) => {
        appendClassCardToContainer(characterClass, index, optionsContainer);
    });
    gameContainer.appendChild(optionsContainer);
}

// Função para adicionar card de classe ao contêiner
function appendClassCardToContainer(characterClass, index, optionsContainer) {
    const card = document.createElement('div');
    card.className = 'option';
    card.addEventListener('click', () => selectClass(index));
    card.innerHTML = `
        <h2 class="text-xl font-semibold mb-2">${characterClass.name}</h2>
        <img src="${getClassImage(characterClass.name)}" alt="${characterClass.name}" class="w-full h-100 object-cover rounded">
    `;
    optionsContainer.appendChild(card);
}

// Função para obter a imagem da classe
function getClassImage(className) {
    // Adicione links para as imagens das classes conforme necessário
    switch (className) {
        case 'Guerreiro':
            return 'images/warrior.jpg';
        case 'Mago':
            return 'images/mage.jpg';
        case 'Ladino':
            return 'images/rogue.jpg';
        default:
            return '';
    }
}

// Function to handle class selection
function selectClass(index) {
    gameState.class = classes[index];
    showStory();
}

// Função para exibir a história
function showStory() {
    clearGameContainer();
    appendTextToContainer('Em um reino vasto e mágico, onde a harmonia entre criaturas místicas e seres humanos já foi a norma, uma sombra sinistra se ergue. O vilão conhecido como Malgrim, um feiticeiro milenar que buscava conhecimento proibido, foi corrompido por poderes sombrios.');
    appendTextToContainer('Malgrim, há muito esquecido pelos contos, retornou com um desejo ardente de dominar todos os reinos conhecidos. Seus olhos brilham com ambição desenfreada, buscando controlar as forças mágicas antigas para alcançar a imortalidade e subjugar todas as formas de vida.');
    appendTextToContainer('Seus seguidores, criaturas das trevas e seres corrompidos por seus encantamentos, espalham medo e desespero por onde passam. O vilão almeja mergulhar o reino na escuridão eterna, transformando cada criatura em uma marionete de sua vontade.')
    appendTextToContainer('Neste cenário de trevas, o destino escolhe você, um herói improvável, para enfrentar Malgrim e deter seu avanço malévolo. Sua jornada será repleta de desafios, escolhas cruciais e a descoberta de seus próprios poderes ocultos. O reino aguarda sua coragem, pois somente através dela a luz poderá prevalecer sobre as sombras.')
    showChoices();
}

async function showChoices() {
    if (gameState.currentStage !== 0) {
        clearGameContainer(); // Limpa o container antes de mostrar as opções
    }

    const currentStage = gameState.currentStage;
    if (currentStage < gameState.consequencesTable.length) {
        showConsequences();
        showStoryText();
        appendImageToContainer(gameState.images[gameState.currentStage]);
        
        const options = gameState.optionsTable[currentStage];
        options.forEach((option, index) => {
            appendButtonToContainer(option.text, () => handleChoice(index));
        });

        if (currentStage !== 0) {
            await playAudio(`audios/consequences/0${currentStage}-0${gameState.lastChoice + 1}.mp3`);
        }
        playAudio(`audios/story/0${currentStage}.mp3`);
    }

}

function showConsequences() {
    if (gameState.lastChoice !== -1) {
        appendTextToContainer(gameState.consequencesTable[gameState.currentStage - 1][gameState.lastChoice])
    }
}

function showStoryText() {
    appendTextToContainer(gameState.storyTexts[gameState.currentStage])
}

// Função para lidar com as escolhas do jogador
function handleChoice(optionIndex) {
    gameState.lastChoice = optionIndex;

    switch (gameState.optionsTable[gameState.currentStage][optionIndex].type) {
        case 'bom':
            gameState.goodChoices++;
            break;
        case 'neutro':
            gameState.neutralChoices++;
            break;
        case 'ruim':
            gameState.badChoices++;
            break;
    }

    // Atualiza a etapa atual do jogo
    if (gameState.currentStage < gameState.storyTexts.length - 1) {
        gameState.currentStage++;
        showChoices();
    } else {
        showEnding();
    }
}

// Lógica para determinar o final do jogo
function showEnding() {
    clearGameContainer();

    const { goodChoices, neutralChoices, badChoices } = gameState;

    if (goodChoices >= neutralChoices && goodChoices >= badChoices) {
        appendTextToContainer('Após enfrentar inúmeras provações, você, herói destemido, confronta Malgrim nas profundezas de sua fortaleza sombria. Com sabedoria e coragem, você derrota o vilão e quebra seu domínio maligno sobre o reino. As criaturas corrompidas são purificadas, e a paz é restaurada. Seu nome torna-se uma lenda de esperança, e o reino floresce sob a luz restaurada da magia benevolente.');
        appendImageToContainer('images/good.jpg')
        playAudio('audios/endings/good.mp3')
    } else if (neutralChoices >= goodChoices && neutralChoices >= badChoices) {
        appendTextToContainer('Suas escolhas ao longo da jornada tiveram impacto, mas o confronto final com Malgrim permanece inconclusivo. O vilão é temporariamente enfraquecido, mas não derrotado. O reino enfrenta tempos turbulentos, mas a semente da resistência é plantada. Você parte em busca de mais conhecimento para enfrentar o mal que ainda se esconde nas sombras.');
        appendImageToContainer('images/neutral.jpg')
        playAudio('audios/endings/neutral.mp3')
    } else {
        appendTextToContainer('Ao chegar diante de Malgrim, suas escolhas conduzem a uma batalha desesperadora. O vilão, fortalecido pelas trevas, prevalece, mergulhando o reino em uma era de escuridão eterna. Criaturas corrompidas espalham o caos, e seu nome é suspirado em lamentos. A esperança desvanece, e o reino enfrenta uma era sombria sob o domínio impiedoso de Malgrim.');
        appendImageToContainer('images/bad.jpg')
        playAudio('audios/endings/bad.mp3')
    }

    appendButtonToContainer('Jogar Novamente', () => startGame());
}

function playAudio(audioSrc) {
    const audio = document.createElement('audio');
    audio.src = audioSrc;
    gameContainer.appendChild(audio);
    return new Promise((resolve, reject) => {
        audio.addEventListener('ended', () => {
            resolve();
        });

        audio.play().catch(error => {
            reject(error);
        });
    });
}

// Helper functions
function clearGameContainer() {
    gameContainer.innerHTML = '';
}

function appendTextToContainer(text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    gameContainer.appendChild(paragraph);
}

function appendButtonToContainer(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'bg-blue-500 text-white px-4 py-2 rounded-md m-2 w-full';
    button.addEventListener('click', onClick);
    gameContainer.appendChild(button);
}

function appendImageToContainer(imgSrc) {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.classList.add('rounded');
    gameContainer.appendChild(img);
}

// Start the game
startGame();
