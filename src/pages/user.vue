<template>
  <div class="user-container" style="background-image: url('https://i.pinimg.com/564x/3c/23/f8/3c23f8c239b464522fdacf550f3e796c.jpg');">
    <h1 class="text-2xl font-bold mb-4" style="background-color: white; color: black;">Permintaan Pemesanan Bunga</h1>
    <form @submit.prevent="createOrder" class="max-w-md mx-auto">
      <div class="mb-4">
        <label for="name" class="text-lg font-semibold" style="background-color: white; color: black;">Nama:</label>
        <input type="text" v-model="order.name" id="name" required class="input-field" />
      </div>
      <div class="mb-4">
        <label for="email" class="text-lg font-semibold" style="background-color: white; color: black;">Email:</label>
        <input type="email" v-model="order.email" id="email" required class="input-field" />
      </div>
      <div class="mb-4">
        <label for="address" class="text-lg font-semibold" style="background-color: white; color: black;">Alamat:</label>
        <textarea v-model="order.address" id="address" required class="input-field"></textarea>
      </div>
      <div class="mb-4">
        <label for="flowerType" class="text-lg font-semibold" style="background-color: white; color: black;">Jenis Bunga:</label>
        <select v-model="order.flowerType" id="flowerType" required class="input-field">
          <option value="" disabled>Pilih jenis bunga</option>
          <option value="Mawar">Mawar</option>
          <option value="Melati">Melati</option>
          <option value="Anggrek">Anggrek</option>
          <option value="Lily">Lily</option>
          <option value="Lain-lain">Lain-lain</option>
        </select>
        <input v-if="order.flowerType === 'Lain-lain'" type="text" v-model="order.customFlowerType" placeholder="Ketik jenis bunga" required class="input-field" />
      </div>
      <div class="mb-4">
        <label for="quantity" class="text-lg font-semibold" style="background-color: white; color: black;">Jumlah:</label>
        <input type="number" v-model="order.quantity" id="quantity" required min="1" class="input-field" />
      </div>
      <div class="mb-4">
        <label for="paymentMethod" class="text-lg font-semibold" style="background-color: white; color: black;">Metode Pembayaran:</label>
        <select v-model="order.paymentMethod" id="paymentMethod" required class="input-field">
          <option value="" disabled>Pilih metode pembayaran</option>
          <option value="Transfer Bank">Transfer Bank</option>
        </select>
      </div>
      <div class="mb-4" v-if="order.paymentMethod === 'Transfer Bank'">
        <label for="bankAccount" class="text-lg font-semibold" style="background-color: white; color: black;">Rekening Tujuan:</label>
        <select v-model="order.bankAccount" id="bankAccount" required class="input-field" @change="updateBankAccount">
          <option value="" disabled>Pilih rekening tujuan</option>
          <option value="BCA" data-nomor-rekening="123456789" style="background-color: white; color: black;">BCA</option>
          <option value="BNI" data-nomor-rekening="987654321" style="background-color: white; color: black;">BNI</option>
          <option value="BRI" data-nomor-rekening="567891234" style="background-color: white; color: black;">BRI</option>
          <option value="Mandiri" data-nomor-rekening="432198765" style="background-color: white; color: black;">Mandiri</option>
        </select>
      </div>
      <div class="mb-4" v-if="order.paymentMethod === 'Transfer Bank' && order.nomorRekening !== '' && isFormSubmitted">
        <label class="text-lg font-semibold" style="background-color: white; color: black;">Nomor Rekening:</label>
        <p>{{ order.nomorRekening }}</p>
      </div>
      <div class="mb-4">
        <button type="submit" class="submit-button">Kirim Pemesanan</button>
      </div>
    </form>
    <div v-if="showOrderConfirmation" class="order-confirmation">
      <h2 class="text-xl font-semibold">Konfirmasi Pesanan</h2>
      <p>Nama: {{ order.name }}</p>
      <p>Email: {{ order.email }}</p>
      <p>Alamat: {{ order.address }}</p>
      <p>Jenis Bunga: {{ order.flowerType === 'Lain-lain' ? order.customFlowerType : order.flowerType }}</p>
      <p>Jumlah: {{ order.quantity }}</p>
      <p>Metode Pembayaran: {{ order.paymentMethod }}</p>
      <p v-if="order.paymentMethod === 'Transfer Bank'">Rekening Tujuan: {{ order.bankAccount ? order.bankAccount : order.nomorRekening }}</p>
      <p>Harga Total: {{ calculateTotalPrice() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateOrder',
  data() {
    return {
      order: {
        name: '',
        email: '',
        address: '',
        flowerType: '',
        customFlowerType: '',
        quantity: '',
        paymentMethod: '',
        bankAccount: '',
        nomorRekening: '', 
      },
      showOrderConfirmation: false,
      isFormSubmitted: false,
    };
  },
  methods: {
    createOrder() {
      // Validasi pengiriman
      if (!this.validateOrder()) {
        return;
      }
      // Menentukan jenis bunga yang akan digunakan
      let flowerType = this.order.flowerType;
      if (flowerType === 'Lain-lain') {
        flowerType = this.order.customFlowerType;
      }

      // Menggabungkan data pemesanan
      const orderData = {
        bunga: flowerType,
        DataCustomer: `Nama: ${this.order.name} \nEmail: ${this.order.email} \nAlamat: ${this.order.address}`,
        jumlah: this.order.quantity,
        metodePembayaran: this.order.paymentMethod,
        rekeningTujuan: this.order.bankAccount,
        hargaTotal: this.calculateTotalPrice(),
        nomorRekening: this.order.nomorRekening,
      };

      // Menampilkan data pemesanan di konsol
      console.log('Data Pemesanan:', orderData);

  // Menampilkan data pemesanan di pop-up (alert)
  const orderInfo = `Nama: ${this.order.name}\nEmail: ${this.order.email}\nAlamat: ${this.order.address}\nJenis Bunga: ${this.order.flowerType === 'Lain-lain' ? this.order.customFlowerType : this.order.flowerType}\nJumlah: ${this.order.quantity}\nMetode Pembayaran: ${this.order.paymentMethod}${this.order.paymentMethod === 'Transfer Bank' ? '\nRekening Tujuan: ' + (this.order.bankAccount ? this.order.bankAccount : this.order.nomorRekening) : ''}\nHarga Total: ${this.calculateTotalPrice()}`;
      alert('Informasi Pesanan:\n\n' + orderInfo);


  // Menampilkan konfirmasi pesanan
  this.showOrderConfirmation = true;
  this.isFormSubmitted = true;



      // Kirim pemesanan ke server (contoh: menggunakan placeholder URL)
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => {
          if (response.ok) {
            this.showOrderConfirmation = true;
            alert('Pemesanan berhasil dikirim!');
          } else {
            throw new Error('Terjadi kesalahan saat mengirim pemesanan!');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Terjadi kesalahan saat mengirim pemesanan!');
        });
    },
    validateOrder() {
      // Validasi nama
      if (!this.order.name) {
        alert('Mohon masukkan nama Anda!');
        return false;
      }

      // Validasi email
      if (!this.order.email) {
        alert('Mohon masukkan alamat email Anda!');
        return false;
      }

      // Validasi alamat
      if (!this.order.address) {
        alert('Mohon masukkan alamat pengiriman!');
        return false;
      }

      // Validasi jenis bunga
      if (!this.order.flowerType) {
        alert('Mohon pilih jenis bunga!');
        return false;
      }

      // Validasi jumlah
      if (this.order.quantity < 1) {
        alert('Mohon masukkan jumlah pesanan yang valid!');
        return false;
      }

      // Validasi metode pembayaran
      if (!this.order.paymentMethod) {
        alert('Mohon pilih metode pembayaran!');
        return false;
      }

      // Validasi rekening tujuan (hanya jika metode pembayaran adalah transfer bank)
      if (this.order.paymentMethod === 'Transfer Bank' && !this.order.bankAccount) {
        alert('Mohon pilih rekening tujuan!');
        return false;
      }

      return true;
    },
    updateBankAccount() {
      const selectedBank = this.order.bankAccount;
      const bankOption = document.querySelector(`#bankAccount option[value="${selectedBank}"]`);
      const nomorRekening = bankOption.getAttribute('data-nomor-rekening');
      this.order.nomorRekening = nomorRekening;
    },
    calculateTotalPrice() {
  const pricePerFlower = {
    Mawar: 100000,
    Melati: 80000,
    Anggrek: 120000,
    Lily: 150000,
    Charlotte: 150000,
    Rainbow:200000,
    MawarMix:100000,
    MawarMerah:250000,
    MawarKuning:300000
    // Tambahkan jenis bunga lain beserta harganya di sini
  };

  const selectedFlowerType = this.order.flowerType;
  const quantity = this.order.quantity;
  const price = pricePerFlower[selectedFlowerType] || 0;
  const totalPrice = price * quantity;

  return totalPrice;
},
  },
};
</script>

<style>
.product-container {
  max-width: 600px;
  margin: 0 auto;
}

.input-field {
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  background-color: #5c4fe4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
}

.order-confirmation {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  margin-top: 16px;
}

.order-confirmation h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.order-confirmation p {
  margin-bottom: 4px;
}

</style>
