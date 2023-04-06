import { RuleConfigSeverity, type UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            RuleConfigSeverity.Error, // .Disabled / .Waring/ .Error
            'always', // 'always': must always include a scope value
            // 'never': commit must never have a specific value
            // ...
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
                'build',
            ],
        ],
    },
}

module.exports = Configuration
