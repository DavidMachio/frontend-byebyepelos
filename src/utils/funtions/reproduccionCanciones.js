export const playPrevSong = (currentDisco, currentSong, selecCancion) => {
    if (!currentDisco || !currentSong) return;

    const currentIndex = currentDisco.songs.findIndex((s) => s._id === currentSong._id);
    const prevIndex = (currentIndex - 1 + currentDisco.songs.length) % currentDisco.songs.length;
    const prevSong = currentDisco.songs[prevIndex];
    selecCancion(prevSong);
    
  };

export const playNextSong = (album, currentSong, selecCancion) => {
    if (!album || !currentSong) return;
  
    const currentIndex = album.songs.findIndex((song) => song._id === currentSong._id);
    const nextIndex = (currentIndex + 1) % album.songs.length;
    const nextSong = album.songs[nextIndex];
    selecCancion(nextSong);
  };