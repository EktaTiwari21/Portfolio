import urllib.request
import os
import re
import time

with open('scratch_scraped_site.html', 'r', encoding='utf-8') as f:
    content = f.read()

img_urls = set(re.findall(r'https://framerusercontent\.com/images/[A-Za-z0-9\._\-]+', content))
os.makedirs('images', exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for url in sorted(img_urls):
    filename = url.split('/')[-1]
    local_path = os.path.join('images', filename)
    if os.path.exists(local_path) and os.path.getsize(local_path) > 0:
        print(f"Already exists: {filename}")
        continue

    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp, open(local_path, 'wb') as out:
                out.write(resp.read())
            print(f"Saved {filename} ({os.path.getsize(local_path)} bytes)")
            break
        except Exception as e:
            print(f"Attempt {attempt+1} failed for {filename}: {e}")
            time.sleep(2)
