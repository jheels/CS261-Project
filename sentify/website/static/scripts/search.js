var companies = [];

window.onload = function() {
    fetch('/api/get/companies')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => companies = data)
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function searchCompany(query) {
    let results = query ? companies.filter(company => company.company_name.toLowerCase().includes(query.toLowerCase()) || company.stock_ticker.toLowerCase().includes(query.toLowerCase())) : [];
    results = results.slice(0, 4); // limit the results to a maximum of 4

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // clear previous results

    if (results.length === 0) {  
        if (query) {
            resultsDiv.innerHTML = `<div class="result-item"><span>No Matches...</span></div>`;
        } else {
            resultsDiv.style.display = 'none';
        }
    } else {
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = results.map(company => `
            <a href="/companies/${company.stock_ticker}">
                <div class="result-item">
                    <span>${company.company_name}</span>
                    <span class="ticker">${company.stock_ticker}</span>
                </div>
            </a>
        `).join('');
    }
}