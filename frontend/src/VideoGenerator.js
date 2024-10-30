async function generateVideo() {
    const response = await fetch('/api/generateVideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'A serene landscape for meditation' }),
    });
  
    const data = await response.json();
    const videoElement = document.getElementById('meditationVideo');
    videoElement.src = data.videoUrl;
  }
  