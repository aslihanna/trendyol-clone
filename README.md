# 🛒 Modern E-commerce Platform

Modern ve responsive bir e-ticaret platformu. React ve Next.js kullanılarak geliştirilmiştir.

## ✨ Özellikler

- 🎨 **Modern UI/UX** - Tailwind CSS ile tasarlanmış responsive arayüz
- 📱 **Mobile First** - Tüm cihazlarda mükemmel deneyim
- 🔍 **Gelişmiş Arama** - Ürün ve marka bazında arama
- 🎯 **Filtreleme Sistemi** - Kategori, marka, fiyat aralığı filtreleme
- 📊 **Sıralama** - Fiyat, puan, isim bazında sıralama
- ❤️ **Favoriler** - Ürün favorileme sistemi
- 🛍️ **Sepet Yönetimi** - Ürün ekleme/çıkarma
- ⚡ **Hızlı Görüntüleme** - Ürün detaylarını hızlıca görme
- 🚀 **Hızlı Teslimat** - Özel teslimat etiketleri

## 🛠️ Teknolojiler

- **Frontend**: React 18, Next.js 13
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: SVG Icons
- **Images**: Next.js Image Optimization
- **Development**: ESLint, PostCSS

## 🚀 Kurulum

1. **Repository'yi klonlayın:**
```bash
git clone https://github.com/kullaniciadi/ecommerce-platform.git
cd ecommerce-platform
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── Header.js       # Üst menü
│   ├── ProductCard.js  # Ürün kartı
│   ├── FilterModal.js  # Filtreleme modalı
│   └── ...
├── context/            # Context API
│   └── ShopContext.js  # Global state yönetimi
├── data/               # Veri dosyaları
│   └── products.js     # Ürün verileri
├── pages/              # Next.js sayfaları
│   ├── index.js        # Ana sayfa
│   ├── cart.js         # Sepet sayfası
│   └── ...
└── styles/             # CSS dosyaları
    └── globals.css     # Global stiller
```

## 🎯 Kullanım

### Arama
- Üst menüdeki arama çubuğunu kullanarak ürün arayabilirsiniz
- Ürün adı veya marka ile arama yapabilirsiniz

### Filtreleme
- **Mobile**: "Filtrele" butonuna tıklayın
- **Desktop**: Sağ taraftaki filtreleme seçeneklerini kullanın
- Kategori, marka, fiyat aralığı filtreleyebilirsiniz

### Sıralama
- Fiyat (düşükten yükseğe/yüksekten düşüğe)
- Puana göre
- İsme göre

### Ürün İşlemleri
- ❤️ Favorilere ekleme/çıkarma
- 🛒 Sepete ekleme
- 👁️ Hızlı görüntüleme

## 📱 Responsive Tasarım

- **Mobile**: 2 sütun grid
- **Tablet**: 3-4 sütun grid  
- **Desktop**: 5-6 sütun grid
- **Tüm ekran boyutlarında optimize edilmiş arayüz**

## 🔧 Geliştirme

### Yeni Ürün Ekleme
`src/data/products.js` dosyasında ürün verilerini düzenleyebilirsiniz:

```javascript
{
  id: 1,
  name: "Ürün Adı",
  brand: "Marka",
  price: 100,
  originalPrice: 120,
  imageUrl: "/images/urun.jpg",
  category: "Kategori",
  hasFastShipping: true,
  rating: 4.5
}
```

### Yeni Sayfa Ekleme
`src/pages/` klasörüne yeni sayfa dosyaları ekleyebilirsiniz.

## 📦 Build

```bash
# Production build
npm run build

# Production sunucusunu başlat
npm start
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Email**: ornek@email.com
- **GitHub**: [@kullaniciadi](https://github.com/kullaniciadi)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

