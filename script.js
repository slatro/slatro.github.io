document.getElementById('selectButton').addEventListener('click', function() {
    fetch('https://api.api-ninjas.com/v1/celebrity?nationality=tr', {
        headers: { 'X-Api-Key': 'https://api.api-ninjas.com/v1/celebrity' }
    })
    .then(response => response.json())
    .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const celebrity = data[randomIndex];
        document.getElementById('celebrityDisplay').innerText = celebrity.name;
    })
    .catch(error => console.error('Error:', error));
});
