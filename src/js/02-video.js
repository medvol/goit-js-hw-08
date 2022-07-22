import Player from '@vimeo/player';

const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const iframePlayer = new Player(iframe);

const saveItemStorage = (key, value) => {
  try {
   const keyJSON = JSON.stringify(value);
    localStorage.setItem(key, keyJSON);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }

}

const onPlay = function (data) {

  saveItemStorage("videoplayer-current-time", data.seconds);
 
};

iframePlayer.on('timeupdate', throttle(onPlay, 1000));

       
const readItemStorage = key => {
  try {
    const keyJSON = localStorage.getItem(key);

    return keyJSON === keyJSON ? JSON.parse(keyJSON) : null;
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
}

const savedTime = readItemStorage("videoplayer-current-time");

const handleReload = () => {
  iframePlayer.setCurrentTime(savedTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
   
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
  
}
 
document.addEventListener("DOMContentLoaded", handleReload )




