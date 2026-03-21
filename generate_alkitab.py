#!/usr/bin/env python3
"""
Alkitab TB - Static Site Generator
Jalankan script ini untuk mengunduh data Alkitab dan membangun website statis.
Kemudian upload seluruh folder 'alkitab/' ke GitHub.

Kebutuhan: Python 3 + koneksi internet (sekali saja)
"""

import urllib.request
import urllib.parse
import json
import os
import time
import sys

BOOKS = [
    {"no":1,"abbr":"Kej","name":"Kejadian","chapter":50},
    {"no":2,"abbr":"Kel","name":"Keluaran","chapter":40},
    {"no":3,"abbr":"Ima","name":"Imamat","chapter":27},
    {"no":4,"abbr":"Bil","name":"Bilangan","chapter":36},
    {"no":5,"abbr":"Ula","name":"Ulangan","chapter":34},
    {"no":6,"abbr":"Yos","name":"Yosua","chapter":24},
    {"no":7,"abbr":"Hak","name":"Hakim-hakim","chapter":21},
    {"no":8,"abbr":"Rut","name":"Rut","chapter":4},
    {"no":9,"abbr":"1Sam","name":"1 Samuel","chapter":31},
    {"no":10,"abbr":"2Sam","name":"2 Samuel","chapter":24},
    {"no":11,"abbr":"1Raj","name":"1 Raja-Raja","chapter":22},
    {"no":12,"abbr":"2Raj","name":"2 Raja-Raja","chapter":25},
    {"no":13,"abbr":"1Taw","name":"1 Tawarikh","chapter":29},
    {"no":14,"abbr":"2Taw","name":"2 Tawarikh","chapter":36},
    {"no":15,"abbr":"Ezr","name":"Ezra","chapter":10},
    {"no":16,"abbr":"Neh","name":"Nehemia","chapter":13},
    {"no":17,"abbr":"Est","name":"Ester","chapter":10},
    {"no":18,"abbr":"Ayb","name":"Ayub","chapter":42},
    {"no":19,"abbr":"Maz","name":"Mazmur","chapter":150},
    {"no":20,"abbr":"Ams","name":"Amsal","chapter":31},
    {"no":21,"abbr":"Pkh","name":"Pengkhotbah","chapter":12},
    {"no":22,"abbr":"Kid","name":"Kidung Agung","chapter":8},
    {"no":23,"abbr":"Yes","name":"Yesaya","chapter":66},
    {"no":24,"abbr":"Yer","name":"Yeremia","chapter":52},
    {"no":25,"abbr":"Rat","name":"Ratapan","chapter":5},
    {"no":26,"abbr":"Yeh","name":"Yehezkiel","chapter":48},
    {"no":27,"abbr":"Dan","name":"Daniel","chapter":12},
    {"no":28,"abbr":"Hos","name":"Hosea","chapter":14},
    {"no":29,"abbr":"Yoe","name":"Yoel","chapter":3},
    {"no":30,"abbr":"Amo","name":"Amos","chapter":9},
    {"no":31,"abbr":"Oba","name":"Obaja","chapter":1},
    {"no":32,"abbr":"Yun","name":"Yunus","chapter":4},
    {"no":33,"abbr":"Mik","name":"Mikha","chapter":7},
    {"no":34,"abbr":"Nah","name":"Nahum","chapter":3},
    {"no":35,"abbr":"Hab","name":"Habakuk","chapter":3},
    {"no":36,"abbr":"Zef","name":"Zefanya","chapter":3},
    {"no":37,"abbr":"Hag","name":"Hagai","chapter":2},
    {"no":38,"abbr":"Zak","name":"Zakharia","chapter":14},
    {"no":39,"abbr":"Mal","name":"Maleakhi","chapter":4},
    {"no":40,"abbr":"Mat","name":"Matius","chapter":28},
    {"no":41,"abbr":"Mar","name":"Markus","chapter":16},
    {"no":42,"abbr":"Luk","name":"Lukas","chapter":24},
    {"no":43,"abbr":"Yoh","name":"Yohanes","chapter":21},
    {"no":44,"abbr":"Kis","name":"Kisah Para Rasul","chapter":28},
    {"no":45,"abbr":"Rom","name":"Roma","chapter":16},
    {"no":46,"abbr":"1Kor","name":"1 Korintus","chapter":16},
    {"no":47,"abbr":"2Kor","name":"2 Korintus","chapter":13},
    {"no":48,"abbr":"Gal","name":"Galatia","chapter":6},
    {"no":49,"abbr":"Efe","name":"Efesus","chapter":6},
    {"no":50,"abbr":"Flp","name":"Filipi","chapter":4},
    {"no":51,"abbr":"Kol","name":"Kolose","chapter":4},
    {"no":52,"abbr":"1Tes","name":"1 Tesalonika","chapter":5},
    {"no":53,"abbr":"2Tes","name":"2 Tesalonika","chapter":3},
    {"no":54,"abbr":"1Tim","name":"1 Timotius","chapter":6},
    {"no":55,"abbr":"2Tim","name":"2 Timotius","chapter":4},
    {"no":56,"abbr":"Tit","name":"Titus","chapter":3},
    {"no":57,"abbr":"Flm","name":"Filemon","chapter":1},
    {"no":58,"abbr":"Ibr","name":"Ibrani","chapter":13},
    {"no":59,"abbr":"Yak","name":"Yakobus","chapter":5},
    {"no":60,"abbr":"1Pet","name":"1 Petrus","chapter":5},
    {"no":61,"abbr":"2Pet","name":"2 Petrus","chapter":3},
    {"no":62,"abbr":"1Yoh","name":"1 Yohanes","chapter":5},
    {"no":63,"abbr":"2Yoh","name":"2 Yohanes","chapter":1},
    {"no":64,"abbr":"3Yoh","name":"3 Yohanes","chapter":1},
    {"no":65,"abbr":"Yud","name":"Yudas","chapter":1},
    {"no":66,"abbr":"Wah","name":"Wahyu","chapter":22},
]

