window.onload = function() {
  const audioPlayer = document.getElementById('audioPlayer');
  const fileInput = document.getElementById('audioFileInput');

  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
      audioPlayer.src = URL.createObjectURL(file);

      audioPlayer.play().then(() => {
        console.log('Audio playback started');
      }).catch(err => {
        console.error('Error starting audio playback:', err);
      });
    }
  });
};
