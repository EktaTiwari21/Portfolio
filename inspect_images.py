import re

with open('scratch_scraped_site.html', 'r', encoding='utf-8') as f:
    content = f.read()

# find img tags and background images in styles
imgs = re.findall(r'<img[^>]+src=[\"\']([^\"\'\s]+)[\"\']', content)
print("=== IMG TAGS ===")
for img in set(imgs):
    print(img)

# find background-image urls
bg_imgs = re.findall(r'background-image:\s*url\([\"\'\s]*([^\"\'\)]+)[\"\'\s]*\)', content)
print("\n=== BG IMGS ===")
for bg in set(bg_imgs):
    print(bg)
