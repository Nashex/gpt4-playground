# GPT-4 Playground

Just got your GPT-4 API Key and want to give it a spin? Look not further! This project is mainly targeted to allow you to test out your Open AI API keys. The current OpenAI Playground still only allows 4096 tokens for 8k or 32k models like GPT-4 and if you would like to test out you key in a rendered chat environment you would have to purchase ChatCPT Plus. This project should fix both of those issues without comprimising on either experience. The project aims to preserve as much of the vanilla experience as possible while also providing a link between the the playground and ChatGPT to enable a better developer experience.

As a side note, all API keys are encrypted and stored in your browser's local storage, so you can use this project without having to worry about your API key being stolen.

## Demo

### Mock ChatGPT Environment
This environment has most of the critical features like conversation history (which is stored locally), prompting, and multiple conversations. This environment is a great way to test out your API key and see how it works!
![ChatGpt-4 ChatGPT](https://i.imgur.com/DfTbV9d.png)

### Playground Environment
![ChatGpt-4 Playground](https://i.imgur.com/DS6NPH2.png)

## Running Locally
To run this project locally, you will need to have [Node.js](https://nodejs.org/en/) installed. Once you have Node.js installed, you can clone this repository and run the following commands:

```bash
yarn install
yarn dev
```

This will start a local server on port 3000. You can then navigate to `localhost:3000` to view the project!

## Contributing

**This project is still in development! Contributions are very much appreciated!**

If you would like to contribute to this project, please feel free to open a pull request or an issue, I hashed this project out in a few hours so there are bound to be some bugs!
