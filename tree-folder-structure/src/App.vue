<template>
  <v-app>
    <v-main>
      <v-container>
        <h1 class="display-1 mb-4">Folders</h1>
        <v-treeview :items="nestedFolders">
          <template v-slot:prepend="{ item, open }">
            <v-icon>
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
          </template>
          <template v-slot:label="{ item }">
            {{ item.name }}
            <v-btn
              @click="createFolder(item.id)"
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
import { cloneDeep } from 'lodash'

export default {
  name: 'App',
  computed: {
    nestedFolders () {
      const folders = cloneDeep(this.$store.state.folders)
      return this.generateNestedFolders(folders)
    }
  },
  methods: {
    createFolder (parentId) {
      const folderId = this.getNextFolderId()
      const folder = {
        id: folderId,
        parentId: parentId,
        name: `Folder ${folderId}`
      }
      this.$store.dispatch('addFolder', folder)
    },
    getNextFolderId () {
      if (this.folderIdTracker) return ++this.folderIdTracker

      const folders = cloneDeep(this.$store.state.folders)
      this.folderIdTracker = folders
        .map(folder => folder.id)
        .reduce((prev, current) => current > prev ? current : prev)
      return ++this.folderIdTracker
    },
    generateNestedFolders (folders, parentId) {
      const parentFolders = folders.filter(folder => folder.parentId === parentId || folder.id === parentId)
      parentFolders.map(parentFolder => {
        const children = []
        folders.forEach(folder => {
          if (folder.parentId === parentFolder.id) {
            children.push(this.generateNestedFolders(folders, folder.id)[0])
          }
        })
        if (children.length) parentFolder.children = children
        return parentFolder
      })

      return parentFolders
    }
  },
  data: () => ({
    folderIdTracker: null
  })
}

</script>
