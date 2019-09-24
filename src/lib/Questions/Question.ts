import {QuestionInterface} from "./QuestionInterface";

export class Question implements QuestionInterface{

    private _answer: string;
    private _options: string[];
    private _question: string;
    private _type: string;

    constructor() {
        this._answer = '';
        this._options = [];
        this._question = '';
        this._type = '';
    }

    set type(value: string) {
        this._type = value;
    }

    set question(value: string) {
        this._question = value;
    }

    set options(value: string[]) {
        this._options = value;
    }

    set answer(value: string) {
        this._answer = value;
    }

    /**
     *
     * @param {string} type
     * @param {string} question
     * @param {string[]} options
     * @param {string} answer
     */
    fill = (type: string, question: string, options: string[], answer: string) => {
        this._type = type;
        this._question = question;
        this._options = options;
        this._answer = answer;
    };

    /**
     *
     * @returns {string}
     */
    getAnswer = () => this._answer;

    /**
     *
     * @returns {string[]}
     */
    getOptions = () => this._options;

}