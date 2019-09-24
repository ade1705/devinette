import {Question} from "../../Questions/Question";
import {Questions} from "../../Questions/Questions";

export class OpenTriviaProviderTransformer {

    /**
     *
     * @param {string} response
     * @returns {Questions}
     */
    public transform = (response: any): Questions => {
        let questionsArray = response.results;

        let questions = new Questions();

        questionsArray.forEach((rawQuestion: any) => {
            let question = new Question();
            question.fill(
                rawQuestion.type,
                rawQuestion.question,
                this.getOptions(rawQuestion.incorrect_answers, rawQuestion.correct_answer),
                rawQuestion.correct_answer
            );

            questions.add(question);
        });

        return questions;
    };

    /**
     *
     * @param {string[]} incorrectAnswers
     * @param {string} correctAnswer
     * @returns {string[]}
     */
    private getOptions = (incorrectAnswers: string[], correctAnswer: string): string[] => {
        let options = [];
        options.push(...incorrectAnswers);
        options.push(correctAnswer);
        return options;
    }
}