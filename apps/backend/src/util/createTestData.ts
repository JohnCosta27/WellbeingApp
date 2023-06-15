import { prisma } from "../prisma";
import { faker } from '@faker-js/faker';

export const createGeneralTestData = async () => {
	// creating how am i phrases for the user
	const howAmIPhrases = Array.from({length: 20}).map(() => {
		return {
			id: faker.string.uuid(),
			phrase: [...Array(5)].map(() => faker.word.sample()).join(" "),
		};
	});
	
	await prisma.howAmIPhrase.createMany({
		data: howAmIPhrases,
	});

	// creating brand words for the user
	const brandWords = Array.from({length: 20}).map(() => {
		return {
			id: faker.string.uuid(),
			word: faker.word.sample(),
		};
	});

	await prisma.brandWords.createMany({
		data: brandWords,
	});
};
