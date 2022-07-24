import throttle from 'lodash.throttle';

import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = "videoplayer-current-time";

const saveItemStorage = (key, value) => {
  try {
    const itemJSON = JSON.stringify(value);
    localStorage.setItem(key, itemJSON);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }

};

const onPlay = (currentTime) => {

  saveItemStorage(STORAGE_KEY, currentTime.seconds);
 
};

player.on('timeupdate', throttle(onPlay, 1000));

       
const readItemStorage = key => {
  try {
    const itemJSON = localStorage.getItem(key);

    return itemJSON === itemJSON ? JSON.parse(itemJSON) : null;
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const savedCurrentTime = readItemStorage(STORAGE_KEY);

const handleReload = () => {

  player.setCurrentTime(savedCurrentTime).then(function (seconds) {    
  }).catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
  
};

document.addEventListener("DOMContentLoaded", handleReload);
 





