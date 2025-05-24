self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
});

self.addEventListener('fetch', function(event) {
  // এখানে তুমি ক্যাশিং এর কোড দিতে পারো যদি দরকার হয়
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();  // নোটিফিকেশন বন্ধ করবে

  const urlToOpen = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        // যদি ওই URL আগেই ওপেন থাকে তাহলে সেটাকে ফোকাস করো
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // না থাকলে নতুন উইন্ডো/ট্যাবে ওপেন করো
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
