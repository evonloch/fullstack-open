import React from 'react'

const Persons = (props) => {
    //console.log("yes", props.searchedPersons)
    return(
        <div>
        {props.searchedPersons.map(person =><div> <p 
                                    key = {person.id}>
                                    {`name: ${person.name} 
                                    number: ${person.number}`
                                    
                                    }</p> 
                                    <button type='submit' onClick={()=>props.onClick(person)}>delete</button>
                                    </div>)}
        </div>
    )
}

export default Persons