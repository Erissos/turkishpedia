import os
import django
import random
from django.utils.text import slugify

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "turkishpedia.settings")
django.setup()

from django.contrib.auth import get_user_model
from apps.articles.models import Article, Category, Tag
from apps.tourism.models import City, Place
from apps.routes.models import TravelRoute

User = get_user_model()

def create_users():
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@example.com", "admin123")
        print("Superuser 'admin' created.")
    
    if not User.objects.filter(username="editor").exists():
        editor = User.objects.create_user("editor", "editor@example.com", "editor123")
        print("User 'editor' created.")
        return editor
    return User.objects.get(username="editor")

def create_categories():
    categories = [
        ("Tarih", "Geçmişten günümüze Türk tarihi"),
        ("Kültür", "Gelenek, sanat ve yaşam"),
        ("Dil", "Türk dili ve edebiyatı"),
        ("Sanat", "Mimari, resim ve müzik"),
        ("Coğrafya", "Anadolu ve çevresi"),
    ]
    objs = []
    for name, desc in categories:
        cat, created = Category.objects.get_or_create(
            name=name,
            defaults={"slug": slugify(name), "description": desc}
        )
        objs.append(cat)
        if created:
            print(f"Category '{name}' created.")
    return objs

def create_cities():
    cities_data = [
        ("İstanbul", "Tarihin ve kültürün başkenti."),
        ("Ankara", "Türkiye Cumhuriyeti'nin başkenti."),
        ("İzmir", "Ege'nin incisi."),
        ("Antalya", "Turizmin kalbi."),
        ("Nevşehir", "Kapadokya'nın merkezi."),
    ]
    objs = []
    for name, desc in cities_data:
        city, created = City.objects.get_or_create(
            name=name,
            defaults={"slug": slugify(name), "description": desc}
        )
        objs.append(city)
        if created:
            print(f"City '{name}' created.")
    return objs

def create_articles(author, categories):
    articles_data = [
        {
            "title": "Orhun Yazıtları",
            "content": """# Orhun Yazıtları
Orhun Yazıtları, Göktürk İmparatorluğu'nun ünlü hükümdarları Bilge Kağan ve Kül Tigin adına dikilmiş bengü taşlardır.

## Tarihçe
Yazıtlar, 8. yüzyılın başlarında, bugünkü Moğolistan sınırları içerisinde dikilmiştir. Türk adının geçtiği ilk Türkçe metinler olarak bilinir.

## Önemi
Türk dili, tarihi, edebiyatı ve kültürü açısından eşsiz bir kaynaktır. Wilhelm Thomsen tarafından 1893 yılında çözülmüştür.

### Yazarlar
Yazıtlardaki metinlerin büyük bir kısmı Yolluğ Tigin tarafından yazılmıştır.
""",
            "status": "published"
        },
        {
            "title": "Göbeklitepe",
            "content": """# Göbeklitepe: Tarihin Sıfır Noktası
Şanlıurfa yakınlarında bulunan Göbeklitepe, dünyanın bilinen en eski tapınak merkezidir.

## Keşif
1963 yılında fark edilen alan, 1995 yılından itibaren Alman Arkeoloji Enstitüsü ve Şanlıurfa Müzesi tarafından kazılmaya başlanmıştır.

## Yapı Özellikleri
T şeklinde dikili taşlardan oluşan yapılar, avcı-toplayıcı insanların inanç dünyasına ışık tutmaktadır.
""",
            "status": "published"
        },
        {
            "title": "Mimar Sinan",
            "content": """# Mimar Sinan
Osmanlı İmparatorluğu'nun baş mimarı ve inşaat mühendisi.

## Eserleri
Mimar Sinan, kariyeri boyunca 375'ten fazla eser bırakmıştır. En bilinen eserleri Selimiye Camii ve Süleymaniye Camii'dir.

### Ustalık Eseri
Kendisi Selimiye Camii'ni "ustalık eserim" olarak nitelendirmiştir.
""",
            "status": "published"
        }
    ]

    for data in articles_data:
        article, created = Article.objects.get_or_create(
            title=data["title"],
            defaults={
                "slug": slugify(data["title"]),
                "content": data["content"],
                "author": author,
                "status": data["status"]
            }
        )
        if created:
            article.categories.set(categories[:2]) 
            print(f"Article '{article.title}' created.")

def create_routes(user, cities_list):
    routes_data = [
        ("Likya Yolu", "Antik Likya medeniyetinin izinde yürüyüş. Fethiye'den Antalya'ya uzanan tarihi yol."),
        ("Karya Yolu", "Güney Ege'nin gizemli koyları. Muğla ve çevresini kapsayan modern yürüyüş rotası."),
    ]
    
    target_city = next((c for c in cities_list if "Antalya" in c.name), cities_list[0] if cities_list else None)
    
    if not target_city:
        print("No city found for routes.")
        return

    for title, desc in routes_data:
        route, created = TravelRoute.objects.get_or_create(
            title=title,
            defaults={
                "slug": slugify(title),
                "description": desc,
                "city": target_city,
                "created_by": user
            }
        )
        if created:
            print(f"Route '{title}' created.")

if __name__ == "__main__":
    print("Seeding data...")
    try:
        editor = create_users()
        cats = create_categories()
        cities = create_cities()
        create_articles(editor, cats)
        create_routes(editor, cities)
        print("Seeding completed successfully!")
    except Exception as e:
        print(f"Error seeding data: {e}")
