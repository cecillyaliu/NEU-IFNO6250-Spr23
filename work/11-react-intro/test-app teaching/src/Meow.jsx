function doMeow() {
    console.log('Meow');
}

function Meow () {
    return (
        <p onClick={doMeow}> Meow</p>
    );
}

export default Meow;