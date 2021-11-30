import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import './Board.css';

const BoardComponent = () => {
    const [resultMessage, setResultMessage] = useState('');
    const [inputMessage, setImputMessage] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isError, setIsError] = useState(false);

    /**
     * =====================================================ALGORITHM BEGIN=====================================
     * Algorithm for checking balanced strings
     * Time O(N), space O(N)
     */

    const isMessageBalanced = (message) => {
        message = message.split('');
        let sizeStr = message.length;
        let currentPosFrom = 0;
        let maxRightCntSoFar = 0;
        let lastEmoticonSeenSoFar = '$';
        let happyEmoticonsCnt = 0;
        let sadEmoticonsCnt = 0;
        do {
            let nextEmoticonPos = findNextIndexEmoticon(message, currentPosFrom);
            if (nextEmoticonPos !== -1) {
                let [leftCnt, rightCnt] = reduceParenthesis(message, currentPosFrom, nextEmoticonPos);
                if (lastEmoticonSeenSoFar !== '$') {
                    if (lastEmoticonSeenSoFar === '(') {
                        if (maxRightCntSoFar + 1 < leftCnt) {
                            return false;
                        } else if (maxRightCntSoFar + 1 === leftCnt) {
                            happyEmoticonsCnt = 0;
                            sadEmoticonsCnt = 0;
                            maxRightCntSoFar = rightCnt;
                        } else {
                            maxRightCntSoFar -= leftCnt;
                            maxRightCntSoFar += rightCnt + 1;
                        }
                    } else {
                        if (maxRightCntSoFar < leftCnt) {
                            return false;
                        } else if (maxRightCntSoFar === leftCnt) {
                            happyEmoticonsCnt = 0;
                            sadEmoticonsCnt = 0;
                            maxRightCntSoFar = rightCnt;
                        } else {
                            maxRightCntSoFar -= leftCnt;
                            maxRightCntSoFar += rightCnt;
                        }
                    }
                } else {
                    if (maxRightCntSoFar < leftCnt) {
                        return false;
                    }
                    maxRightCntSoFar += rightCnt;
                }
                lastEmoticonSeenSoFar = message[nextEmoticonPos + 1];
                if (lastEmoticonSeenSoFar === ')') {
                    happyEmoticonsCnt++;
                } else sadEmoticonsCnt++;
                currentPosFrom = nextEmoticonPos + 2;
            } else {
                let [leftCnt, rightCnt] = reduceParenthesis(message, currentPosFrom, sizeStr - 1);
                if (0 < rightCnt) return false;
                if (lastEmoticonSeenSoFar !== '$') {
                    if (lastEmoticonSeenSoFar === '(') {
                        if (maxRightCntSoFar + 1 < leftCnt) {
                            return false;
                        } else if (maxRightCntSoFar + 1 === leftCnt) {
                            return true;
                        } else {
                            maxRightCntSoFar -= leftCnt;
                            maxRightCntSoFar += 1;
                        }
                    } else {
                        if (maxRightCntSoFar < leftCnt) {
                            return false;
                        } else if (maxRightCntSoFar === leftCnt) {
                            return true;
                        } else {
                            maxRightCntSoFar -= leftCnt;
                        }
                    }
                    return maxRightCntSoFar <= sadEmoticonsCnt;
                }
                return leftCnt === 0 && rightCnt === 0;
            }
        } while (true);
    }

    const findNextIndexEmoticon = (message, fromIdx) => {
        let sizeStr = message.length;
        if (sizeStr <= fromIdx) return -1;
        do {
            let nextColonPos = message.indexOf(':', fromIdx);
            if (nextColonPos !== -1) {
                if (nextColonPos + 1 < sizeStr) {
                    if (message[nextColonPos + 1] === '(' || message[nextColonPos + 1] === ')') {
                        return nextColonPos;
                    }
                    fromIdx = nextColonPos + 1;
                } else {
                    return -1;
                }
            } else {
                return -1;
            }
        } while (true);
    }

    const reduceParenthesis = (message, leftIdx, rightIdx) => {
        let stack = [];
        while (leftIdx <= rightIdx) {
            if (message[rightIdx] === ')' || message[rightIdx] === '(') {
                if (stack.length === 0) {
                    stack.push(message[rightIdx]);
                } else {
                    let lastParenthesis = stack[stack.length - 1];
                    if (message[rightIdx] === '(' && lastParenthesis === ')') {
                        stack.pop();
                    } else {
                        stack.push(message[rightIdx]);
                    }
                }
            }
            rightIdx--;
        }
        let leftCnt = 0;
        let rightCnt = 0;
        while (stack.length !== 0) {
            if (stack.pop() === ')') leftCnt++;
            else rightCnt++;
        }
        return [leftCnt, rightCnt];
    }

    //===================================================== ALGORITHM END =====================================

    const showResults = () => {
        let mess = inputMessage.split('');
        if (mess.every((letter) => isValidLetter(letter))) {
            setShowResult(true);
            if (isMessageBalanced(inputMessage)) {
                setResultMessage("(Yes, balanced)");
            } else {
                setResultMessage("(No, unbalanced)");
            }
        } else {
            setIsError(true);
        }
    }

    const clearMessage = () => {
        setResultMessage('');
        setImputMessage('');
        setShowResult(false);
        setIsError(false);
    }

    const appendMessage = (event) => {
        setShowResult(false);
        setIsError(false);
        setImputMessage(event.target.value);
    }

    const isValidLetter = (letter) => {
        return ('a' <= letter && letter <= 'z') || letter === ' ' || letter === ':' || letter === ')' || letter === '(';
    }


    return (
        <div className="Main">
            <div className="box">
                <div className="field">
                    <label className="label">Enter the message:</label>
                    <p>**Message can only contain: ['a' - 'z'], ':', ' ', '(', and ')'.</p>
                    <div className="control">
                        <input className="input" type="text" placeholder="e.g. 'Hola, :)))'" onChange={(event) => appendMessage(event)} value={inputMessage} />
                    </div>
                </div>
                <div className='buttons'>
                    <button className="button is-primary" onClick={() => showResults()}><em>Evaluate Message</em></button>
                    <button className="button is-warning" onClick={() => clearMessage()}><em>Clear Message</em></button>
                </div>
            </div>
            {
                (isError) ?
                    <div className="notification is-danger">
                        <button className="delete" onClick={() => setIsError(false)}></button>
                        Message can only contain; <strong> ['a' - 'z'], ':', ' ', '(', and ')'.</strong>.
                    </div>
                    : null
            }
            {
                (showResult) ?
                    <div className='ResultCheck'>
                        <h3>{`${inputMessage}`}</h3>
                        <h2 className="title is-3">Result: <em>{`${resultMessage}`}</em> </h2>
                    </div>
                    :
                    null
            }

        </div>
    )
}

export default BoardComponent;