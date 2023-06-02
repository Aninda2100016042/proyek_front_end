<template>
  <div class="container mx-auto p-4" style="background-image: url('https://i.pinimg.com/564x/3c/23/f8/3c23f8c239b464522fdacf550f3e796c.jpg');">
    <h1 class="text-2xl font-bold mb-4" style="background-color: white; color: black;">{{ title }}</h1>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <li v-for="item in items" :key="item.id" class="p-4 bg-white shadow">
        <a :href="getPostUrl(item.id)" target="_blank" class="block hover:text-blue-500" @click.prevent="showDetails(item)">
          <img :src="item.image" alt="Item Image" class="mb-2 w-full">
          <span class="font-bold text-center">{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      title: 'Welcome to Flower App', // Judul bunga tetap
    };
  },
  mounted() {
    const imageUrls = [
      'https://1.bp.blogspot.com/-CNL0Q4Rijl0/YMc4N4s12RI/AAAAAAAAbVY/V2sixJKh-kUVR8s-D35HC7ZZkQpsKa7XACLcBGAsYHQ/s0/Buket%2BBunga%2BBlue%2BCandy.jpg',
      'https://1.bp.blogspot.com/-cJpnNGv7iVI/YMd7qClBEiI/AAAAAAAAbYM/6By82OdzjockJm7LTZU499V4u8kNjc8_gCLcBGAsYHQ/Buket%2BBunga%2BMolly01.jpg',
      'https://1.bp.blogspot.com/-x7RnQXz8rSk/YMc3znJOfUI/AAAAAAAAbVQ/E5FE8YKWmT4DmMvKR0jEBIlD1NezlovVQCLcBGAsYHQ/s0/Buket%2BBunga%2BPink%2BCandy.jpg',
      'https://1.bp.blogspot.com/-a8cR10t6AeA/YMc0uE5YoyI/AAAAAAAAbTs/4SvJ7aMvEhsVLQLCatqp5GYwHsl4zxUcACLcBGAsYHQ/s0/Buket%2BBunga%2BGrace01.jpg',
      'https://1.bp.blogspot.com/-vclPLJAdqvU/YMcxMVBov7I/AAAAAAAAbSc/QJZYN5CFOT0lfdLY1FUyWodOkFi3qYfqQCLcBGAsYHQ/s0/Buket%2BBunga%2BAurora01.jpg',
      'https://1.bp.blogspot.com/-7teHVaq9ClU/YMd4ThhxeeI/AAAAAAAAbWg/sx20VvM61kIqLBP1trp39UJFYRiLcRLkACLcBGAsYHQ/s0/Buket%2BBunga%2BSunny01.jpg',
      'https://1.bp.blogspot.com/-GuxeIySSsGY/YMd8FxoeOGI/AAAAAAAAbYo/cMqtX_bCaHceN5xYIemLUlPv5htL6qsNQCLcBGAsYHQ/s0/Buket%2BBunga%2BCathy01.jpg',
      'https://1.bp.blogspot.com/-yi5w-ZOdcxU/YMcrwWil_2I/AAAAAAAAbRA/FwXfoXUf5zYakiKyobcm2Ez86WLM6amogCLcBGAsYHQ/s0/Buket%2BBunga%2BPink%2BSoft%2Bm031.jpg',
    ];
    const flowerNames = [
      'Buket Bunga Blue Candy',
      'Buket Bunga Molly',
      'Bunga Bunga Pink Candy',
      'Buket Bunga Grace',
      'Buket Bunga Aurora',
      'Buket Bunga Sunny',
      'Buket Bunga Cathy',
      'Buket Bunga Pink Soft',
    ];

    const flowerDescriptions = [
      'Buket bunga yang memiliki warna biru yang cantik , cocok untuk semua kalangan , jika berminat silahkan melakukan pre-order terlebih dahulu di menu user',
      'Buket bunga yang memiliki warna yang cantik , cocok untuk semua kalangan , jika berminat silahkan melakukan pre-order terlebih dahulu di menu user',
      'Buket bunga yang memiliki warna yang cantik , cocok untuk semua kalangan , jika berminat silahkan melakukan pre-order terlebih dahulu di menu user',
      'Buket bunga yang memiliki warna yang cantik , cocok untuk semua kalangan , jika berminat silahkan melakukan pre-order terlebih dahulu di menu user',
      'Buket bunga yang memiliki warna yang cantik , cocok untuk semua kalangan , jika berminat silahkan melakukan pre-order terlebih dahulu di menu user',
      'Buket bunga yang memiliki warna yang cantik , cocok untuk semua kalangan , jika berminat silahkan melakukan pre-order terlebih dahulu di menu user',
      'Buket bunga yang memiliki warna yang cantik , cocok untuk semua kalangan , jika berminat silahkan melakukan pre-order terlebih dahulu di menu user',
      'Buket bunga yang memiliki warna yang cantik , cocok untuk semua kalangan , jika berminat silahkan melakukan pre-order terlebih dahulu di menu user',
    ];

    axios
      .get('https://jsonplaceholder.typicode.com/photos?_limit=8')
      .then((response) => {
        this.items = response.data.slice(0, 8).map((item, index) => ({
          id: item.id,
          name: flowerNames[index % flowerNames.length],
          url: `https://jsonplaceholder.typicode.com/posts/${item.id}`,
          description: flowerDescriptions[index % flowerDescriptions.length],
          image: imageUrls[index % imageUrls.length],
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getPostUrl(id) {
      return `https://jsonplaceholder.typicode.com/posts/${id}`;
    },
    showDetails(item) {
      const newWindow = window.open(this.getPostUrl(item.id), '_blank');
      newWindow.document.write(`
        <html>
          <head>
            <title>${item.name}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
              }
              h1 {
                font-size: 24px;
                font-weight: bold;
              }
              p {
                margin-top: 10px;
              }
              img {
                margin-top: 20px;
                max-width: 100%;
                height: auto;
              }
            </style>
          </head>
          <body>
            <h1>${item.name}</h1>
            <img src="${item.image}" alt="Item Image">
            <p>${item.description}</p>
            <p>URL: ${this.getPostUrl(item.id)}</p>
          </body>
        </html>
      `);
      newWindow.document.close();
    },
  },
};
</script>

<style>
/* Tidak ada perubahan pada bagian <style> */
</style>
