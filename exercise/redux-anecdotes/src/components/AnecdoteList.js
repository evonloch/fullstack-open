import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { t, createNotification } from '../reducers/notificationReducer'

const filteredAnecdotes = (anecdotes, filter) => {
    if (filter === ''){
        return anecdotes
    } else {
        return anecdotes.filter(e => e.content.toLowerCase().includes(filter.toLowerCase()))
    }
} 

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)
    //console.log(anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {

        dispatch(incrementVote(id, anecdotes))
        
        const content = anecdotes.find(e => e.id === id).content
        clearTimeout(t)
        dispatch(createNotification(`You voted for "${content}"`, 5))
        
    }

    return (
        <div>
            {filteredAnecdotes(anecdotes, filter)
                .sort((a, b) => a.votes > b.votes ? -1 : 1)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList