function TodoItem ({task, done}) {
    const complete = done ? 'todo_text--complete' : '';
    return (
        <li><span className={complete}>{task}</span></li>
    );
}

export default TodoItem;