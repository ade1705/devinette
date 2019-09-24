import { AxiosInstance } from "axios";
import { stubInterface, stubObject } from "ts-sinon";
import {OpenTriviaProvider} from "../../src/lib/Providers/OpenTrivia/OpenTriviaProvider";
import {OpenTriviaProviderTransformer} from "../../src/lib/Providers/OpenTrivia/OpenTriviaProviderTransformer";
import {Questions} from "../../src/lib/Questions/Questions";
const assert = require('assert').strict;

describe('Getting Questions from the API ', () => {
	it('Calls the get random questions and transform to questions', async () => {

        let string = '{"response_code":0,"results":[{"category":"Mythology","type":"multiple","difficulty":"medium","question":"Hera is god of...","correct_answer":"Marriage","incorrect_answers":["Agriculture","Sea","War"]},{"category":"History","type":"multiple","difficulty":"easy","question":"In which year did the Invasion of Kuwait by Iraq occur?","correct_answer":"1990","incorrect_answers":["1992","1988","1986"]},{"category":"Science & Nature","type":"multiple","difficulty":"medium","question":"On the periodic table of elements, what is the symbol for Tin?","correct_answer":"Sn","incorrect_answers":["Ti","Ni","Na"]}]}';

        const mockedAxios = stubInterface<AxiosInstance>();

		const transformerMock = new OpenTriviaProviderTransformer
        const transformerMockStub = stubObject<OpenTriviaProviderTransformer>(transformerMock);

		mockedAxios.get.withArgs('https://opentdb.com/api.php?amount=3').returns(new Promise(resolve => {
			resolve({
				data: string
			});
		}));


        transformerMockStub.transform.withArgs(string).returns(new Questions());

		let openTriviaProvider = new OpenTriviaProvider(mockedAxios, transformerMock);

		let response = await openTriviaProvider.getRandomQuestions(3);
		assert.equal(response.count(), 3);
		assert(mockedAxios.get.called)
	});
});
