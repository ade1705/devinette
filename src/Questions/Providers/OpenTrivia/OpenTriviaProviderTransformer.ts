import {Question} from "../../Questions/Question";
import {Questions} from "../../Questions/Questions";

export class OpenTriviaProviderTransformer {

    /**
     * @param response
     */
    public transform = (response: string): Questions => {
        let responseArray = JSON.parse(response);
        let questionsArray = responseArray.results;

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
     * @param incorrectAnswers
     * @param correctAnswer
     */
    private getOptions = (incorrectAnswers: string[], correctAnswer: string): string[] => {
        let options = [];
        options.push(...incorrectAnswers);
        options.push(correctAnswer);
        return options;
    }
}