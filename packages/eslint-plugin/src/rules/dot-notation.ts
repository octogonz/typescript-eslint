// anys are required to work around manipulating the AST in weird ways
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
import {
  AST_NODE_TYPES,
  TSESTree,
  TSESLint,
} from '@typescript-eslint/experimental-utils';
*/
import baseRule from 'eslint/lib/rules/dot-notation';
import * as util from '../util';

type Options = util.InferOptionsTypeFromRule<typeof baseRule>;
type MessageIds = util.InferMessageIdsTypeFromRule<typeof baseRule>;

const baseRuleSchema = Array.isArray(baseRule.meta.schema)
  ? baseRule.meta.schema[0]
  : baseRule.meta.schema;

export default util.createRule<Options, MessageIds>({
  name: 'dot-notation',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce dot notation whenever possible',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: 'code',
    // Extend base schema with additional property to ignore TS numeric literal types
    schema: [
      {
        ...baseRuleSchema,
        properties: {
          ...baseRuleSchema.properties,
          allowPrivateClassPropertyAccessViaBracketNotation: {
            type: 'boolean',
            default: false
          }
        },
      },
    ],
    messages: baseRule.meta.messages,
  },
  defaultOptions: [
    {
      allowKeywords: true,
      allowPattern: "",
      allowPrivateClassPropertyAccessViaBracketNotation: false,
    },
  ],
  create(context) {
    debugger;
    return baseRule.create(context);
  },
});
