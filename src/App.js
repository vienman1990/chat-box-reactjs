import { useState, useEffect, useRef } from "react";
import data from './data.json';
import { MessageItem } from "./components/MessageItem";

export function App() {
    const quickAnswerContent = useRef(null);
    const [messages, setMessage] = useState([]);
    const [options, setOptions] = useState(data[1].options);
    const [isShowBox, setIsShowBox] = useState(true); 

    useEffect(() => {
        if (messages.length === 0) {
            setMessage([...messages, data[0], data[1] ]);
        }
        
        if (quickAnswerContent.current !== null) {
            quickAnswerContent.current.scrollTo({top: quickAnswerContent.current.scrollHeight, behavior: 'smooth'});
        }
    });

    function getAnswer(id) {
        let message = data.find((item) => item.id === id);
        let is_message = messages.find((item) => item.id === id);
        let newOptions = options.filter((item) => item.id_answer !== id );

        message.options = newOptions;

        if (is_message === undefined) {

            if (newOptions.length === 0){
                let contactMessage = data[data.length - 1];
                setMessage([...messages, message, contactMessage ]);
            } else {
                setMessage([...messages, message ]);
                setOptions(newOptions);
            }

        }
    }

    const listMessages = messages.map((item) => <MessageItem getAnswer={getAnswer} message={item} options={options} />)
    const ShowListMessages = (
        <div ref={quickAnswerContent} className="quickAnswer--content">
            {listMessages}
        </div>
    )

    function btnCloseClick(){
        return setIsShowBox(!isShowBox);
    }

    return (
        <div className="quickAnswer">
            <div className="quickAnswer--header">
                <div className="quickAnswer--header--title">私と話してください</div>
                <div className="quickAnswer--header--close" onClick={() => btnCloseClick()}>
                    {isShowBox? '閉じる' : '開く' }
                </div>
            </div>
            {isShowBox? ShowListMessages : ''}
        </div>
    );
}