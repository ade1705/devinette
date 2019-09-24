export interface ProviderInterface {
	getRandomQuestions(numberOfQuestions: number, categoryId: string): any;

	getCategories(): any
}