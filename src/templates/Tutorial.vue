<template>
  <Layout>
    <h1>
      {{ $page.tutorial.title }}
    </h1>
    <div class="markdown" v-html="$page.tutorial.content" />
  </Layout>
</template>

<page-query>
  query tutorial ($path: String!) {
    tutorial: tutorial (path: $path) {
      title
      path
      # date (format: "D. MMMM YYYY")
      timeToRead
      content
    }
  }
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.tutorial.title,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$page.tutorial.description,
        },
      ],
    };
  },
};
</script>


<style lang="scss" scoped>
/deep/ > p {
  opacity: 0.8;
}

/deep/ > h2 {
  padding-top: 100px;
  margin-top: -80px;

  @include respond-above(md) {
    font-size: 2rem;
  }
}

/deep/ > p > img {
  max-width: 100%;
}

.markdown {
  padding-bottom: 50vh;
}
</style>
