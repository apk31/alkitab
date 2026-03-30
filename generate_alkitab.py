#!/usr/bin/env python3
"""
Alkitab - Multi-Version Static Site Generator
"""

import urllib.request
import urllib.parse
import json
import os
import time
import sys

# 🔥 Ganti kode ini untuk mendownload versi lain (contoh: "nkjv", "bimk", "av")
# Jika "tb", script akan otomatis mendeteksi file lama dan menggabungkannya tanpa download ulang!
VERSION_CODE = "nkjv" 
OUT_DIR = "data"

# Pemetaan lengkap 66 Kitab (Indonesian & Standard English API Abbr) + Verifikasi Jumlah Pasal
# Ditambahkan "en_name" agar UI nanti bisa langsung baca nama bahasa Inggris
BOOKS = [
    {"no":1, "id_abbr":"Kej", "en_abbr":"Gen", "name":"Kejadian", "en_name":"Genesis", "chapter":50, "t":"old"},
    {"no":2, "id_abbr":"Kel", "en_abbr":"Exo", "name":"Keluaran", "en_name":"Exodus", "chapter":40, "t":"old"},
    {"no":3, "id_abbr":"Ima", "en_abbr":"Lev", "name":"Imamat", "en_name":"Leviticus", "chapter":27, "t":"old"},
    {"no":4, "id_abbr":"Bil", "en_abbr":"Num", "name":"Bilangan", "en_name":"Numbers", "chapter":36, "t":"old"},
    {"no":5, "id_abbr":"Ula", "en_abbr":"Deu", "name":"Ulangan", "en_name":"Deuteronomy", "chapter":34, "t":"old"},
    {"no":6, "id_abbr":"Yos", "en_abbr":"Jos", "name":"Yosua", "en_name":"Joshua", "chapter":24, "t":"old"},
    {"no":7, "id_abbr":"Hak", "en_abbr":"Jdg", "name":"Hakim-hakim", "en_name":"Judges", "chapter":21, "t":"old"},
    {"no":8, "id_abbr":"Rut", "en_abbr":"Rut", "name":"Rut", "en_name":"Ruth", "chapter":4, "t":"old"},
    {"no":9, "id_abbr":"1Sam", "en_abbr":"1Sa", "name":"1 Samuel", "en_name":"1 Samuel", "chapter":31, "t":"old"},
    {"no":10, "id_abbr":"2Sam", "en_abbr":"2Sa", "name":"2 Samuel", "en_name":"2 Samuel", "chapter":24, "t":"old"},
    {"no":11, "id_abbr":"1Raj", "en_abbr":"1Ki", "name":"1 Raja-Raja", "en_name":"1 Kings", "chapter":22, "t":"old"},
    {"no":12, "id_abbr":"2Raj", "en_abbr":"2Ki", "name":"2 Raja-Raja", "en_name":"2 Kings", "chapter":25, "t":"old"},
    {"no":13, "id_abbr":"1Taw", "en_abbr":"1Ch", "name":"1 Tawarikh", "en_name":"1 Chronicles", "chapter":29, "t":"old"},
    {"no":14, "id_abbr":"2Taw", "en_abbr":"2Ch", "name":"2 Tawarikh", "en_name":"2 Chronicles", "chapter":36, "t":"old"},
    {"no":15, "id_abbr":"Ezr", "en_abbr":"Ezr", "name":"Ezra", "en_name":"Ezra", "chapter":10, "t":"old"},
    {"no":16, "id_abbr":"Neh", "en_abbr":"Neh", "name":"Nehemia", "en_name":"Nehemiah", "chapter":13, "t":"old"},
    {"no":17, "id_abbr":"Est", "en_abbr":"Est", "name":"Ester", "en_name":"Esther", "chapter":10, "t":"old"},
    {"no":18, "id_abbr":"Ayb", "en_abbr":"Job", "name":"Ayub", "en_name":"Job", "chapter":42, "t":"old"},
    {"no":19, "id_abbr":"Maz", "en_abbr":"Psa", "name":"Mazmur", "en_name":"Psalms", "chapter":150, "t":"old"},
    {"no":20, "id_abbr":"Ams", "en_abbr":"Pro", "name":"Amsal", "en_name":"Proverbs", "chapter":31, "t":"old"},
    {"no":21, "id_abbr":"Pkh", "en_abbr":"Ecc", "name":"Pengkhotbah", "en_name":"Ecclesiastes", "chapter":12, "t":"old"},
    {"no":22, "id_abbr":"Kid", "en_abbr":"Sng", "name":"Kidung Agung", "en_name":"Song of Solomon", "chapter":8, "t":"old"},
    {"no":23, "id_abbr":"Yes", "en_abbr":"Isa", "name":"Yesaya", "en_name":"Isaiah", "chapter":66, "t":"old"},
    {"no":24, "id_abbr":"Yer", "en_abbr":"Jer", "name":"Yeremia", "en_name":"Jeremiah", "chapter":52, "t":"old"},
    {"no":25, "id_abbr":"Rat", "en_abbr":"Lam", "name":"Ratapan", "en_name":"Lamentations", "chapter":5, "t":"old"},
    {"no":26, "id_abbr":"Yeh", "en_abbr":"Ezk", "name":"Yehezkiel", "en_name":"Ezekiel", "chapter":48, "t":"old"},
    {"no":27, "id_abbr":"Dan", "en_abbr":"Dan", "name":"Daniel", "en_name":"Daniel", "chapter":12, "t":"old"},
    {"no":28, "id_abbr":"Hos", "en_abbr":"Hos", "name":"Hosea", "en_name":"Hosea", "chapter":14, "t":"old"},
    {"no":29, "id_abbr":"Yoe", "en_abbr":"Jol", "name":"Yoel", "en_name":"Joel", "chapter":3, "t":"old"},
    {"no":30, "id_abbr":"Amo", "en_abbr":"Amo", "name":"Amos", "en_name":"Amos", "chapter":9, "t":"old"},
    {"no":31, "id_abbr":"Oba", "en_abbr":"Oba", "name":"Obaja", "en_name":"Obadiah", "chapter":1, "t":"old"},
    {"no":32, "id_abbr":"Yun", "en_abbr":"Jon", "name":"Yunus", "en_name":"Jonah", "chapter":4, "t":"old"},
    {"no":33, "id_abbr":"Mik", "en_abbr":"Mic", "name":"Mikha", "en_name":"Micah", "chapter":7, "t":"old"},
    {"no":34, "id_abbr":"Nah", "en_abbr":"Nam", "name":"Nahum", "en_name":"Nahum", "chapter":3, "t":"old"},
    {"no":35, "id_abbr":"Hab", "en_abbr":"Hab", "name":"Habakuk", "en_name":"Habakkuk", "chapter":3, "t":"old"},
    {"no":36, "id_abbr":"Zef", "en_abbr":"Zep", "name":"Zefanya", "en_name":"Zephaniah", "chapter":3, "t":"old"},
    {"no":37, "id_abbr":"Hag", "en_abbr":"Hag", "name":"Hagai", "en_name":"Haggai", "chapter":2, "t":"old"},
    {"no":38, "id_abbr":"Zak", "en_abbr":"Zec", "name":"Zakharia", "en_name":"Zechariah", "chapter":14, "t":"old"},
    {"no":39, "id_abbr":"Mal", "en_abbr":"Mal", "name":"Maleakhi", "en_name":"Malachi", "chapter":4, "t":"old"},
    {"no":40, "id_abbr":"Mat", "en_abbr":"Mat", "name":"Matius", "en_name":"Matthew", "chapter":28, "t":"new"},
    {"no":41, "id_abbr":"Mar", "en_abbr":"Mrk", "name":"Markus", "en_name":"Mark", "chapter":16, "t":"new"},
    {"no":42, "id_abbr":"Luk", "en_abbr":"Luk", "name":"Lukas", "en_name":"Luke", "chapter":24, "t":"new"},
    {"no":43, "id_abbr":"Yoh", "en_abbr":"Jhn", "name":"Yohanes", "en_name":"John", "chapter":21, "t":"new"},
    {"no":44, "id_abbr":"Kis", "en_abbr":"Act", "name":"Kisah Para Rasul", "en_name":"Acts", "chapter":28, "t":"new"},
    {"no":45, "id_abbr":"Rom", "en_abbr":"Rom", "name":"Roma", "en_name":"Romans", "chapter":16, "t":"new"},
    {"no":46, "id_abbr":"1Kor", "en_abbr":"1Co", "name":"1 Korintus", "en_name":"1 Corinthians", "chapter":16, "t":"new"},
    {"no":47, "id_abbr":"2Kor", "en_abbr":"2Co", "name":"2 Korintus", "en_name":"2 Corinthians", "chapter":13, "t":"new"},
    {"no":48, "id_abbr":"Gal", "en_abbr":"Gal", "name":"Galatia", "en_name":"Galatians", "chapter":6, "t":"new"},
    {"no":49, "id_abbr":"Efe", "en_abbr":"Eph", "name":"Efesus", "en_name":"Ephesians", "chapter":6, "t":"new"},
    {"no":50, "id_abbr":"Flp", "en_abbr":"Php", "name":"Filipi", "en_name":"Philippians", "chapter":4, "t":"new"},
    {"no":51, "id_abbr":"Kol", "en_abbr":"Col", "name":"Kolose", "en_name":"Colossians", "chapter":4, "t":"new"},
    {"no":52, "id_abbr":"1Tes", "en_abbr":"1Th", "name":"1 Tesalonika", "en_name":"1 Thessalonians", "chapter":5, "t":"new"},
    {"no":53, "id_abbr":"2Tes", "en_abbr":"2Th", "name":"2 Tesalonika", "en_name":"2 Thessalonians", "chapter":3, "t":"new"},
    {"no":54, "id_abbr":"1Tim", "en_abbr":"1Ti", "name":"1 Timotius", "en_name":"1 Timothy", "chapter":6, "t":"new"},
    {"no":55, "id_abbr":"2Tim", "en_abbr":"2Ti", "name":"2 Timotius", "en_name":"2 Timothy", "chapter":4, "t":"new"},
    {"no":56, "id_abbr":"Tit", "en_abbr":"Tit", "name":"Titus", "en_name":"Titus", "chapter":3, "t":"new"},
    {"no":57, "id_abbr":"Flm", "en_abbr":"Phm", "name":"Filemon", "en_name":"Philemon", "chapter":1, "t":"new"},
    {"no":58, "id_abbr":"Ibr", "en_abbr":"Heb", "name":"Ibrani", "en_name":"Hebrews", "chapter":13, "t":"new"},
    {"no":59, "id_abbr":"Yak", "en_abbr":"Jas", "name":"Yakobus", "en_name":"James", "chapter":5, "t":"new"},
    {"no":60, "id_abbr":"1Pet", "en_abbr":"1Pe", "name":"1 Petrus", "en_name":"1 Peter", "chapter":5, "t":"new"},
    {"no":61, "id_abbr":"2Pet", "en_abbr":"2Pe", "name":"2 Petrus", "en_name":"2 Peter", "chapter":3, "t":"new"},
    {"no":62, "id_abbr":"1Yoh", "en_abbr":"1Jn", "name":"1 Yohanes", "en_name":"1 John", "chapter":5, "t":"new"},
    {"no":63, "id_abbr":"2Yoh", "en_abbr":"2Jn", "name":"2 Yohanes", "en_name":"2 John", "chapter":1, "t":"new"},
    {"no":64, "id_abbr":"3Yoh", "en_abbr":"3Jn", "name":"3 Yohanes", "en_name":"3 John", "chapter":1, "t":"new"},
    {"no":65, "id_abbr":"Yud", "en_abbr":"Jud", "name":"Yudas", "en_name":"Jude", "chapter":1, "t":"new"},
    {"no":66, "id_abbr":"Wah", "en_abbr":"Rev", "name":"Wahyu", "en_name":"Revelation", "chapter":22, "t":"new"},
]

