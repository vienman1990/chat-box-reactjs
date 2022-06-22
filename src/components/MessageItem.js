export function MessageItem(props) {
    let message = props.message;
    let options = props.message.options? props.message.options : [];

    let listOptions = options.map((item) => <div onClick={() => props.getAnswer(item.id_answer)}>{item.question}?</div> )
    let answer = message.type === 'answer'? <div dangerouslySetInnerHTML={{__html: message.answer }}></div> : '';

    let itemAnswer = (
        <>
            <div className="quickAnswer--answer">
                <div className="quickAnswer--answer--wapper">
                    <div >{message.content}</div>
                </div>
            </div>
            <div className="quickAnswer--question">
                <div className="quickAnswer--question--wapper">
                    {answer}
                </div>
            </div>
            <div className="quickAnswer--question--list">{listOptions}</div>
        </>
    )

    let itemQuestion = (
        <>
            <div className="quickAnswer--question">
                <div className="quickAnswer--question--wapper">
                    <div dangerouslySetInnerHTML={{__html: message.content }}></div>
                </div>
            </div>
            {message.id === 1 ? <div className="quickAnswer--question--list">{listOptions}</div> : ''}
        </>
    )

    return (
        <>
            {message.type === 'answer'? itemAnswer : itemQuestion }
        </>
    )
} 