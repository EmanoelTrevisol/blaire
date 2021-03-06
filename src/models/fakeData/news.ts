import News from '../News';

export const apiResponse = {
  news: [
    {
      user: {
        name: 'O Boticário',
        profile_picture:
          'https://pbs.twimg.com/profile_images/1240676323913347074/Gg09hEPx_400x400.jpg',
      },
      message: {
        content:
          'Além disso, nossos funcionários e familiares receberão kits de proteção. Afinal, o cuidado começa aqui dentro, né?',
        created_at: '2020-02-02T16:10:33Z',
      },
    },
    {
      user: {
        name: 'O Boticário',
        profile_picture:
          'https://pbs.twimg.com/profile_images/1240676323913347074/Gg09hEPx_400x400.jpg',
      },
      message: {
        content:
          'Com a união das demais marcas do grupo, doamos 216 toneladas de produtos de higiene para comunidades em vulnerabilidade social de diversas partes do país.',
        created_at: '2020-02-02T15:10:33Z',
      },
    },
  ],
};

export const news = apiResponse.news.map((n) => new News({ ...n }));
