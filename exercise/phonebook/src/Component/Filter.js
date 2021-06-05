import React from 'react'

const Filter = (props) => {
    return(
        <div>
        search: <input
        onChange = {props.inputChangeSearch}
        />
      </div>

    )
}

export default Filter