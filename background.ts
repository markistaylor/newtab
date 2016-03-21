/// <reference path="interfaces/_globals.d.ts" />
import { cache } from './utilities/cache';

function getBackground() {
  fetch('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')
    .then(r => r.json())
    .then(data => cache.setItem('photo', "http://www.bing.com" + data.images[0].url))
    .then(() => createBackgroundAlarm())
    .catch((e) => {
      console.error(e);
      
      let date = new Date();
      date.setMinutes(date.getMinutes() + 5);
      createBackgroundAlarm(date);
    });
}

function createBackgroundAlarm(date?: Date) {
  if (date) {
    date = new Date();
    if (date.getHours() > 7) {
      date.setDate(date.getDate()+1);
    }
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(7);
  }
  
  chrome.alarms.create('getBackground', { when: date.getTime() })
}


function onLoad() {
  getBackground();
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'getBackground') {
      getBackground();
    }
    console.log(alarm);
  });

  createBackgroundAlarm();
}

onLoad();

