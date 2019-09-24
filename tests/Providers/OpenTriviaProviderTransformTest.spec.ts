import 'mocha';
import {OpenTriviaProviderTransformer} from "../../src/lib/Providers/OpenTrivia/OpenTriviaProviderTransformer";
const assert = require('assert').strict;

describe('Test For Transformer',
	() => {
		it('should transform json response to questions', () => {
			let transformer = new OpenTriviaProviderTransformer();
			let string = '{"response_code":0,"results":[{"category":"Mythology","type":"multiple","difficulty":"medium","question":"Hera is god of...","correct_answer":"Marriage","incorrect_answers":["Agriculture","Sea","War"]},{"category":"History","type":"multiple","difficulty":"easy","question":"In which year did the Invasion of Kuwait by Iraq occur?","correct_answer":"1990","incorrect_answers":["1992","1988","1986"]},{"category":"Science & Nature","type":"multiple","difficulty":"medium","question":"On the periodic table of elements, what is the symbol for Tin?","correct_answer":"Sn","incorrect_answers":["Ti","Ni","Na"]}]}';

			let questions = transformer.transform(JSON.parse(string));

            assert(questions.count(), 3);
            assert(questions.all()[0].getAnswer(), 'Marriage');
		});
	});