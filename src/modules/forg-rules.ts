import { Rule } from '@cesium133/forgjs';

const urlRule = new Rule(
  { type: 'url', protocol: prot => prot === 'https' },
  null,
);

const titleRule = new Rule(
  {
    type: 'string',
    minLength: 5,
    notEmpty: true,
  },
  null,
);

const emailRule = new Rule(
  {
    type: 'email',
    notEmpty: true,
    domain: domain =>
      ['outlook', 'gmail', 'yahoo', 'hotmail', 'hub31', 'mail'].indexOf(
        domain,
      ) !== -1,
  },
  null,
);

const emailRulep = new Rule(
  {
    type: 'email',
    notEmpty: true,
  },
  null,
);

const passwordRule = new Rule(
  {
    type: 'password',
    notEmpty: true,
    minLength: 8,
    uppercase: 1,
    numbers: 1,
    matchesOneOf: ['@', '_', '-', '.', '!', '$'],
  },
  null,
);

const passwordRulep = new Rule(
  {
    type: 'password',
    notEmpty: true,
    minLength: 5,
  },
  null,
);

const nameRule = new Rule(
  {
    type: 'string',
    notEmpty: true,
  },
  null,
);

const tagRule = new Rule(
  {
    type: 'string',
    notEmpty: true,
    minLength: 2,
    maxLength: 20,
  },
  null,
);

const answerRule = new Rule(
  {
    type: 'array',
    notEmpty: true,
  },
  null,
);

const gradeRule = new Rule(
  {
    type: 'int',
    min: 0,
    max: 100,
  },
  null,
);

const dateRule = new Rule(
  {
    type: 'date',
  },
  null,
);

export {
  urlRule,
  titleRule,
  emailRule,
  passwordRule,
  emailRulep,
  passwordRulep,
  nameRule,
  tagRule,
  answerRule,
  gradeRule,
  dateRule,
};
