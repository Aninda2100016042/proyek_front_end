<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Bunga Yang Tersedia</h1>
    <div class="product-container" style="background-image: url('https://i.pinimg.com/564x/3c/23/f8/3c23f8c239b464522fdacf550f3e796c.jpg');">
      <div v-if="loading" class="card">Loading...</div>
      <div v-else v-for="(post, index) in visiblePosts" :key="post.id" class="card">
        <h2 class="title">{{ getTitle(index) }}</h2>
        <button @click="toggleDescription(index)" class="toggle-button">
          {{ isDescriptionVisible(index) ? 'Hide Description' : 'Show Description' }}
        </button>
        <div v-if="isDescriptionVisible(index)" class="description">
          <img :src="getImageUrl(index)" :alt="getTitle(index)" class="product-image" />
          <p class="body">{{ getDescription(index) }}</p>
          <p class="price">Price: Rp{{ getPrice(index) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Product',
  data() {
    return {
      loading: true,
      posts: [],
      visibleDescriptions: [],
      titles: [
        'Bunga Charlotte',
        'Bunga Rainbow',
        'Bunga Mawar Mix',
        'Bunga Mawar Merah',
        'Bunga Mawar Kuning',
      ],
      descriptions: [
        'Bunga yang cocok untuk dipajang dan sangat cocok untuk mempercantik rumah anda',
        'Bunga yang cocok untuk dipajang dan sangat cocok untuk mempercantik rumah anda',
        'Bunga yang cocok untuk dipajang dan sangat cocok untuk mempercantik rumah anda',
        'Bunga yang cocok untuk dipajang dan sangat cocok untuk mempercantik rumah anda',
        'Bunga yang cocok untuk dipajang dan sangat cocok untuk mempercantik rumah anda',
      ],
      prices: [150000, 200000, 100000, 250000, 300000],
    };
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    visiblePosts() {
      return this.posts.slice(0, 5);
    },
  },
  methods: {
    fetchPosts() {
      axios
        .get('https://jsonplaceholder.typicode.com/posts/')
        .then((response) => {
          this.posts = response.data.map((post) => ({
            ...post,
            quantity: 3,
          }));
          this.loading = false;
          this.visibleDescriptions = new Array(this.posts.length).fill(false);
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    toggleDescription(index) {
      this.visibleDescriptions[index] = !this.visibleDescriptions[index];
    },
    isDescriptionVisible(index) {
      return this.visibleDescriptions[index];
    },
    getImageUrl(index) {
      const imageUrls = [
        'https://i.pinimg.com/564x/3b/39/9b/3b399bdbf4a5e45c2204074e986f4e63.jpg',
        'https://i.pinimg.com/564x/d3/a8/2f/d3a82f04b28a81d71f16553e3db09f72.jpg',
        'https://i.pinimg.com/564x/b3/b3/17/b3b3177a051ea30015857b82468750cc.jpg',
        'https://i.pinimg.com/564x/88/67/33/886733e908aff122e4f53dd6c61a6609.jpg',
        'https://i.pinimg.com/564x/ca/50/17/ca5017bbcdc3ada45890eb9bb7885d1e.jpg',
      ];

      return imageUrls[index];
    },
    getTitle(index) {
      return this.titles[index];
    },
    getDescription(index) {
      return this.descriptions[index];
    },
    getPrice(index) {
      return this.prices[index];
    },
  },
};
</script>

<style scoped>
.product-container {
  max-width: 800px;
  margin: 0 auto;
}

.card {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.toggle-button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  margin-bottom: 10px;
  cursor: pointer;
}

.description {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.body {
  font-size: 16px;
  margin-bottom: 10px;
}

.price {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
