import dotenv from 'dotenv';
import {Request, Response} from "express";
import {ProviderFactory} from "./ProviderFactory";
dotenv.config();

class ProviderController {

    private _providerFactory: ProviderFactory;

    constructor(providerFactory: ProviderFactory) {
        this._providerFactory = providerFactory;
    }

    /**
     *
     * @param {e.Request} request
     * @param {e.Response} response
     * @returns {e.Response}
     */
    getProviders = (request: Request, response: Response) : Response => {
        return response.status(201).json({response: JSON.parse(process.env.PROVIDERS)});
    };

    /**
     *
     * @param {e.Request} request
     * @param {e.Response} response
     * @returns {Promise<e.Response>}
     */
    getQuestions = async (request: Request, response: Response): Promise<Response> => {
        const { provider, numberOfQuestions, categoryId } = request.body;

        try {
            const triviaProvider = this._providerFactory.getProvider(provider);
            response.status(201).json(
                {response: await triviaProvider.getRandomQuestions(numberOfQuestions, categoryId)}
                );
        } catch (error) {
            response.status(500).json({error: error.message});
        }

        return response;
    };

    getCategories = async (request: Request, response: Response): Promise<Response> => {
        const { provider } = request.body;

        try {
            const triviaProvider = this._providerFactory.getProvider(provider);
            response.status(201).json({response: await triviaProvider.getCategories()});
        } catch (error) {
            response.status(500).json({error: error.message});
        }

        return response;
    }


}

const providerController = new ProviderController(new ProviderFactory());
export default providerController;