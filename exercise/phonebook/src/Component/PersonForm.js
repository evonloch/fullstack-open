import React from 'react'

const PersonForm = (props) => {
    return (
        <form>


            <div>

                name: <input
                    value={props.newName}
                    onChange={props.inputChangeName}
                />

            </div>

            <div>number: <input
                value={props.newNumber}
                onChange={props.inputChangeNumber}
            />
            </div>
            <div>
                <button type='submit' onClick={props.onClick}>add</button>
            </div>
        </form>
    )
}

export default PersonForm