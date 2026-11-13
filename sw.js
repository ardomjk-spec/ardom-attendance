/* ARDOM attendance — service worker
   Handles web-push reminders (checkout / check-in / leave decisions) and
   opens the app when the notification is tapped. Deployed at site ROOT. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let title = "ARDOM Attendance";
  let body = "Attendance reminder — open your app.";
  let url = "./"; // relative — opens the app wherever it's hosted

  try {
    if (event.data && event.data.text()) {
      const p = JSON.parse(event.data.text());
      title = p.title || title;
      body = p.body || body;
      url = p.url || url;
    }
  } catch (e) { /* empty or non-JSON push → defaults */ }

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "data:image/svg+xml," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><circle cx="48" cy="48" r="44" fill="#f58220"/><circle cx="30" cy="48" r="9" fill="#fff"/><path d="M52 30a18 18 0 0 1 0 36v-9a9 9 0 0 0 0-18z" fill="#fff"/></svg>'),
      tag: "ardom-reminder",
      renotify: true,
      data: { url },
      requireInteraction: false,
      vibrate: [200, 80, 200],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "./";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (new URL(c.url).pathname === target && "focus" in c) return c.focus();
      }
      return self.clients.openWindow(target);
    })
  );
});