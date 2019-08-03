import * as util from '../util';

type ParsedOptions = {
  allowPrefix: false;
} | {
  allowPrefix: true;
  allowUnderscorePrefix: boolean;
};
type Options = [
  | 'never'
  | 'always'
  | {
    allowPrefix?: false;
  }
  | {
    allowPrefix: true;
    allowUnderscorePrefix?: boolean;
  },
];
type MessageIds = 'noPrefix' | 'alwaysPrefix';

/**
 * Parses a given value as options.
 */
function parseOptions([options]: Options): ParsedOptions {
  if (options === 'never') {
    return { allowPrefix: false, allowUnderscorePrefix: false };
  }
  if (options === 'always') {
    return { allowPrefix: true, allowUnderscorePrefix: false };
  }
  if (!options.allowPrefix) {
    return { allowPrefix: false, allowUnderscorePrefix: false };
  }
  return { allowPrefix: true, allowUnderscorePrefix: options.allowUnderscorePrefix };
}

export default util.createRule<Options, MessageIds>({
  name: 'interface-name-prefix',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require that interface names be prefixed with `I`',
      category: 'Stylistic Issues',
      recommended: 'error',
    },
    messages: {
      noPrefix: 'Interface name must not be prefixed with "I".',
      alwaysPrefix: 'Interface name must be prefixed with "I".',
    },
    schema: [
      {
        oneOf: [
          {
            enum: [
              // Deprecated, equivalent to: { allowPrefix: false }
              'never',
              // Deprecated, equivalent to: { allowPrefix: true, allowUnderscorePrefix: false }
              'always'
            ],
          },
          {
            type: 'object',
            properties: {
              allowPrefix: {
                type: 'boolean',
                enum: [ false ],
                default: false,
              },
            }
          },
          {
            type: 'object',
            properties: {
              allowPrefix: {
                type: 'boolean',
                enum: [ true ]
              },
              allowUnderscorePrefix: {
                type: 'boolean',
                default: false
              }
            },
            required: [ 'allowPrefix' ],  // required to select this "oneOf" alternative
          },
        ],
      },
    ],
  },
  defaultOptions: [
    { allowPrefix: false }
  ],
  create(context, [options]) {
    const parsedOptions = parseOptions([options]);

    /**
     * Checks if a string is prefixed with "I".
     * @param name The string to check
     */
    function isPrefixedWithI(name: string): boolean {
      if (typeof name !== 'string') {
        return false;
      }

      return /^I[A-Z]/.test(name);
    }

    /**
     * Checks if a string is prefixed with "I" or "_I".
     * @param name The string to check
     */
    function isPrefixedWithIOrUnderscoreI(name: string): boolean {
      if (typeof name !== 'string') {
        return false;
      }

      return /^_?I[A-Z]/.test(name);
    }

    return {
      TSInterfaceDeclaration(node): void {
        if (parsedOptions.allowPrefix) {
          if (isPrefixedWithIOrUnderscoreI(node.id.name)) {
            context.report({
              node: node.id,
              messageId: 'noPrefix',
            });
          }
        } else {
          if (parsedOptions.allowUnderscorePrefix) {
            if (!isPrefixedWithIOrUnderscoreI(node.id.name)) {
              context.report({
                node: node.id,
                messageId: 'alwaysPrefix',
              });
            }
          } else {
            if (!isPrefixedWithI(node.id.name)) {
              context.report({
                node: node.id,
                messageId: 'alwaysPrefix',
              });
            }
          }
        }
      },
    };
  },
});
