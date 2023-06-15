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


export const createTestData = async () => {
	// creating a user, the password is always "yeet"
	const user = await prisma.users.create({
		data: {
			id: faker.string.uuid(),
			email: faker.internet.email(),
			password: "1427baf8dd99aa0505a8591d82d2cac18d03d3108f6028499d4d4392fdeafc9cf4422228334e5e13ee34794b9e415ee742cfb14ec5d11547b3cf1cf88fa485d0",
			password_salt: "hOp92qeW8McE6ms1RTj340MNxujK33eC0utl6295EVCpv913TKM062DNgGMVgAvRAafGl4VkmsPwYxZhHBioDkvW1XFpq11f5qlnnKwd4UsPzxJO8dNykkcLYCH35dbn",
		},
	});
	
	// creating mental energy entries for the user
	const mentalEnergies = Array.from({length: 15}).map(() => {
		return {
			id: faker.string.uuid(),
			user_id: user.id,
			level: faker.number.float(),
			date: faker.date.recent({days: 30}),
		};
	})
	
	await prisma.mentalEnergy.createMany({
		data: mentalEnergies,
	});
	
};

