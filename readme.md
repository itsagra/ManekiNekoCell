Create Table :
    1. Buyers
        - first_name --> string
        - last_name --> string
        - email --> string
        - gender --> string
        - username --> string
        - birth_date --> date
        - password --> string
    2. Products
        - product_name --> string
        - description --> string
        - merk --> string
        - stock --> integer
        - price --> integer
        - url --> string
    3. BuyProduct
        - buyerId
        - productId

Routing :

- GET / --> 
Menampilkan halaman home, dimana ada opsi untuk melihat list product dan keranjang belanja

- GET /product --> 
Menampilkan table product, dan memiliki button untuk menambahkan product ke keranjang belanja
Tampilkan alert ketika sudah add product

- GET /product/:params(merk) -->
Menampilkan table product yg di sortir berdasarkan merk, dan memiliki button untuk menambahkan product ke keranjang belanja
Tampilkan alert ketika sudah add product

- GET /product/:params(merk)/:id -->
Menampilkan table product sesuai merk dan id nya, dan memiliki button untuk menambahkan product ke keranjang belanja
Tampilkan alert ketika sudah add product

- POST /addToCart/:id -->

- GET /cart --> 
Menampilkan table keranjang belanja yg berisi :
- product_name
- jumlah
- harga product
- total belanja
- action button untuk menghapus product dari keranjang ( jika product di hapus, stock product otomatis bertambah 1 )
Ada button Back dan Checkout 
- button Back untuk kembali ke home
- ketika button Checkout di klik, akan mengosongkan keranjang belanja, stock produk berkurang 1 dan mengirimkan invoice ( opsional by email / pdf)