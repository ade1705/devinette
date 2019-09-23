import {ProviderInterface} from "../../ProviderInterface";
import {AxiosInstance, AxiosResponse} from "axios";
import {OpenTriviaProviderTransformer} from "./OpenTriviaProviderTransformer";

export class OpenTriviaProvider implements ProviderInterface
{
	private axios: AxiosInstance;
	private _transformer: OpenTriviaProviderTransformer;

    /**
     * @param axios
     * @param transformer
     */
	constructor(axios: AxiosInstance, transformer: OpenTriviaProviderTransformer) {
		this.axios = axios;
        this._transformer = transformer;
    }

	/**
	 * @param numberOfQuestions
	 */
	getRandomQuestions = async (numberOfQuestions: number) => {
		const res = await this.getQuestionsFromApi(numberOfQuestions);
		return this._transformer.transform(res.data);
	};

	/**
	 * @param numberOfQuestions
	 */
	private getQuestionsFromApi(numberOfQuestions: number): Promise<AxiosResponse> {
		return this.axios.get(`https://opentdb.com/api.php?amount=${numberOfQuestions}`);
	}
}