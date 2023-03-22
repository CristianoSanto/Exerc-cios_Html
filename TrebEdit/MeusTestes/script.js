const searchForm = document.getElementById('search-form');
const marcaSelect = document.getElementById('marca');
const modeloSelect = document.getElementById('modelo');
const resultsDiv = document.getElementById('results');

marcaSelect.addEventListener('change', () => {
  fetch(`/api/modelos?marca=${marcaSelect.value}`)
    .then(response => response.json())
    .then(data => {
      modeloSelect.innerHTML = '';
      data.forEach(modelo => {
        const option = document.createElement('option');
        option.value = modelo;
        option.text = modelo;
        modeloSelect.appendChild(option);
      });
    })
    .catch(error => console.error(error));
});

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const marca = marcaSelect.value;
  const modelo = modeloSelect.value;

  fetch(`/api/carros?marca=${marca}&modelo=${modelo}`)
    .then(response => response.json())
    .then(data => {
      resultsDiv.innerHTML = '';
      if (data.length === 0) {
        resultsDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
      } else {
        const table = document.createElement('table');
        table.innerHTML = `
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
          </tr>
        `;
        data.forEach(carro => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${carro.marca}</td>
            <td>${carro.modelo}</td>
            <td>${carro.ano}</td>
          `;
          table.appendChild(row);
        });
        resultsDiv.appendChild(table);
      }
    })
    .catch(error => console.error(error));
});
