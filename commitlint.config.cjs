module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        0,
        'always',
        [
          'feat',
          'fix',
          'docs',
          'style',
          'refactor',
          'test',
          'chore',
          'revert',
          'perf',
          'ci',
          'build'
        ]
      ],
    }
  };
  