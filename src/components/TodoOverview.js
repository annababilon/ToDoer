
export default function TodoOverview({todo}) {


    return (
<div>
    <h4>{todo.name}</h4>
    <p> {todo.deadline}</p>
    <div>{todo.description}</div>
</div>
    )
}