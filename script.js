
 // دالة لجلب المنتجات من API وعرضها
const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products'); // استبدل بالرابط الصحيح
        const products = await response.json();
        console.log(products); // تسجيل المنتجات للتحقق

        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = ''; // مسح المحتوى السابق

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width:100%; height:auto;"> <!-- عرض صورة المنتج -->
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>السعر: <strong>${product.price} ريال</strong></p>
                <button class="btn add-to-cart" onclick="addToCart(${product.id})">أضف للسلة</button>
            `;
            productContainer.appendChild(productDiv);
        });
    } catch (error) {
        console.error('خطأ في جلب المنتجات:', error);
    }
};

// دالة لإضافة المنتج إلى عربة التسوق
const addToCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`تمت إضافة المنتج ${productId} للسلة`);
    }
    window.location.href = 'السله.html'; // توجيه المستخدم إلى صفحة السلة
};

// استدعاء الدالة لجلب المنتجات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', fetchProducts); // جلب المنتجات عند تحميل الصفحة
