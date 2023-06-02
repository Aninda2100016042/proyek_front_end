<template>
    <div class="contact-container" style="background-image: url('https://i.pinimg.com/564x/3c/23/f8/3c23f8c239b464522fdacf550f3e796c.jpg');">
      <h2 class="title" style="background-color: white; color: black;">Kontak Kami</h2>
      <p class="contact-message" style="background-color: white; color: black">Jika ada yang ingin ditanyakan, silahkan mengubungi kami</p>
      <div class="contact-info">
        <div class="contact-item">
          <h3 class="subtitle">Alamat</h3>
          <p>{{ address }}</p>
        </div>
        <div class="contact-item">
          <h3 class="subtitle">Telepon</h3>
          <p>{{ phone }}</p>
        </div>
        <div class="contact-item">
          <h3 class="subtitle">Email</h3>
          <p>{{ email }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Contact',
    data() {
      return {
        address: 'Jalan Raya No. 123, Kota Yogyakarta',
        phone: '08123456789',
        email: 'aninda@gmail.com',
      };
    },
  };
  </script>
  
  <style scoped>
  .contact-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #333333;
  }
  
  .subtitle {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333333;
  }
  
  .contact-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .contact-item {
    flex: 0 0 300px;
    margin: 20px;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .contact-item p {
    margin-top: 20px;
    color: #666666;
  }
  
  @media (max-width: 600px) {
    .contact-item {
      flex: 0 0 calc(50% - 40px);
    }
  }
  </style>
  