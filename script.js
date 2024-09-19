document.addEventListener('DOMContentLoaded', function() {
    fetchLocation(); // Automatically fetch location when the page loads
});

function fetchLocation() {
    fetch('http://ip-api.com/json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.status === 'success') {
                displayResults(data);
                initMap(data.lat, data.lon); // Initialize map with IP location
            } else {
                document.getElementById('result').innerText = 'Unable to retrieve location.';
            }
        })
        .catch(error => {
            console.error('Error fetching location:', error);
            document.getElementById('result').innerText = 'Error fetching location.';
        });
}

function displayResults(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    // Create result boxes for each piece of information
    const info = [
        { label: 'IP Address', value: data.query },
        { label: 'City', value: data.city },
        { label: 'Region', value: data.regionName },
        { label: 'Country', value: data.country },
        { label: 'Latitude', value: data.lat.toFixed(4) },
        { label: 'Longitude', value: data.lon.toFixed(4) },
        { label: 'ISP', value: data.isp }
    ];

    info.forEach((item) => {
        const box = document.createElement('div');
        box.className = 'result-box';
        box.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
        resultDiv.appendChild(box);
    });
}

function initMap(lat, lon) {
    const map = L.map('map').setView([lat, lon], 13); // Set map center

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    L.marker([lat, lon]).addTo(map) // Set marker at user's location
        .bindPopup('You are here!')
        .openPopup();
}
