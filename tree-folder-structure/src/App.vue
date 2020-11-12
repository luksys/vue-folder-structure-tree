<template>
  <v-app>
    <v-main>
      <folder-tree
        :folders="nestedFolders"
        @create-folder="createFolder"
      ></folder-tree>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import FolderTree from '@/components/folder-tree'
import { cloneDeep } from 'lodash'

export default {
  name: 'App',
  components: {
    FolderTree,
    HelloWorld
  },
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
        if (children.length) parentFolder.items = children
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
