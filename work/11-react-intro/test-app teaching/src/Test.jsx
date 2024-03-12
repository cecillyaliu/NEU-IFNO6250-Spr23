// function Test() {
//     return (
//         <p className="test">Hello World!</p>
//     );
// }


function Test({onClick}) {
    return (
        <p onClick={onClick}>Hello World!</p>
    );
}

export default Test;