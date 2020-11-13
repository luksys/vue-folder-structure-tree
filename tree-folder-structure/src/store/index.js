import Vue from 'vue'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    folders: [
      {
        id: 0,
        name: 'Folder 0',
        children: [
          {
            id: 1,
            parentIds: [0],
            name: 'Folder 1'
          },
          {
            id: 2,
            parentIds: [0],
            name: 'Folder 2',
            children: [
              {
                id: 3,
                parentIds: [0, 2],
                name: 'Folder 3'
              }
            ]
          },
          {
            id: 4,
            parentId: 0,
            name: 'Folder 4'
          }
        ]
      },
      {
        id: 5,
        index: 1,
        name: 'Folder 5'
      },
      {
        id: 6,
        index: 2,
        name: 'Folder 6',
        children: [
          { id: 7, parentIds: [6], name: 'Folder 7' }
        ]
      }
    ]
  },
  mutations: {
    addFolder (state, folder) {
      const folders = cloneDeep(state.folders)
      let currentFolder

      if (folder.parentIds) {
        folder.parentIds.forEach((parentId, index) => {
          if (!currentFolder) {
            currentFolder = folders.find(folderFromList => folderFromList.id === parentId)
          } else {
            currentFolder = currentFolder.children.find(folderFromList => folderFromList.id === parentId)
          }

          const lastItem = folder.parentIds.length - 1 === index

          if (lastItem && !currentFolder.children) {
            currentFolder.children = []
          }
        })

        currentFolder.children.push(folder)
      }

      state.folders = folders
    }
  },
  actions: {
    addFolder (context, folder) {
      context.commit('addFolder', folder)
    }
  }
})
