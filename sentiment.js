
valency = {};

function with_valency(sentence, value)
{
	var words = sentence.split(' ');
	for (i in words)
	{
		valency[words[i]] = value;
	}
}

violence = "violence blood bone die dies kill death dead horrible grisly brutal injure beat assault stab shoot shot wound hit punch kick maim murder torture sex scandal holocaust abuse prison imprison jail parole molest victim wound abduct kidnap casualty blast clashes suicide hurt"

with_valency(violence, -5);

army = "army navy soldier marine armed guard military weapon wmd destruction terror terrorism attack ambush explosion explode explosive bomb gun bullet armor grenade mortar prisoner war battle skurmish invasion occupation invade predator drone defeat al-qaeda pirate";

with_valency(army, -4);

crime = "manslaughter police raid drug abusive dui drunk-driving crash confiscate smuggle seizedrink drunk arrest charge lawsuit force batter broke crime thief criminal penal sentence fine guilty plead cheat steal fraud pyramid defraud stole corrupt bribe kickback sue lobby";

with_valency(crime, -3);

disaster = "accident fire collapse destroy damage implode explode detonate desperate toll fear missing lost worry orphan disaster catastrophe evacuate flee";

with_valency(disaster, -3);

medical = "addict heroin crack amphetamine speed nicotine smoking cigarettes sex unprotected oral cervical rectal tumor tumour colon kidney lung liver heart brain amputate alcohol marijuana weed ecstacy cocaine cholera toxin toxic pollution pollute poison unsafe unhealthy plague epidemic illness hiv aids malaria cancer disease starvation burn transplant hospital medical patient intensive doctor emergency chemical evacuate"; 

with_valency(medical, -2);

negative = "dangerous ugly nasty bad worse fear worry concern argue conflict angry furious disgust shame anger hate dislike negative no deny fail defeat sorrow found risk troubled resign suspended fired blamed tension harmful"; 

with_valency(negative, -1);

positive = "hope victory hero save benefit miracle friend help charity donation philanthrop cure community win victory progress growth children award vow free democracy elections welcomed agree treaty peace ceasefire"

with_valency(positive, 3);

function tokenize(sentence)
{
	list = [];
	var words = sentence.split(/\W/);
	for(i in words)
	{
		if(words[i].length > 2) list.push(words[i].toLowerCase());
	}
	return list;
}

function word_score(word)
{
	var score = valency[word];
	if (score == undefined)
	{
		if (word.length > 4)
			return word_score(word.substring(0, word.length-1))
		else
			return 0
	} else
		return score;
};
	
function total_score(sentence)
{
	var total = 0;
	var tokens = tokenize(sentence);
	for(i in tokens)
	{
		total += word_score(tokens[i]);
	}
	return total;
}
	

		
	