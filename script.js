document.getElementById('selectButton').addEventListener('click', function() {
    // Rastgele bir ofset değeri oluştur (0-99 arasında)
    const randomOffset = Math.floor(Math.random() * 100);
    fetch(`https://api.api-ninjas.com/v1/celebrity?nationality=tr&offset=${randomOffset}`, {
        headers: { 'X-Api-Key': 'X//XRcfxQiNykNdZo3E0UQ==amsPq0cijigHxwOe' }
    })
    .then(response => response.json())
    .then(data => {
        if(data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const celebrity = data[randomIndex];
            document.getElementById('celebrityDisplay').innerText = celebrity.name;
        } else {
            document.getElementById('celebrityDisplay').innerText = 'Ünlü bulunamadı';
        }
    })
    .catch(error => console.error('Error:', error));
});
