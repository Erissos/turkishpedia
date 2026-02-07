# Turkishpedia

**Türkiye'nin Kültürel Mirası ve Seyahat Rehberi**

Turkishpedia, Türkiye'nin zengin tarihini, kültürünü ve turistik değerlerini dijital dünyada en doğru ve kapsamlı şekilde temsil etmeyi amaçlayan yeni nesil bir ansiklopedi ve seyahat platformudur.

## 🎯 Misyonumuz

Misyonumuz, Anadolu'nun binlerce yıllık mirasını ve Türk kültürünün derinliklerini, doğrulanmış bilgiler ve zengin modern arayüzlerle kullanıcılarımıza sunmaktır. Sadece statik bir bilgi kaynağı olmakla kalmayıp, ziyaretçilerin Türkiye'yi keşfetmelerini sağlayacak interaktif rotalar, şehir rehberleri ve kültürel içerikler sunarak, bilgiye dayalı bilinçli turizme katkıda bulunmayı hedefliyoruz.

Platformumuz, kullanıcı katkılarına açık yapısıyla, kolektif bir hafıza oluşturmayı ve bu eşsiz mirası gelecek nesillere en nitelikli haliyle aktarmayı amaçlar.

## 🌟 Özellikler

- **Kapsamlı Makaleler:** Tarih, sanat, mutfak kültürü ve gelenekler üzerine derinlemesine içerikler.
- **Akıllı Seyahat Rotaları:** İlgi alanlarına göre özelleştirilmiş, nokta nokta gezi planları.
- **Şehir ve Mekan Rehberleri:** Türkiye'nin 81 ilini ve gizli kalmış cevherlerini kapsayan detaylı veri tabanı.
- **Topluluk Odaklı:** Gelişmiş kullanıcı profilleri, yorumlar, oylamalar ve içerik üreticileri için araçlar.

## 🛠️ Teknik Yapı

Proje, performans ve sürdürülebilirlik odaklı modern bir mimari üzerine inşa edilmiştir.

- **Backend:** Django Framework (Monolitik Yapı)
- **Frontend:** Django Templates + Tailwind CSS + JavaScript
- **Veritabanı:** PostgreSQL
- **Cache & Session:** Redis
- **Konteynerizasyon:** Docker & Docker Compose

### Modüller (Apps)

- `accounts`: Gelişmiş kullanıcı yönetimi, roller ve detaylı profiller (Eğitim, Meslek, Konum vb.).
- `articles`: Revizyon takibi ve moderasyon sistemine sahip içerik yönetimi.
- `tourism`: Şehirler, turistik mekanlar ve coğrafi veriler.
- `routes`: Kullanıcılar için oluşturulmuş dinamik gezi rotaları.
- `comments`: Etkileşim, yorum ve değerlendirme sistemi.
- `core`: Favorileme, takip ve temel sistem fonksiyonları.

## 🚀 Kurulum (Local Setup)

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Hazırlık:** `.env.example` dosyasının adını `.env` olarak değiştirin ve gerekli parametreleri düzenleyin.
2. **Başlatma:** Docker servislerini derleyip ayağa kaldırın:
   ```bash
   docker compose up --build
   ```
3. **Erişim:**
   - Web Arayüzü: http://localhost:8000
   - Yönetim Paneli: http://localhost:8000/admin/

## 📦 Prodüksiyon Notları

Canlı ortama geçiş için dikkat edilmesi gerekenler:
- Güvenli `SECRET_KEY` ve `ALLOWED_HOSTS` ayarlarını yapılandırın.
- Yönetilen (Managed) PostgreSQL ve Redis hizmetleri kullanın.
- `DEBUG=False` olduğundan emin olun.
- Statik ve medya dosyaları için CDN (S3, Cloudflare R2 vb.) entegrasyonu yapın.
- Sentry gibi hata takip araçlarını aktif hale getirin.

---
*Turkishpedia - Anadolu'yu Keşfet.*
