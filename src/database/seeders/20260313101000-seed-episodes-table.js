'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const [courses] = await queryInterface.sequelize.query('SELECT id FROM courses;')

    await queryInterface.bulkInsert('episodes', [
      {
        name: 'Introdução ao Fullstack Javascript',
        synopsis: 'Neste primeiro episódio do curso de Fullstack Javascript, vamos entender o que é o ecossistema Javascript e como ele revolucionou o desenvolvimento web profissional.',
        order: 1,
        video_url: '/video-intro.mp4',
        seconds_long: 300,
        course_id: courses[0].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Configurando o Ambiente de Desenvolvimento',
        synopsis: 'Vamos preparar nossa máquina instalando o Node.js, VS Code e as extensões essenciais para começar a programar como um pro.',
        order: 2,
        video_url: '/video-setup.mp4',
        seconds_long: 600,
        course_id: courses[0].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sua Primeira Variável e Estrutura de Dados',
        synopsis: 'Entenda os conceitos fundamentais de variáveis, tipos de dados e como o Javascript armazena informações na memória.',
        order: 3,
        video_url: '/video-variables.mp4',
        seconds_long: 450,
        course_id: courses[0].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Por que Ruby?',
        synopsis: 'Conheça a filosofia por trás do Ruby, uma linguagem focada na felicidade do programador e na produtividade extrema.',
        order: 1,
        video_url: '/ruby-intro.mp4',
        seconds_long: 240,
        course_id: courses[1].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sintaxe Básica e Objetos',
        synopsis: 'Aprenda como tudo em Ruby é um objeto e sinta o poder da sintaxe expressiva desta linguagem elegante.',
        order: 2,
        video_url: '/ruby-objects.mp4',
        seconds_long: 520,
        course_id: courses[1].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'O que são Micro-serviços?',
        synopsis: 'Nesta introdução ao curso, discutimos a diferença entre arquitetura monolítica e micro-serviços, e quando utilizar cada uma.',
        order: 1,
        video_url: '/node-ms-01.mp4',
        seconds_long: 320,
        course_id: courses[2].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sincronia vs Assincronia em Node.js',
        synopsis: 'Entenda o Event Loop do Node.js e como lidar com operações assíncronas usando Promises e Async/Await.',
        order: 2,
        video_url: '/node-ms-02.mp4',
        seconds_long: 700,
        course_id: courses[2].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Arquitetura Restful com Rails',
        synopsis: 'Descubra como o Rails facilita a criação de rotas e controllers seguindo os padrões REST de forma quase automática.',
        order: 1,
        video_url: '/rails-api-01.mp4',
        seconds_long: 400,
        course_id: courses[3].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Serialização de JSON Pró',
        synopsis: 'Aprenda a customizar a saída JSON da sua API usando ferramentas poderosas do ecossistema Ruby on Rails.',
        order: 2,
        video_url: '/rails-api-02.mp4',
        seconds_long: 580,
        course_id: courses[3].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Introdução ao TDD com Jest',
        synopsis: 'Começamos nossa jornada de testes escrevendo o teste antes do código. Red, Green, Refactor na prática!',
        order: 1,
        video_url: '/tdd-node-1.mp4',
        seconds_long: 350,
        course_id: courses[4].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mockando Dependências Externas',
        synopsis: 'Aprenda a isolar sua lógica de negócios mockando chamadas de banco de dados e APIs externas para testes rápidos e confiáveis.',
        order: 2,
        video_url: '/tdd-node-2.mp4',
        seconds_long: 620,
        course_id: courses[4].id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('episodes', null, {})
  }
};
