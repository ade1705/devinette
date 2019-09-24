import {Question} from "./Question";

export class Questions{

    private questions: Question[];

	constructor() {
		this.questions = []
	}

    /**
	 *
     * @param {Question} question
     */
	add = (question: Question): void => {
		this.questions.push(question);
	};

    /**
	 *
     * @returns {Question[]}
     */
    all(): Question[] {
		return this.questions;
    };

    /**
	 *
     * @returns {number}
     */
    count(): number {
		return this.questions.length;
	};
}
