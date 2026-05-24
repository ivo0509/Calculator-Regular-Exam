const ctx = document.getElementById('myChart');

const rawData = [
    { month: '1', prospects: 30, leads: 8, customers: 3 },
    { month: '2', prospects: 45, leads: 10, customers: 4 },
    { month: '3', prospects: 63, leads: 13, customers: 5 },
    { month: '4', prospects: 85, leads: 18, customers: 7 },
    { month: '5', prospects: 105, leads: 22, customers: 9 },
    { month: '6', prospects: 125, leads: 25, customers: 10 },
];

const customersData = rawData.map(d => d.customers);
const leadsPortion = rawData.map(d => d.leads - d.customers);
const prospectsPortion = rawData.map(d => d.prospects - d.leads);
const labels = rawData.map(d => d.month);

let currentLang = 'en';
const translations = {
    en: {
        language: "Language",
        currency: "Currency",
        campaignStart: "Campaign Start",
        campaignEnd: "Campaign End",
        totalRevenue: "Total Revenue",
        avgOrderValue: "Avg. Order Value",
        prospects: "Prospects",
        leads: "Leads",
        customers: "Customers",
        leadResponseRate: "Lead Response Rate",
        prospectResponseRate: "Prospect Response Rate",
        people: "people",
        months: "Months",
        monthLabel: "Month #"
    },
    bg: {
        language: "Език",
        currency: "Валута",
        campaignStart: "Начало на кампания",
        campaignEnd: "Край на кампания",
        totalRevenue: "Общи приходи",
        avgOrderValue: "Ср. стойност на поръчка",
        prospects: "Контакти",
        leads: "Потенциални клиенти",
        customers: "Клиенти",
        leadResponseRate: "Процент на отговор от потенциални клиенти",
        prospectResponseRate: "Процент на отговор от контакти",
        people: "души",
        months: "Месеци",
        monthLabel: "Месец №"
    }
};

const flags = {
    en: "🇺🇸",
    bg: "🇧🇬"
};

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Customers',
                data: customersData,
                backgroundColor: '#cdd1d8',
                barPercentage: 0.9,
                categoryPercentage: 0.95
            },
            {
                label: 'Leads',
                data: leadsPortion,
                backgroundColor: '#aeb4c0',
                barPercentage: 0.9,
                categoryPercentage: 0.95
            },
            {
                label: 'Prospects',
                data: prospectsPortion,
                backgroundColor: '#838c9c',
                barPercentage: 0.9,
                categoryPercentage: 0.95
            }
        ]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                max: 135,
                grid: {
                    color: '#2e3c54',
                    drawBorder: false
                },
                ticks: {
                    color: '#94a3b8',
                    stepSize: 20,
                    callback: function(value) {
                        return value + ' ' + translations[currentLang].people;
                    },
                    font: {
                        size: 10
                    }
                },
                border: {
                    display: false
                }
            },
            y: {
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 11
                    }
                },
                title: {
                    display: true,
                    text: 'Months',
                    color: '#94a3b8',
                    font: {
                        size: 11
                    }
                },
                border: {
                    color: '#2e3c54'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'y',
                intersect: false,
                backgroundColor: '#5c677d',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#ffffff55',
                borderWidth: 1,
                padding: 10,
                callbacks: {
                    title: function(context) {
                        return translations[currentLang].monthLabel + context[0].label;
                    },
                    label: function() {
                        return ''; // Hide default labels
                    },
                    afterBody: function(context) {
                        const index = context[0].dataIndex;
                        const data = rawData[index];
                        return [
                            `${translations[currentLang].prospects}: ${data.prospects}`,
                            `${translations[currentLang].leads}: ${data.leads}`,
                            `${translations[currentLang].customers}: ${data.customers}`
                        ];
                    }
                }
            }
        }
    }
});

const leadRate = document.getElementById('leadRate');
const leadRateVal = document.getElementById('leadRateVal');
const prospectRate = document.getElementById('prospectRate');
const prospectRateVal = document.getElementById('prospectRateVal');

const totalRevenueInput = document.getElementById('totalRevenue');
const avgOrderValueInput = document.getElementById('avgOrderValue');
const prospectsValueDisplay = document.getElementById('prospectsValue');
const leadsValueDisplay = document.getElementById('leadsValue');
const customersValueDisplay = document.getElementById('customersValue');

function calculateMetrics() {
    const totalRevenue = parseFloat(totalRevenueInput.value) || 0;
    const avgOrderValue = parseFloat(avgOrderValueInput.value) || 1; 
    const leadResponseRate = parseFloat(leadRate.value) || 1;
    const prospectResponseRate = parseFloat(prospectRate.value) || 1;

    // Formula 01
    const customers = Math.round(totalRevenue / avgOrderValue);
    // Formula 02
    const leads = Math.round((customers * 100) / leadResponseRate);
    // Formula 03
    const prospects = Math.round((leads * 100) / prospectResponseRate);

    customersValueDisplay.textContent = customers;
    leadsValueDisplay.textContent = leads;
    prospectsValueDisplay.textContent = prospects;
}

leadRate.addEventListener('input', (e) => {
    leadRateVal.textContent = parseFloat(e.target.value).toFixed(2) + '%';
    calculateMetrics();
});

prospectRate.addEventListener('input', (e) => {
    prospectRateVal.textContent = parseFloat(e.target.value).toFixed(2) + '%';
    calculateMetrics();
});

totalRevenueInput.addEventListener('input', calculateMetrics);
avgOrderValueInput.addEventListener('input', calculateMetrics);

// Initial calculation on load
calculateMetrics();

const languageFlag = document.getElementById('languageFlag');

// Custom language dropdown
const languageDropdown = document.getElementById('languageDropdown');
const languageSelected = document.getElementById('languageSelected');
const languageOptions = document.getElementById('languageOptions');

const langFlagMap = { en: 'fi-us', bg: 'fi-bg' };
const langLabelMap = { en: 'English', bg: 'Български' };

languageSelected.addEventListener('click', () => {
    languageDropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!languageDropdown.contains(e.target)) {
        languageDropdown.classList.remove('open');
    }
});

languageOptions.querySelectorAll('.custom-select__option').forEach(option => {
    option.addEventListener('click', () => {
        currentLang = option.dataset.value;

        // Update the selected display
        languageSelected.innerHTML = `
            <span class="fi ${langFlagMap[currentLang]}"></span>
            <span class="custom-select__label">${langLabelMap[currentLang]}</span>
            <span class="custom-select__arrow">&#8597;</span>
        `;
        languageDropdown.classList.remove('open');

        // Update HTML labels
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });

        // Update Chart datasets
        myChart.data.datasets[0].label = translations[currentLang].customers;
        myChart.data.datasets[1].label = translations[currentLang].leads;
        myChart.data.datasets[2].label = translations[currentLang].prospects;

        // Update Chart axes
        myChart.options.scales.y.title.text = translations[currentLang].months;

        myChart.update();
    });
});

const currencySelect = document.getElementById('currencySelect');
const currencyDisplays = document.querySelectorAll('.currencyDisplay');

const currencySymbols = {
    usd: "$",
    eur: "€"
};

currencySelect.addEventListener('change', (e) => {
    const symbol = currencySymbols[e.target.value];
    currencyDisplays.forEach(el => el.textContent = symbol);
});
