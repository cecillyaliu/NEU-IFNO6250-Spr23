function MovieSequels (props) {
    const list = [];
    for (let sequel = 1; sequel <= props.count; sequel +=1) {
        const title = sequel === 1 ? '' : sequel;
        list.push(<li key={title}>Cats: The Musical {title} </li>);
    }
    return (<ul className="sequels">
        {list}
    </ul>);
}

export default MovieSequels;