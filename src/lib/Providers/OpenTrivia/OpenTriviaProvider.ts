import {ProviderInterface} from "../ProviderInterface";
import {AxiosInstance, AxiosResponse} from "axios";
import {OpenTriviaProviderTransformer} from "./OpenTriviaProviderTransformer";
import {Questions} from "../../Questions/Questions";

export class OpenTriviaProvider implements ProviderInterface
{
	private axios: AxiosInstance;
	private _transformer: OpenTriviaProviderTransformer;

    /**
	 *
     * @param {AxiosInstance} axios
     * @param {OpenTriviaProviderTransformer} transformer
     */
	constructor(axios: AxiosInstance, transformer: OpenTriviaProviderTransformer) {
		this.axios = axios;
        this._transformer = transformer;
    }

    /**
     * @param {number} numberOfQuestions
     * @returns {Promise<Questions>}
     */
	getRandomQuestions = async (numberOfQuestions: number): Promise<Questions> => {
		const res = await this.getQuestionsFromApi(numberOfQuestions);
		return await this._transformer.transform(res.data);
	};

    /**
	 *
     * @param {number} numberOfQuestions
     * @returns {Promise<AxiosResponse>}
     */
	private getQuestionsFromApi(numberOfQuestions: number): Promise<AxiosResponse> {
		return this.axios.get(`https://opentdb.com/api.php?amount=${numberOfQuestions}`);
	}
}