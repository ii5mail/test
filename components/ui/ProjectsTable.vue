<template>
  <v-data-table
    :headers="table_headers"
    :items="projects"
    :items-per-page="num_rows"
    class="table"
  />
</template>

<script>
export default {
  name: "ProjectsTable",
  props: {
    projects: Array,
    num_rows: Number,
  },
  data() {
    return {
      table_headers: [
        { text: "Project Name", align: "start", value: "name" },
        { text: "Type", value: "type" },
        { text: "Location", value: "location" },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.table {
  width: 90%;
}
</style>