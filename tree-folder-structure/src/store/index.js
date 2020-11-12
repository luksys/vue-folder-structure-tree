import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const folders = [
//   { id: 0, name: 'Folder 1', items: [
//       { id: 1, parentId: 0, name: 'Folder 2' },
//       { id: 2, parentId: 0, name: 'Folder 3', items: [
//         { id: 3, parentId: 2, name: 'Folder 4' },
//       ]}
//   ]},
//   { id: 0, name: 'Folder 1', items: [
//     { id: 1, parentId: 0, name: 'Folder 2' },
//     { id: 2, parentId: 0, name: 'Folder 3', items: [
//         { id: 3, parentId: 2, name: 'Folder 4' },
//       ]}
//   ]}
// ]

export default new Vuex.Store({
  state: {
    folders: [
      { id: 0, name: 'Folder 1' },
      { id: 1, parentId: 0, name: 'Folder 2' },
      { id: 2, parentId: 0, name: 'Folder 3' },
      { id: 3, parentId: 2, name: 'Folder 4' },
      { id: 4, parentId: 0, name: 'Folder 5' },
      { id: 5, name: 'Folder 6' },
      { id: 6, name: 'Folder 7' },
      { id: 7, parentId: 6, name: 'Folder 8' }
    ]
  },
  mutations: {
    addFolder (state, folder) {
      state.folders.push(folder)
    }
  },
  actions: {
    addFolder (context, folder) {
      context.commit('addFolder', folder)
    }
  },
  modules: {
  },
  getters: {
  }
})
