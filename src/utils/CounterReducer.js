export const initialState = { count: 0 }

export function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'set':
      return { count: action.payload }
    case 'reset':
      return initialState
    default:
      return state
  }
}
