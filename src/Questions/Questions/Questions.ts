import {Question} from "./Question";

export class Questions{
    private questions: Question[];

	constructor() {
		this.questions = []
	}

	add = (question: Question) => {
		this.questions.push(question);
	};

    all() {
		return this.questions;
    };

    count() {
		return this.questions.length;
	};
}
