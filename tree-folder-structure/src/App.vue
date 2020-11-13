<template>
  <v-app>
    <v-main>
      <v-container>
        <h1 class="display-1 mb-4">Folders</h1>
        <v-treeview :items="folders" item-key="id">
          <template v-slot:prepend="{ open }">
            <v-icon>
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
          </template>
          <template v-slot:label="{ item }">
            {{ item.name }}
            <v-btn
              @click="createFolder(item.id, item.parentIds)"
              class="mx-2"
              tile
              x-small
              icon
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
        </v-treeview>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    folders () {
      return this.$store.state.folders
    }
  },
  methods: {
    createFolder (id, parentIds) {
      const folderId = this.getNextFolderId()
      const updatedParentIds = parentIds ? [...parentIds] : []
      updatedParentIds.push(id)
      const folder = {
        id: folderId,
        parentIds: updatedParentIds,
        name: `Folder ${folderId}`
      }
      this.$store.dispatch('addFolder', folder)
    },
    getNextFolderId () {
      return ++this.folderIdTracker
    }
  },
  data: () => ({
    folderIdTracker: 7
  })
}

</script>
