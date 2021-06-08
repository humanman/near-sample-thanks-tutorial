<template>

  <Layout>
    <h1>
      {{ $page.tutorial.title }}
    </h1>
    <div ref="content">
      <VueRemarkContent/>
    </div>
  </Layout>
</template>

<page-query>
  query tutorial ($path: String!) {
    tutorial: tutorial (path: $path) {
      title
      path
      slug
      content
    }
  }
</page-query> 

<script>
export default {
  mounted () {
    const width = this.$refs.content.clientWidth
    this.$emit('width', width)
  },
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
  // padding-top: 100px;
  // margin-top: -80px;
  margin-top: 5rem;
  margin-bottom: 1.5rem;

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
