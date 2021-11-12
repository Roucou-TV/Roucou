/* eslint-disable no-console */

import { register } from "register-service-worker";
import Vue from "vue";


export function serviceworker() {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      registerMe();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
          registerMe();
        } else if (permission === "denied") {
          Vue.$toast("Madia est mieaux avec les notification activées", {
            timeout: 10000,
            closeOnClick: false
          });
        }
      });
    } else if (Notification.permission !== "default") {
      registerMe();
    }
  }
}

function registerMe() {
  if (process.env.NODE_ENV === "production") {
    register(`${process.env.BASE_URL}fcm.js`, {
      ready() {
        console.log(
          "App is being served from cache by a service worker.\n" +
            "For more details, visit https://goo.gl/AFskqB"
        );
      },
      registered() {
        console.log("Service worker has been registered.");
      },
      cached() {
        console.log("Content has been cached for offline use.");
      },
      updatefound() {
        console.log("New content is downloading.");
      },
      updated() {
        console.log("New content is available; please refresh.");
      },
      offline() {
        console.log(
          "No internet connection found. App is running in offline mode."
        );
      },
      error(error) {
        console.error("Error during service worker registration:", error);
      }
    });
  }
}