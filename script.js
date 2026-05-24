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
                        return value + ' people';
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
                        return 'Month #' + context[0].label;
                    },
                    label: function() {
                        return ''; // Hide default labels
                    },
                    afterBody: function(context) {
                        const index = context[0].dataIndex;
                        const data = rawData[index];
                        return [
                            `Prospects: ${data.prospects}`,
                            `Leads: ${data.leads}`,
                            `Customers: ${data.customers}`
                        ];
                    }
                }
            }
        }
    }
});

const leadRate = document.getElementById('leadRate');
const leadRateVal = document.getElementById('leadRateVal');
leadRate.addEventListener('input', (e) => {
    leadRateVal.textContent = parseFloat(e.target.value).toFixed(2) + '%';
});

const prospectRate = document.getElementById('prospectRate');
const prospectRateVal = document.getElementById('prospectRateVal');
prospectRate.addEventListener('input', (e) => {
    prospectRateVal.textContent = parseFloat(e.target.value).toFixed(2) + '%';
});