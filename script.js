document.getElementById('search-btn').addEventListener('click', async function () {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert('Please enter a city or place name.');
        return;
    }

    const url = `https://real-time-events-search.p.rapidapi.com/search-events?query=${encodeURIComponent(city)}&date=any&is_virtual=false&start=0`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c159848d2fmsh10a8a8d67ebb836p11e534jsn47002faaa08c',
            'x-rapidapi-host': 'real-time-events-search.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Assuming API returns JSON data
        displayEvents(data.data || []); // Adjust based on actual API response structure
    } catch (error) {
        console.error(error);
        alert('Failed to fetch events. Please try again later.');
    }
});

function displayEvents(events) {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = ''; // Clear previous results

    if (events.length === 0) {
        eventsList.innerHTML = '<p>No events found for this place.</p>';
        return;
    }

    // Filter events to only include those with the 'tags' field
    const filteredEvents = events.filter(event => event.tags);

    if (filteredEvents.length === 0) {
        eventsList.innerHTML = '<p>No events found for this place.</p>';
        return;
    }

    filteredEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.innerHTML = `
            ${
                event.thumbnail 
                ? `<img src="${event.thumbnail}" width="200px" alt="Event Thumbnail" onerror="this.style.display='none'">`
                : ''
            }
            <h3>${event.name || 'No name provided'}</h3>
            <p><strong>Venue:</strong> ${event.venue?.name || 'No venue information'}</p>
            <p><strong>Time:</strong> ${event.start_time}</p>
            <p><a href="${event.link || '#'}" target="_blank">More Information</a></p>
            <hr>
        `;
        eventsList.appendChild(eventElement);
    });
}
