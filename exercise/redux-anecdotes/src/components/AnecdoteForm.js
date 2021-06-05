import React from 'react'
import { connect } from 'react-redux'
import { createEntry } from '../reducers/anecdoteReducer'
import { createNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addEntry = async(event) => {
        event.preventDefault()
        const content = event.target.entry.value

        event.target.entry.value = ''
        props.createEntry(content)
        props.createNotification(`You added "${content}"`, 5)
        
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addEntry}>
                <div><input name="entry" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
const mapDispatchToProps = {
    createEntry,
    createNotification,
}
export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)