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
	 * 
     * @param {number} numberOfQuestions
     * @param {string} categoryId
     * @returns {Promise<Questions>}
     */
	getRandomQuestions = async (numberOfQuestions = 10, categoryId = ''): Promise<Questions> => {
		const res = await this.getQuestionsFromApi(numberOfQuestions, categoryId);
		return this._transformer.transform(res.data);
	};

    /**
	 *
     * @param {number} numberOfQuestions
     * @param {string} categoryId
     * @returns {Promise<AxiosResponse>}
     */
	private getQuestionsFromApi = (numberOfQuestions: number, categoryId: string): Promise<AxiosResponse>  =>{
		return this.axios.get(
			`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryId}`
		);
	};

    /**
	 *
     * @returns {Promise<AxiosResponse>}
     */
    public getCategories = async (): Promise<AxiosResponse> => {
		return await this.getCategoriesFromApi()
    };

    /**
	 *
     * @returns {Promise<AxiosResponse>}
     */
    private getCategoriesFromApi = (): Promise<AxiosResponse> => {
        return this.axios.get(`https://opentdb.com/api_category.php`);
    }
}