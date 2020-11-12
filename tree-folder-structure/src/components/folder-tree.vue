<template>
  <ul v-if="folders">
    <li v-for="folder in folders" v-bind:key="folder.id">
      {{ folder.name }}
      <button v-on:click="createFolder(folder.id)">+</button>
      <folder-tree
        :folders="folder.items"
        @create-folder="createFolder"
      ></folder-tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'folder-tree',
  props: ['folders'],
  methods: {
    createFolder: function (parentId) {
      this.$emit('create-folder', parentId)
    }
  },
  data: () => ({})
}
</script>
