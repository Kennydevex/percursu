export default {
  attributes: {
    name: 'Nome',
    lastname: 'Apelido',
    username: 'Utilizador',
    password: 'Palavra passe',
    password_confirmation: 'Confirmação',
    display_name: 'Rótulo',
    entity: 'Entidade',
  },
  messages: {
    required: 'Campo de preenchimento obrigatório',
  },
  custom: {

    title: {
      required: () => 'É obrigatório introduzir um título numa publicação',

    },

    image: {
      image: () => 'Selecione a rquivo do tipo imagem!!',
      required: () => 'É obrigatório inserir uma imagem na publicação',
    },

    category: {
      required: () => 'Escolha uma categoria!!',
    },
    start: {
      before: () =>
        'Data de início de uma publicação não pode ser superior a 6 meses',
    },

    start_date: {
      before: () =>
        'Data de início tem de ser uma data anteriar a data atual',
      after: () => 'Data de início tem de ser depois da data atual',
    },
    end_date: {
      before: () =>
        'Esta data não pode ser depois da data atual',
      after: () => 'Data de fim de serviço tem de depois da data de início',
    },

    birthdate: {
      before: () =>
        'Data de nascimento não pode ser uma data do futuro',
      after: () => 'Data exagerada',
      date_format: () => 'Escolha um data válida',
    },

    end: {
      after: () => 'Data de fim não pode ser menor nem igual a data de início',

    },

    //===============================================================
    name: {
      required: () => 'É obrigatório introduzir um nome',

    },
    lastname: {
      required: () => 'É obrigatório introduzir um apelido',

    },

    username: {
      required: () => 'Insira um nome de utilizador',
    },

    password_confirmation: {
      confirmed: () => 'Não coencidem',
    },

    subject: {
      required: () => "É obrigatório escolher um assunto"
    },

    otherSubject: {
      required_if: () => "Tem de especificar um assunto"
    },
    content: {
      required: () => "Nenhum comentário inserido"
    },

    entity: {
      required: () => "É obrigatório escolher uma entidade para uma categoria"
    },
  }
}
