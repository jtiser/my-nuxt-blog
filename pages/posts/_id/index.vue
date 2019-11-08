<template>
  <div class="single-post-page">
    <section class="post">
      <v-card class="pa-5">
        <v-img class="white--text" height="200px" :src="loadedPost.thumbnail">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">{{ loadedPost.title }}</h2>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-subtitle>{{loadedPost.updatedDate | date}}</v-card-subtitle>
        <v-card-text>
          <p class="font-weight-light body-2 post-preview">{{ loadedPost.content }}</p>
        </v-card-text>
      </v-card>
    </section>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    if (context.payload) {
      return {
        loadedPost: context.payload.postData
      }
    }
    return context.app.$axios
      .$get('posts/' + context.params.id + '.json')
      .then(data => {
        console.log('res=', data)
        return {
          loadedPost: data
        }
      })
      .catch(e => context.error(e))
  }
}
</script>

<style scoped>
.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 700px;
    margin: auto;
  }
}
</style>
