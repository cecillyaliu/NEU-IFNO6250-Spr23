import './Switch.css';

function Switch({isFlipped}) {
    const switchState = isFlipped ? "switch--on" : "";
    return (
        <div className="switch__container">
            <div className={`switch ${switchState}`}/>

        </div>
    );
}

export default Switch;