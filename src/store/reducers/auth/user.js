import create from '../create'

const user = create({}, {
  SET_USER: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  CLEAR_USER: () => ({})
})

export default user
