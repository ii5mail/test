<template>
  <v-card class="gallery-item" v-if="photo !== null">
    <img
      width="100%"
      height="100%"
      rel="preload"
      alt="Profile Picture"
      class="profile-img"
      :src="photo.photo"
    />
    <div
      class="gallery-subtext py-2 px-4 xxs-font medium-weight lh-14 black white--text"
    >
      <div>{{ photo.name }}</div>
      <div>{{ photo.city }}, {{photo.state}}</div>
      <div @click="galleryItemRemove(photo.id)">
        <img
          width="28px"
          rel="preload"
          alt="Remove Item"
          class="gallery-item-remove"
          src="@/assets/images/icons/gallery_remove.png"
        />
      </div>

    </div>
  </v-card>
</template>

<script>
export default {
  name: "GalleryItem",
  props: {
    photo: Object,
  },
  methods: {
    galleryItemRemove (photo_id) {

      this.$axios.delete('/api/gallery_photos/' + photo_id + '/', {})
        .then(res => {
            this.successful = true
            this.errors = {}
            this.photo = null;
        })
        .catch(error => {
            this.errors = error.response.data
            
        })
    }
  }
};
</script>

<style lang="stylus" scoped>
.gallery-item {
  width: 32%;
  height: 240px;
}

.gallery-subtext {
  position: absolute;
  top: 195px;
  width: 100%;
  height: 45px;
  opacity: 0.6;
}

.gallery-item-remove {
  position: absolute;
  right: 10px;
  bottom: 8px;
  cursor: pointer;
}

</style>