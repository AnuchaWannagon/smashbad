/* service worker ของ Smash Badminton — ไม่แคชหน้าแอป (โหลดสดทุกครั้งเหมือนเดิม)
   [25a] รับรูปสลิปที่ "แชร์" มาจากแอปธนาคาร (Web Share Target — Android ที่ติดตั้งแอปจาก Chrome เท่านั้น)
   เก็บรูปไว้ใน Cache "smash-share" แล้วเปิดแอปด้วย ?share-slip=1 ให้แอปหยิบไปแนบในหน้าจ่ายเงินของผู้ใช้ */
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(clients.claim()); });
self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'POST') return;                       // คำขออื่นทั้งหมดไปเครือข่ายตามปกติ
  var url = new URL(req.url);
  if(url.searchParams.get('share-slip') !== '1') return;
  e.respondWith((async function(){
    try{
      var fd = await req.formData();
      var f = fd.get('slip');
      if(f && f.size){
        var c = await caches.open('smash-share');
        await c.put('shared-slip', new Response(f, { headers: { 'content-type': f.type || 'image/jpeg' } }));
      }
    }catch(err){}
    return Response.redirect(new URL('./?share-slip=1', self.registration.scope).href, 303);
  })());
});
