# Require that interface names be prefixed with `I` (interface-name-prefix)

Interfaces often represent important software contracts, so it can be helpful to prefix their names with `I`.
The unprefixed name is then available for a class that provides a standard implementation of the interface.

## Rule Details

This rule enforces whether or not the `I` prefix is required for interface names.

## Options

This rule has a string option.

- `"never"` (default) disallows all interfaces being prefixed with `"I"` (or `"_I"`)
- `"always"` requires all interfaces be prefixed with `"I"` (or `"_I"`)

The `_` prefix is sometimes used to designate a private declaration, in which case a private interface might be
named `_IAnimal` instead of `IAnimal`.  The rule recognizes both forms.

### never

TypeScript suggests [never prefixing](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#names) interfaces with "I".

The following patterns are considered warnings:

```ts
interface IAnimal {
  name: string;
}

interface _IAnimal {
  name: string;
}

interface IIguana {
  name: string;
}
```

The following patterns are not warnings:

```ts
interface Animal {
  name: string;
}

interface Iguana {
  name: string;
}
```

### always

The following patterns are considered warnings:

```ts
interface Animal {
  name: string;
}

interface Iguana {
  name: string;
}
```

The following patterns are not warnings:

```ts
interface IAnimal {
  name: string;
}

interface _IAnimal {
  name: string;
}

interface IIguana {
  name: string;
}
```

## When Not To Use It

If you do not want to enforce interface name prefixing.

## Further Reading

TypeScript [Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

## Compatibility

TSLint: [interface-name](https://palantir.github.io/tslint/rules/interface-name/)
