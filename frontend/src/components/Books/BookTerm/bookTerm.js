import React from "react";

const bookTerm = (props) => {
    return (
        <tr>
            <td scope={"col"}>{props.term.name}</td>
            <td scope={"col"}>{props.term.category}</td>
            <td scope={"col"}>{props.term.author.name}</td>
            <td scope={"col"}>{props.term.availableCopies}</td>
            <td scope={"col"} className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger"}
                   onClick={() => props.onDelete(props.term.id)}
                   style={{margin:10}}>
                    Delete
                </a>
                <a type="button" className={"btn btn-info ml-2"}
                   onClick={() => {
                       // console.log(props.onEdit(props.term.id))
                       props.onEdit(props.term.id)}}
                   href={`/books/edit/${props.term.id}`}
                   style={{margin:10}}>
                    Edit
                </a>
                <a type="button" className={"btn btn-success ml-2"}
                   onClick={() => { props.onMark(props.term.id)}}
                   style={{margin:10}}>
                   Mark as Taken
                </a>
            </td>
        </tr>
    )
}

export default bookTerm;
