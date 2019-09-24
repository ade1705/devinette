import {AxiosInstance, AxiosResponse} from "axios";
import { stubInterface, stubObject } from "ts-sinon";
import { expect } from 'chai';
import {OpenTriviaProvider} from "../../src/lib/Providers/OpenTrivia/OpenTriviaProvider";
import {OpenTriviaProviderTransformer} from "../../src/lib/Providers/OpenTrivia/OpenTriviaProviderTransformer";
import {Questions} from "../../src/lib/Questions/Questions";
const assert = require('assert').strict;

describe('Getting Questions from the API ', () => {
	it('Calls the get random questions and transform to questions', async () => {

        let string = JSON.parse('{"response_code":0,"results":[{"category":"Mythology","type":"multiple","difficulty":"medium","question":"Hera is god of...","correct_answer":"Marriage","incorrect_answers":["Agriculture","Sea","War"]},{"category":"History","type":"multiple","difficulty":"easy","question":"In which year did the Invasion of Kuwait by Iraq occur?","correct_answer":"1990","incorrect_answers":["1992","1988","1986"]},{"category":"Science & Nature","type":"multiple","difficulty":"medium","question":"On the periodic table of elements, what is the symbol for Tin?","correct_answer":"Sn","incorrect_answers":["Ti","Ni","Na"]}]}');

        const mockedAxios = stubInterface<AxiosInstance>();

		const transformerMock = new OpenTriviaProviderTransformer
        const transformerMockStub = stubObject<OpenTriviaProviderTransformer>(transformerMock);

		mockedAxios.get.withArgs('https://opentdb.com/api.php?amount=3&category=9').returns(new Promise(resolve => {
			resolve({
				data: string
			});
		}));


        transformerMockStub.transform.withArgs(string).returns(new Questions());

		let openTriviaProvider = new OpenTriviaProvider(mockedAxios, transformerMock);

		let response = await openTriviaProvider.getRandomQuestions(3, '9');
		assert.equal(response.count(), 3);
		assert(mockedAxios.get.called)
	});

	it('gets categories', async () => {

        let string = JSON.parse('{"trivia_categories":[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]}');

        const mockedAxios = stubInterface<AxiosInstance>();

		const transformerMock = new OpenTriviaProviderTransformer
        const transformerMockStub = stubObject<OpenTriviaProviderTransformer>(transformerMock);

		mockedAxios.get.withArgs('https://opentdb.com/api_category.php').returns(new Promise(resolve => {
			resolve({
				data: string
			});
		}));


        transformerMockStub.transform.withArgs(string).returns(new Questions());

		let openTriviaProvider = new OpenTriviaProvider(mockedAxios, transformerMock);

		let response = await openTriviaProvider.getCategories();
		assert(mockedAxios.get.called)
	});
});
