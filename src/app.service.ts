import { Injectable } from '@nestjs/common';

type Joke = {
  error: boolean;
  category: string;
  type: string;
  joke: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
};

@Injectable()
export class AppService {
  async getJoke(): Promise<string> {
    const jokeUrl = 'https://v2.jokeapi.dev/joke/Programming?type=single';

    const response = await fetch(jokeUrl);

    const json: Joke = await response.json();
    console.log(
      '🚀 ~ file: app.service.ts:11 ~ AppService ~ getJoke ~ json:',
      json,
    );

    return json.joke;
  }
}
