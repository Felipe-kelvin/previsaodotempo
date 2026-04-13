function escapeHtml(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

const caixa = document.querySelector('.caixa-media');

async function Buscar() {
    const cidadeInput = document.querySelector('.input-cidade').value.trim();
    const cidade = escapeHtml(cidadeInput);

    const chave = SUA_API_KEY_AQUI;

    if (!cidade) {
        caixa.innerHTML = `<p class="erro">Por favor digite uma cidade.</p>`;
        return;
    }

    const endereco = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`;

    try {
        let respostaServer = await fetch(endereco);
        let dadosJson = await respostaServer.json();
       // console.log(dadosJson);

        if (!respostaServer.ok) {
            const erroSeguro = escapeHtml(dadosJson.message || respostaServer.status);
            caixa.innerHTML = `<p class="erro">Erro: ${erroSeguro}</p>`;
            return;
        }

        // Protegendo dados da API também
        const nomeCidade = escapeHtml(dadosJson.name);

        caixa.innerHTML = `
        <h2 class="cidade">${nomeCidade}</h2>
        <p class="temperatura">${dadosJson.main.temp}°C</p>
        <img class="icone" src="https://openweathermap.org/img/wn/${dadosJson.weather[0].icon}.png">
        <p class="umidade">Umidade: ${dadosJson.main.humidity}%</p>
        <button class="botao-ia">Sugestão</button>
        `;
    } catch (err) {
        console.error(err);
        caixa.innerHTML = `<p class="erro">Erro de rede. Tente novamente.</p>`;
    }
}