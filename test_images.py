import requests

urls = [
    "https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/band_assets/header.jpg",
    "https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/albums/mock.png",
    "https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/band_assets/mock.jpg"
]

for url in urls:
    try:
        response = requests.head(url, timeout=5)
        print(f"{url}: {response.status_code}")
    except Exception as e:
        print(f"{url}: Error {e}")
