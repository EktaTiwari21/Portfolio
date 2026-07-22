import re
import json
import html

with open('scratch_scraped_site.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all images
imgs = sorted(list(set(re.findall(r'https://framerusercontent\.com/images/[A-Za-z0-9\._\-]+', content))))
print("=== IMAGES FOUND ===")
for img in imgs:
    print(img)

# Extract structured text in framer json state if present
json_matches = re.findall(r'\{"__framer_.*\}', content)
print(f"\nFound {len(json_matches)} framer JSON blocks")

# Extract visible text by stripping tags
text_clean = re.sub(r'<style.*?>.*?</style>', '', content, flags=re.DOTALL)
text_clean = re.sub(r'<script.*?>.*?</script>', '', text_clean, flags=re.DOTALL)
text_clean = re.sub(r'<[^>]+>', '\n', text_clean)
lines = [html.unescape(line.strip()) for line in text_clean.splitlines() if line.strip()]

# Remove duplicate sequential lines
filtered_lines = []
for line in lines:
    if not filtered_lines or filtered_lines[-1] != line:
        filtered_lines.append(line)

print("\n=== VISIBLE TEXT CONTENT ===")
for line in filtered_lines:
    if len(line) > 1 and not line.startswith('/*') and not line.startswith('{') and not 'var ' in line and not 'function' in line:
        print(line)
