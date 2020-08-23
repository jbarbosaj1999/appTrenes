/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

workbox.core.setCacheNameDetails({
  prefix: 'my-app',
  suffix: 'v1',
  precache: 'precache-cache',
  runtime: 'runtime-cache'
});

workbox.precaching.precacheAndRoute([
'offline.html',
'manifest.json']);




self.addEventListener('fetch', event => {
event.respondWith(
caches.open('my-app-precache-cache-v1').then(cache => {
return cache.match(event.request).then(cachedResponse => {
const fetchPromise = fetch(event.request).then(response => {
cache.put(event.request, response.clone());
return response;
});
return cachedResponse || fetchPromise;
})
}));
});

