import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
  globalSetup: '<rootDir>/__test__/setup.ts',
  globalTeardown: '<rootDir>/__test__/teardown.ts',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  clearMocks: true,
}

export default config