def fetch_chapter(api_abbr, chapter):
    # Gunakan English Abbr (api_abbr) untuk request ke server
    url = f"https://beeble.vercel.app/api/v1/passage/{urllib.parse.quote(api_abbr)}/{chapter}?ver={VERSION_CODE}"
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=15) as r:
                return json.loads(r.read())
        except Exception as e:
            if attempt < 2: time.sleep(2)
            else: raise e

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    master_file = os.path.join(OUT_DIR, f"alkitab-{VERSION_CODE}.json")

    # Tentukan apakah versi ini bahasa Indonesia atau Inggris
    indonesian_versions = ['tb', 'bimk', 'bis', 'tl']
    is_indo_version = VERSION_CODE.lower() in indonesian_versions

    # 1. Pengecekan 1: Apakah Master File sudah ada?
    if os.path.exists(master_file):
        print(f"✅ Master file versi [{VERSION_CODE.upper()}] sudah ada: {master_file}")
        print("   Tidak perlu mengunduh ulang.")
        return

    master_db = {}
    
    # 2. Pengecekan 2: Apakah file JSON terpisah lama (seperti Kej.json) ada? (SMART MERGE)
    sample_file = os.path.join(OUT_DIR, f"{BOOKS[0]['id_abbr']}.json")
    if os.path.exists(sample_file):
        print(f"📦 Ditemukan data lokal untuk versi ini. Melakukan 'Smart Merge'...")
        for book in BOOKS:
            id_abbr = book['id_abbr']
            
            # Kunci utama JSON: 'Kej' untuk Indo, 'Gen' untuk English
            output_abbr = id_abbr if is_indo_version else book['en_abbr']
            
            filepath = os.path.join(OUT_DIR, f"{id_abbr}.json")
            if os.path.exists(filepath):
                with open(filepath, 'r', encoding='utf-8') as f:
                    master_db[output_abbr] = json.load(f)
            else:
                master_db[output_abbr] = {}
        
        with open(master_file, 'w', encoding='utf-8') as f:
            json.dump(master_db, f, ensure_ascii=False, separators=(',', ':'))
            
        print(f"✅ Berhasil menggabungkan file lokal menjadi satu: {master_file}")
        print("   (Anda sekarang bisa menghapus file-file JSON per-kitab yang lama!)")
        return

    # 3. Jika belum ada sama sekali, jalankan Download dari API
    total_chapters = sum(b['chapter'] for b in BOOKS)
    done = 0
    print(f"🌐 Mengunduh {total_chapters} pasal Alkitab versi [{VERSION_CODE.upper()}]...")
    
    for book in BOOKS:
        book_data = {}
        id_abbr = book['id_abbr']
        name = book['name']
        
        # api_abbr: Kode untuk fetch dari API (TB pakai 'Kej', NKJV pakai 'Gen')
        # output_abbr: Kunci untuk disimpan di JSON final ('Kej' atau 'Gen')
        api_abbr = id_abbr if is_indo_version else book['en_abbr']
        output_abbr = id_abbr if is_indo_version else book['en_abbr']

        print(f"  Mengunduh: {name} ({output_abbr})...")
        for ch in range(1, book['chapter'] + 1):
            try:
                result = fetch_chapter(api_abbr, ch)
                verses = result.get('data', {}).get('verses', [])
                book_data[str(ch)] = [{"v": v['verse'], "t": v['content']} for v in verses]
                done += 1
                pct = int(done / total_chapters * 100)
                sys.stdout.write(f"\r    Progress: {done}/{total_chapters} ({pct}%)  ")
                sys.stdout.flush()
                time.sleep(0.1) # Be nice to the API
            except Exception as e:
                print(f"\n    GAGAL: {name} {ch}: {e}")
                book_data[str(ch)] = []
        
        # Simpan menggunakan kunci yang sudah ditentukan (Kej atau Gen)
        master_db[output_abbr] = book_data

    # Save to single file
    with open(master_file, 'w', encoding='utf-8') as f:
        json.dump(master_db, f, ensure_ascii=False, separators=(',', ':'))
    
    print(f"\n\n    ✓ MASTER DATABASE TERSIMPAN: {master_file}")

    # Simpan UI Sidebar List Mapping (Hanya untuk UI)
    books_file = os.path.join(OUT_DIR, "books.json")
    if not os.path.exists(books_file):
        # Menyimpan ID dan EN untuk mempermudah UI merender bahasa Inggris / Indonesia nantinya
        ui_books = [{
            "no": b["no"], 
            "id_abbr": b["id_abbr"], 
            "en_abbr": b["en_abbr"], 
            "id_name": b["name"], 
            "en_name": b["en_name"], 
            "chapter": b["chapter"], 
            "t": b["t"]
        } for b in BOOKS]
        
        with open(books_file, 'w', encoding='utf-8') as f:
            json.dump(ui_books, f, ensure_ascii=False, separators=(',', ':'))
        print(f"    ✓ UI MAPPING TERSIMPAN: {books_file}")

if __name__ == "__main__":
    main()