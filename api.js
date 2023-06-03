const express = require('express');
const app = express();

// Endpoint untuk mendapatkan daftar pemesanan
app.get('/api/orders', (req, res) => {
  // Lakukan logika untuk mendapatkan data pemesanan dari database atau sumber data lainnya
  const orders = [
    { id: 1, customer: 'John Doe', total: 100 },
    { id: 2, customer: 'Jane Smith', total: 200 },
    { id: 3, customer: 'Bob Johnson', total: 150 }
  ];
  
  res.json(orders);
});

// Endpoint untuk membuat pemesanan baru
app.post('/api/orders', (req, res) => {
  // Lakukan logika untuk membuat pemesanan baru dan menyimpannya ke database atau sumber data lainnya
  
  res.json({ message: 'Order created successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
