/* service worker เปล่า: ทำให้ติดตั้งเป็นแอปได้ โดยไม่แคชอะไร (โหลดสดทุกครั้ง) */
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(clients.claim()); });
