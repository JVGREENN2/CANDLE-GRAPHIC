// Dados iniciais do gráfico
const initialData = [
    { open: 10, high: 15, low: 9, close: 12 },
    { open: 12, high: 18, low: 11, close: 15 },
    { open: 15, high: 20, low: 14, close: 19 },
    { open: 19, high: 22, low: 18, close: 20 },
    { open: 20, high: 23, low: 19, close: 21 }
];

// Função para gerar o gráfico
function renderChart(data) {
    const trace = {
        x: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5'], // Eixo X
        open: data.map(d => d.open),
        high: data.map(d => d.high),
        low: data.map(d => d.low),
        close: data.map(d => d.close),
        type: 'candlestick',
        increasing: { line: { color: '#00ff00' } }, // Cor verde para alta
        decreasing: { line: { color: '#ff0000' } }  // Cor vermelha para baixa
    };
    const layout = { 
        title: 'Gráfico Candlestick Estilizado',
        xaxis: { title: 'Dias', showgrid: false },
        yaxis: { title: 'Preço', showgrid: true, gridcolor: 'rgba(255, 255, 255, 0.2)' },
        paper_bgcolor: '#000', // Fundo do gráfico
        plot_bgcolor: '#000',  // Fundo da área de plotagem
        font: { color: '#fff' } // Texto branco
    };
    Plotly.newPlot('chart', [trace], layout);
}

// Função para gerar os campos de edição
function generateForm(data) {
    const inputsContainer = document.getElementById('inputs');
    inputsContainer.innerHTML = ''; // Limpa os inputs
    data.forEach((candle, index) => {
        inputsContainer.innerHTML += `
            <h3>Vela ${index + 1}</h3>
            <label>Abertura:</label>
            <input type="number" name="open-${index}" value="${candle.open}" required>
            <label>Alta:</label>
            <input type="number" name="high-${index}" value="${candle.high}" required>
            <label>Baixa:</label>
            <input type="number" name="low-${index}" value="${candle.low}" required>
            <label>Fechamento:</label>
            <input type="number" name="close-${index}" value="${candle.close}" required>
        `;
    });
}

// Manipulação do formulário
document.getElementById('data-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newData = initialData.map((_, index) => ({
        open: parseFloat(formData.get(`open-${index}`)),
        high: parseFloat(formData.get(`high-${index}`)),
        low: parseFloat(formData.get(`low-${index}`)),
        close: parseFloat(formData.get(`close-${index}`))
    }));
    renderChart(newData); // Atualiza o gráfico
});

// Inicializa o gráfico e os inputs
renderChart(initialData);
generateForm(initialData);