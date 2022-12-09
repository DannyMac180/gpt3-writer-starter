import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Answer the question with a new and novel Tao Te Ching verse in the style of Stephen Mitchell's translation that is very wise and relevant to the question. Question: What is the most important thing in life? Verse: He who knows how to be still, Finds the answer that comes to him; A wise man knows when it's time, To wait and see what the future will bring. Question: ${req.body.userInput} Verse:}"

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;