API = "https://beeble.vercel.app/api/v1/passage/{abbr}/{ch}?ver=tb"
OUT_DIR = "alkitab/data"

def fetch_chapter(abbr, chapter):
    url = API.format(abbr=urllib.parse.quote(abbr), ch=chapter)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=15) as r:
                return json.loads(r.read())
        except Exception as e:
            if attempt < 2:
                time.sleep(2)
            else:
                raise e

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    total_chapters = sum(b['chapter'] for b in BOOKS)
    done = 0

    print(f"Mengunduh {total_chapters} pasal Alkitab TB...")
    print("Ini mungkin memakan waktu 20-30 menit. Mohon bersabar.\n")

    for book in BOOKS:
        book_data = {}
        abbr = book['abbr']
        name = book['name']
        book_file = os.path.join(OUT_DIR, f"{abbr}.json")

        # Skip jika sudah diunduh
        if os.path.exists(book_file):
            print(f"  [sudah ada] {name}")
            done += book['chapter']
            continue

        print(f"  Mengunduh: {name} ({book['chapter']} pasal)...")
        for ch in range(1, book['chapter'] + 1):
            try:
                result = fetch_chapter(abbr, ch)
                verses = result.get('data', {}).get('verses', [])
                book_data[ch] = [{"v": v['verse'], "t": v['content']} for v in verses]
                done += 1
                pct = int(done / total_chapters * 100)
                sys.stdout.write(f"\r    Progress: {done}/{total_chapters} ({pct}%)  ")
                sys.stdout.flush()
                time.sleep(0.15)  # jangan terlalu cepat agar tidak diblokir
            except Exception as e:
                print(f"\n    GAGAL: {name} {ch}: {e}")
                book_data[ch] = []

        # Simpan per-kitab
        with open(book_file, 'w', encoding='utf-8') as f:
            json.dump(book_data, f, ensure_ascii=False, separators=(',', ':'))
        print(f"\n    ✓ Tersimpan: {book_file}")

    # Simpan daftar kitab
    with open(os.path.join("alkitab/data", "books.json"), 'w', encoding='utf-8') as f:
        json.dump(BOOKS, f, ensure_ascii=False, separators=(',', ':'))

    print("\n✅ Semua selesai! Sekarang buka alkitab/index.html di browser Anda.")

if __name__ == "__main__":
    main()
