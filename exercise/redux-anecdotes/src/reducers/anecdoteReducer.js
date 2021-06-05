import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_ENTRY':
      return [...state, action.data]
    case 'VOTE': {
      const id = action.data.id
      const entryToChange = state.find(e => e.id === id)
      const changedEntry = {
        ...entryToChange,
        votes: entryToChange.votes + 1
      }

      return state.map(entry => 
          entry.id !== id ? entry : changedEntry
        )
    }
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state

  }

  
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const incrementVote = (id, anecdotes) => {
  
  
  return async (dispatch) => {
    
    const voted_anecdote = anecdotes.find(a => a.id === id)
    const changedAnecdote = {
      ...voted_anecdote,
      votes : voted_anecdote.votes + 1
    }
   
    await anecdoteService.update(id, changedAnecdote)
    dispatch(
      {
        type: "VOTE",
        data: {
          id: id
        }
      } 
    )
  }
}

export const createEntry = (content) => {
  return async dispatch => {
    const newEntry = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ENTRY',
      data: newEntry,
    })
  }
}


export default reducer