# Turkishpedia - Eksikler ve Yapilacaklar

## 1) Kirik baglantilar ve eksik rotalar
- /[locale]/articles/featured ve /[locale]/cities/featured rotalari yok; header ve footer baglantilari bu adreslere gidiyor.
- /[locale]/routes/[slug] sayfasi yok; rota kartlari detay sayfaya yonlenmiyor.
- /[locale]/articles, /[locale]/cities, /[locale]/categories liste sayfalari yok.
- Home sayfasindaki kategori gridindeki kartlar ve "Tum Arsive Goz At" butonu baglanti degil.

## 2) Tamamlanmamis sayfalar (placeholder)
- Artikel, sehir, kategori detay sayfalari sabit metin ve placeholder ile geliyor; slug ile API cagrisi yok.
- Profil, Admin sayfalari statik placeholder metinler iceriyor.
- Arama sayfasi sadece input gosteriyor, sonuc listesi ve filtreler yok.

## 3) API entegrasyonu eksikleri
- Frontend tarafinda sadece public profil icin API cagrisi var; makaleler, sehirler, kategoriler, rotalar icin veri cekme yok.
- Arama icin backend API ucu yok ya da baglanti kurulmamis.
- Yorum, puanlama, bookmark, contribution sistemleri backendde var ama frontendde yok.
- Makale detayinda resim, referans, kategori, tag gibi alanlar backendde var ama UI'de gosterilmiyor.

## 4) Auth ve kullanici sistemi
- Giris, kayit, JWT token saklama ve yenileme akisi yok.
- Profil guncelleme ekranlari ve settings yok.
- Yetkili roller (editor, admin) icin UI/guard yonetimi yok.

## 5) Medya ve statik varliklar
- Hero ve page hero icin kullanilan /public/images altindaki gorseller eksik.
- Kullanici avatar goruntuleme icin media URL base tanimi ve fallback kurallari belirgin degil.

## 6) Ortam degiskenleri ve yapılandirma
- README .env.example kopyalamayi soyluyor ama dosya yok.
- NEXT_PUBLIC_API_BASE_URL ve INTERNAL_API_BASE_URL ayarlari net degil; SSR ve client istekleri icin zorunlu.

## 7) Genel UX ve baglanti tutarliligi
- Kartlar (ArticleCard, CityCard, RouteCard) tiklanabilir degil; detay sayfalarina link yok.
- SearchBar ve Hero arama inputu calismiyor; query ile route ve API entegrasyonu yok.
