import {ProviderInterface} from "./ProviderInterface";
import {OpenTriviaProvider} from "./OpenTrivia/OpenTriviaProvider";
import {OpenTriviaProviderTransformer} from "./OpenTrivia/OpenTriviaProviderTransformer";
import axios from "axios";

export class ProviderFactory {

    /**
     *
     * @param {string} providerName
     * @returns {ProviderInterface}
     */
    getProvider = (providerName: string): ProviderInterface => {
        if (providerName === 'open-trivia') {
            return new OpenTriviaProvider(axios, new OpenTriviaProviderTransformer())
        } else {
            throw new Error('no Trivia Provider found')
        }
    }
}